const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);