const ProductStatusMapping = require('../models/productstatusmapping.model');
const Joi = require('joi');

const saveProductStatusMapping = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        productId: Joi.string().required(),
        statusId: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    let isExist = await ProductStatusMapping.isExists(result.value.productId, result.value.statusId);
    if (!isExist) {
        let productstatusmapping = await new ProductStatusMapping({ ...result.value, createdBy: loggedInUser.id }).save();
        res.status(201).json({ success: true, message: "Product Status Mapping Saved Successfully !!" });
    } else {
        return res.status(400).json({ success: false, message: `Product Status Mapping already exists !!` });
    }
}


const updateProductStatusMapping = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required(),
        productId: Joi.string().required(),
        statusId: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }

    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    const { productId, statusId, id } = result.value;


    let isExists = await ProductStatusMapping.isExists(productId, statusId, id);
    if (!isExists) {
        await ProductStatusMapping.findOneAndUpdate({ _id: id }, { productId: productId, statusId: statusId, updatedBy: loggedInUser.id });
        res.status(201).json({ success: true, message: "Product Status Mapping Updated Successfully !!" });
    } else {
       return res.status(400).json({ success: false, message: `Product Status Mapping already exists !!` });
    }
}

const getAllProductStatusMapping = async (req, res) => {
    const schema = Joi.object({
        pageSize: Joi.number().min(5).required(),
        page: Joi.number().min(1).required(),
        sortCol: Joi.string().required(),
        sort: Joi.string().valid('asc', 'desc').required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }
    const limitVal = Number.parseInt(result.value.pageSize) || 10;
    const page = Number.parseInt(result.value.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = result.value.sortCol;
    const sortBy = result.value.sort || 'asc';
    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await ProductStatusMapping.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'productId', select: 'name code title price salePrice shortDetails description quantity discount isNewItem isSale imagePaths isActive' })
        .populate({ path: 'statusId', select: 'name' })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    let count = 0;
    count = await ProductStatusMapping.countDocuments({ isActive: true });
    return res.status(200).json({
        success: true,
        data: rows,
         meta: {
            page : page,
            pageSize : limitVal,
            total: count
        }
    });
}


const getProductStatusMappingById = async (req, res) => {
      const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }
    const id = result.value.id;

    const productstatusmapping = await ProductStatusMapping.findOne({ _id: id, isActive: true })
        .populate({ path: 'productId', select: 'name code title price salePrice shortDetails description quantity discount isNewItem isSale imagePaths isActive' })
        .populate({ path: 'statusId', select: 'name' })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (productstatusmapping) {
        res.status(200).json({success: true, data: productstatusmapping});
    } else {
        res.status(402).json({ success: false, message: "Data not found" });
    }
}

const deleteProductStatusMapping = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }

    let isExists = await ProductStatusMapping.findOne({ _id: result.value.id, isActive: true }, { productId: 1 });
    if (isExists) {
        await ProductStatusMapping.findOneAndUpdate({ _id: result.value.id, isActive: true }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ success: true, message: "Product Status Mapping Deleted Successfully !!" });
    } else {
      return  res.status(402).json({ success: false, message: `Record not found to delete !!` });
    }
}

module.exports = { saveProductStatusMapping, updateProductStatusMapping, getAllProductStatusMapping, getProductStatusMappingById, deleteProductStatusMapping };