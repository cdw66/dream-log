const asyncHandler = require('express-async-handler')

// @desc    Get dreams
// @route   GET /api/dreams
// @access  Private
const getDreams = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get dreams'})
})

// @desc    Create a dream log
// @route   POST /api/dreams
// @access  Private
const setDream = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Create dream log'})
})

// @desc    Update a dream log
// @route   PUT /api/dreams/:id
// @access  Private
const updateDream = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Update dream log'})
})

// @desc    Delete a dream log
// @route   DELETE /api/dreams/:id
// @access  Private
const deleteDream = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete dream ${req.params.id}`})
})

module.exports = {
    getDreams, 
    setDream, 
    updateDream, 
    deleteDream
}