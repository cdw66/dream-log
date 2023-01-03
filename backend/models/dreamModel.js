const mongoose = require('mongoose')

const dreamSchema = mongoose.Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,    // Want user type to be an object id,
        required: true,
        ref: 'User' // Associate user with a dream
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true, // Add created at & updated at ts automatically
}
)

module.exports = mongoose.model('Dream', dreamSchema)