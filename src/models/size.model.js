const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema({
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

SizeSchema.statics.isExists = async function isExists(_name, id) {
    let Size;

    if (id) {
        // Check on Update
        Size = await this.findOne({ name: _name, isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        Size = await this.findOne({ name: _name, isActive: true }, { name: 1 })
    }
    return Size ? true : false;
}

const Size = mongoose.model('size', SizeSchema);

module.exports = Size;



