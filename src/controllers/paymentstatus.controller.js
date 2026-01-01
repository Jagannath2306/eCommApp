const PaymentStatus = require('../models/paymentstatus.model');
const Joi = require('joi');

const savePaymentStatus = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }

    const name = result.value.name;
    const paymentStatus = new PaymentStatus({ name: name, createdBy: loggedInUser.id });

    let isExists = await PaymentStatus.isExists(name);
    if (!isExists) {
        let result = await paymentStatus.save();
        res.status(201).json({ success: true, message: "Payment Status Saved Successfully !!" });
    } else {
      return res.status(400).json({ success: false, message: `Payment Status Name ${name} already exists !!` });
    }
}


const updatePaymentStatus = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }

    const name = result.value.name;
    const tagId = result.value.id;


    let isExists = await PaymentStatus.isExists(name, tagId);
    if (!isExists) {
        await PaymentStatus.findOneAndUpdate({ _id: tagId }, { name: name, updatedBy: loggedInUser.id });
        res.status(201).json({ success: true, message: "Payment Status Updated Successfully !!" });
    } else {
        return res.status(400).json({ success: false, message: `Payment Status Name ${name} already exists !!` });
    }
}


const deletePaymentStatus = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ success: false, message: result.error.details[0].message });
    }

    const tagId = result.value.id;

    let isExists = await PaymentStatus.findOne({ _id: tagId, isActive: true }, { name: 1 });
    if (isExists) {
        await PaymentStatus.findOneAndUpdate({ _id: tagId }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ success: true, message: "Payment Status Deleted Successfully !!" });
    } else {
        return res.status(402).json({ success: false, message: `Record not found to delete !!` });
    }
}

const getPaymentStatusById = async (req, res) => {
    const id = req.body.id;

    const paymentStatus = await PaymentStatus.findOne({ _id: id, isActive: true })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (paymentStatus) {
        res.json({ success: true, data: paymentStatus });
    } else {
        res.status(402).json({ success: false, message: "Data not found" });
    }
}

const getAllPaymentStatuses = async (req, res) => {
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

    const rows = await PaymentStatus.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    let count = 0;
    count = await PaymentStatus.countDocuments({ isActive: true });
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

module.exports = { savePaymentStatus, updatePaymentStatus, deletePaymentStatus, getPaymentStatusById, getAllPaymentStatuses }