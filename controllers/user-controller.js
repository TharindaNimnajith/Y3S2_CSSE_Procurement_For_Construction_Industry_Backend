const HttpError = require('../models/http-errors')
const Users = require('../models/user.model')

const createUsers = async (req, res, next) => {
  const {
    firstName,
    lastName,
    address,
    email,
    password,
    type
  } = req.body

  const UsersItem = new Users({
    firstName,
    lastName,
    address,
    email,
    password,
    type
  })

  try {
    await UsersItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    })
    return next(error)
  }

  res.status(201).json({
    usersItem: UsersItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  })
}

const getUsers = async (req, res) => {
  Users.find({})
    .then((users) =>
      res.json({
        users: users,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editUsers = async (req, res) => {
  const {
    users,
    id
  } = req.body

  const query = {
    '_id': id
  }

  Users.findOneAndUpdate(query, users, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {
      error: err
    })
    return res.json({
      users: item,
      message: 'Edited Successfully'
    })
  })
}

const deleteUsers = async (req, res) => {
  const {
    id
  } = req.body

  Users.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getUser = async (req, res, next) => {
  let user

  const {
    id
  } = req.params

  try {
    user = await Users.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(user)
}

exports.createUsers = createUsers
exports.editUsers = editUsers
exports.getUsers = getUsers
exports.getUser = getUser
exports.deleteUsers = deleteUsers
