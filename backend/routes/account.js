const express = require('express')
const router = express.Router()
const { Account } = require('../db')
const { authMiddleware } = require('../Middlewares/middleware')
const mongoose = require('mongoose')

// for checking balance of users
router.get('/balance', authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userID })
  res.status(200).json({ balance: account.balance })
})

// for transfering money -> transfer , failed , insufficiennt balance
router.post('/transfer', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession()

  session.startTransaction()
  const { amount, to } = req.body

  //feting  senders account detail and terminating incase of insufficien balance
  const account = await Account.findOne({ userId: req.userID }).session(session)

  if (!account || account.balance < amount) {
    await session.abortTransaction()
    res.status(400).json({
      message: 'Insufficient Balance',
    })
  }

  //fetching Recievers account detail and terminating in case of invalid account details
  const toAccount = await Account.findOne({ userId: to }).session(session)

  if (!toAccount) {
    await session.abortTransaction()
    return res.status(400).json({ message: 'Invalid account' })
  }

  // updating  balance
  await Account.updateOne(
    { userId: req.userID },
    { $inc: { balance: -amount } }
  ).session(session)
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: +amount } }
  ).session(session)

  // commiting transactions
  await session.commitTransaction()
  res.json({ message: 'Tramnsfer Successful' })
})

module.exports = router
