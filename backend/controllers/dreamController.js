const asyncHandler = require('express-async-handler')


const Dream = require('../models/dreamModel')
const User = require('../models/userModel')

// @desc    Get dreams
// @route   GET /api/dreams
// @access  Private
const getDreams = asyncHandler(async (req, res) => {
    const dreams = await Dream.find({ user: req.user.id })

    res.status(200).json(dreams)
})

// @desc    Create a dream log
// @route   POST /api/dreams
// @access  Private
const setDream = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if (!req.body.title || !req.body.description) {
        res.status(400)
        throw new Error('Please add a title and description')
    }

    const dream = await Dream.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    })

    res.status(200).json(dream)
})

// @desc    Update a dream log
// @route   PUT /api/dreams/:id
// @access  Private
const updateDream = asyncHandler(async (req, res) => {

    const dream = await Dream.findById(req.params.id)

    if (!dream) {
        res.status(400)
        throw new Error('Dream not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // check if logged in user matches dream user
    if (dream.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedDream = await Dream.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedDream)
})

// @desc    Delete a dream log
// @route   DELETE /api/dreams/:id
// @access  Private
const deleteDream = asyncHandler(async (req, res) => {
    const dream = await Dream.findById(req.params.id)

    if (!dream) {
        res.status(400)
        throw new Error('Dream not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // check if logged in user matches dream user
    if (dream.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await dream.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getDreams,
    setDream,
    updateDream,
    deleteDream
}