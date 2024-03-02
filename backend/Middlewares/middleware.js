const jwt = require('jsonwebtoken')
const key = require('../config')

const authMiddleware = (req, res, next) => {
  const authHaeder = req.headers['authorization']
  const token = authHaeder && authHaeder.split(' ')[1]
  if (token === null) res.status(403).json({ msg: 'No Token' })

  jwt.verify(token, key, (err, data) => {
    if (err) return res.status(500).json({ msg: 'Invalid Token' })
    req.userID = data.userID

    next()
  })
}

module.exports = { authMiddleware }
