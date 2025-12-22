const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required !!']
    },
    title: {
        type: String,
        required: [true, 'Title is Required !!']
    },
    isSave: {
        type: String,
        required: [true, 'Save value is Required !!']
    },
    link: {
        type: String,
        required: [true, 'Link is Required !!']
    },
    imagePath: {
        type: String,
        required: [true, 'Image Path is Required !!']
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

CategorySchema.statics.isExists = async function isExists(_name, id) {
    let category;
    if (id) {
        // Check on Update
        category = await this.findOne({ name: _name, isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        category = await this.findOne({ name: _name, isActive: true }, { name: 1 })
    }
    return category ? true : false;
}


const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
