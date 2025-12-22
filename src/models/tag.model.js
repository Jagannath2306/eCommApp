const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
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

TagSchema.statics.isExists = async function isExists(_name, id) {
    let Tag;

    if (id) {
        // Check on Update
        Tag = await this.findOne({ name: _name, isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        Tag = await this.findOne({ name: _name, isActive: true }, { name: 1 })
    }
    return Tag ? true : false;
}

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;



