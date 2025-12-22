const mongoose = require('mongoose');

const BrandLogoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required !!']
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

BrandLogoSchema.statics.isExists = async function isExists(_name, id) {
    let brandlogo;
    if (id) {
        // Check on Update
        brandlogo = await this.findOne({ name: _name, isActive: true, _id: { $ne: id } }, { name: 1 })
    } else {
        //Check on Insert
        brandlogo = await this.findOne({ name: _name, isActive: true }, { name: 1 })
    }
    return brandlogo ? true : false;
}


const BrandLogo = mongoose.model('brandlogo', BrandLogoSchema);

module.exports = BrandLogo;



