const mongoose = require('mongoose');

const ProductStatusMappingSchema = mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    statusId: {
        type: mongoose.Types.ObjectId,
        ref: 'productmasterstatus',
        required: true
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

ProductStatusMappingSchema.statics.isExists = async function isExists(productId, statusId, id) {
    let productStatusmapping;

    if (id) {
        // Check on Update
        productStatusmapping = await this.findOne({ productId, statusId, isActive: true, _id: { $ne: id } }, { productId: 1 })
    } else {
        //Check on Insert
        productStatusmapping = await this.findOne({ productId, statusId, isActive: true }, { productId: 1 })
    }
    return productStatusmapping ? true : false;
}

const ProductStatusMapping = mongoose.model('productstatusmapping', ProductStatusMappingSchema);

module.exports = ProductStatusMapping;
