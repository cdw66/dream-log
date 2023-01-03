const mongoose = require('mongoose')

const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true // email must be unique
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
}, {
    timestamps: true, // Add created at & updated at ts automatically
}
)

module.exports = mongoose.model('User', userSchema)