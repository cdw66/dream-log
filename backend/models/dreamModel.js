const mongoose = require('mongoose')

const dreamSchema = mongoose.Schema( {
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