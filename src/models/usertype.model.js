const mongoose = require('mongoose');

const UserTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required !!']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'usermaster',
        required: true
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'usermaster'
    }
}, {
    // timestamps: true
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

UserTypeSchema.statics.isExists = async function isExists(_name, id) {
    let Usertype;

    if (id) {
        // Check on Update
        Usertype = await this.findOne({ name: _name, isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        Usertype = await this.findOne({ name: _name, isActive: true }, { name: 1 })
    }
    return Usertype ? true : false;
}

const UserType = mongoose.model('usertype', UserTypeSchema);
module.exports = UserType;


// //(_name = 'developer', id = 1)
// //(_name = 'developer', id = 1)
// //(_name = 'developer', id = 1)

// (_name = 'Staff', id = 3)
// 1 admin-- developer-- staff
// 2 emp
// 3 staff-- Staff
// 4 group admin


