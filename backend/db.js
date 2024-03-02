const mongoose = require('mongoose')

// connecting to db

mongoose.connect(
  'mongodb+srv://durgeshityaar:KvElbvaERVsnhoRw@cluster0.4kaupi3.mongodb.net/payTm'
)

if (!mongoose.connect) console.log(' Cant Connect to DB')
console.log(' Connected to Mongo DB')

// Defining Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
})

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

// Modeling

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', bankSchema)

//Exporting

module.exports = { User, Account }
