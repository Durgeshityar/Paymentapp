const express = require('express')
const router = express.Router()
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const key = require('../config')
const zod = require('zod')
const { authMiddleware } = require('../Middlewares/middleware')

// input validation for Signup
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
})

//Signup creating new user (returning token ) and checking existing user
router.post('/signup', async (req, res) => {
  const response = signupBody.safeParse(req.body)
  const userExists = await User.findOne({ username: req.body.username })

  if (!response.success) {
    res.status(411).json({ msg: 'Email already taken / Incorrect inputs' })
  } else if (userExists) {
    res.status(411).json({ msg: 'Email already taken / Incorrect inputs' })
  } else {
    try {
      const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      })
      const randomBalance = Math.floor(Math.random() * 10000) + 1
      const balance = await Account.create({
        userId: user._id,
        balance: randomBalance,
      })

      const token = jwt.sign({ userID: user._id }, key)

      res.status(200).json({
        msg: 'User Created Succesfully',
        token: token,
        name: user.firstName,
      })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  }
})

//Input Validation for Signin

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

// Signin check user exists or not -> if yes than give token
router.post('/signin', async (req, res) => {
  const response = signinBody.safeParse(req.body)
  const userExists = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
  const balance = await Account.find({
    userId: userExists._id,
  })

  if (!response.success) {
    res.status(411).json({ msg: 'Incorrect inputs' })
  }

  if (userExists && balance) {
    const token = jwt.sign({ userID: userExists._id }, key)
    res.json({
      msg: 'success',
      token: token,
      name: userExists.firstName,
      balance: balance,
    })
    return
  }
  res.status(411).json({ msg: 'Error while loggin in' })
})

//Input validation to update body
const updateBody = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

//Route To update User informations
router.put('/update', authMiddleware, async (req, res) => {
  const response = updateBody.safeParse(req.body)

  if (!response.success) {
    res.status(411).json({ msg: 'Error while updating information' })
  }

  await User.updateOne({ _id: req.userID }, req.body)

  res.status(200).json({ message: 'Updated succesfully' })
})

//Route to get all user and filter
router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || ''

  const allUsers = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  })

  if (!allUsers) res.status(411).json({ msg: 'No such user exists!' })
  console.log(allUsers)

  res.status(200).json({
    users: allUsers.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  })
})

module.exports = router
