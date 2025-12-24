const mongoose = require('mongoose');
const ContactUsSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required !!'],
        uppercase: true,
        match: [/^[a-z ,.'-]+$/i, "First Name is Invalid"]
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required !!'],
        uppercase: true,
        match: [/^[a-z ,.'-]+$/i, "Last Name is Invalid"]
    },
    email: {
        type: String,
        required: [true, 'Email is Required !!'],
        lowercase: true,
        match: [/^[^@]+@[^@]+\.[^@]+$/, "Email is Invalid"]
    },
    phone: {
        type: Number,
        required: [true, 'Phone is Required !!'],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: {
        type: String,
        required: [true, 'Message is Required !!']
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'usermaster'
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const ContactUs = mongoose.model('contactus', ContactUsSchema);
module.exports = ContactUs;
