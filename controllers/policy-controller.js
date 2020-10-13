const HttpError = require('../models/http-errors')
const Policys = require('../models/policy.model')

const createPolicys = async (req, res, next) => {
  const {property, value} = req.body

  const PolicysItem = new Policys({
    property,
    value
  })

  try {
    await PolicysItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    policysItem: PolicysItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getPolicys = async (req, res, next) => {
  Policys.find({})
    .then((policys) =>
      res.json({policys: policys, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editPolicys = async (req, res, next) => {
  const {policys, id} = req.body
  const query = {'_id': id}
  Policys.findOneAndUpdate(query, policys, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({policys: item, message: 'got results'})
  })
}

const deletePolicys = async (req, res, next) => {
  const {id} = req.body
  Policys.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getPolicy = async (req, res, next) => {
  let policy

  const {
    id
  } = req.params

  try {
    policy = await Policys.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(policy)
}

exports.createPolicys = createPolicys
exports.editPolicys = editPolicys
exports.getPolicys = getPolicys
exports.getPolicy = getPolicy
exports.deletePolicys = deletePolicys

