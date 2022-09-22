const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/', async (req, res) => {
  const data = req.body

  if (!data.name) {
    res.status(400).json({
      status: false,
      message: "Validation error",
      data: [
        {
          field: "name", 
          error: "name can not be empty"
        }
      ]
    })
  }

  const user = new User(data)
  await user.save()

  res.status(201).json({
    status: true,
    message: 'User saved successfully',
    data: user
  })
})

router.get('/', async (req, res) => {
  const users = await User.find({ })

  res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ _id: id })

  if (!user) {
    res.status(404).json({
      status: false,
      message: 'User not found'
    })
  }

  res.status(200).json(user)  
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body

  const user = await User.findByIdAndUpdate(id, data, { new: true })

  res.status(200).json({
    status: true,
    message: 'User updated successfully',
    data: user
  })
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ _id: id })

  await user.delete()

  res.status(204).send()
})

module.exports = router
