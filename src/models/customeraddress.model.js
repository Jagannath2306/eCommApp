const mongoose = require('mongoose');
const CustomerAddressSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'customermaster',
        required: true
    },
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
    phone: {
        type: String,
        required: [true, 'Phone Number is Required !!']
    },
    country: {
        type: String,
        required: [true, 'Country is Required !!']
    },
    state: {
        type: String,
        required: [true, 'State is Required !!']
    },
    city: {
        type: String,
        required: [true, 'City is Required !!']
    },
    zipcode: {
        type: Number,
        required: [true, 'Zipcode is Required !!']
    },
    address: {
        type: String,
        required: [true, 'Password is Required !!']
    },
    landmark: {
        type: String,
        required: [true, 'Confirm Password is Required !!']
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'customermaster',
        //required: true
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'customermaster'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const CustomerAddress = mongoose.model('customeraddress', CustomerAddressSchema);
module.exports = CustomerAddress;