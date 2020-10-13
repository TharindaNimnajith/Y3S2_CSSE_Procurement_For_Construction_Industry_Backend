const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  address: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  type: {
    type: String,
    required: false,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'User'
})

UserSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userId',
  startAt: 100,
  incrementBy: 1
})

module.exports = mongoose.model('User', UserSchema)
