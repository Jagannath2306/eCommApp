const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required !!']
    },
    code: {
        type: String,
        required: [true, 'Code is Required !!']
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

ColorSchema.statics.isExists = async function isExists(_name, _code, id) {
    let Color;

    if (id) {
        // Check on Update
        Color = await this.findOne({ $or: [{ name: _name }, { code: _code }], isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        Color = await this.findOne({ $or: [{ name: _name }, { code: _code }], isActive: true }, { name: 1 })
    }
    return Color ? true : false;
}

const Color = mongoose.model('color', ColorSchema);

module.exports = Color;



