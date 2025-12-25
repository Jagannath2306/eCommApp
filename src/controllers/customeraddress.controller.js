const CustomerAddress = require("../models/customeraddress.model");
const Joi = require('joi');


const addCustomerAddress = async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        phone: Joi.string().min(10).max(10).required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.number().required(),
        address: Joi.string().required(),
        landmark: Joi.string().required(),
        isDefault: Joi.boolean()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const loggedInUser = req.session.customer;
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    let address = await new CustomerAddress({ ...result.value, customerId: loggedInUser.id, createdBy: loggedInUser.id }).save();
    res.status(201).json(address);
}


const updateCustomerAddress = async (req, res) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        phone: Joi.string().min(10).max(10).required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.number().required(),
        address: Joi.string().required(),
        landmark: Joi.string().required(),
        isDefault: Joi.boolean()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const loggedInUser = req.session.customer;
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const customerAddress = await CustomerAddress.findOneAndUpdate({ _id: result.value.id, isActive: true }, { ...result.value, updatedBy: loggedInUser.id });
    if (customerAddress) {
        res.status(200).json({ message: "Profile Updated Successfully !!" });
    } else {
        res.status(402).json({ error: "Data not found !!" });
    }
}

const updateDefaultAddress = async (req, res) => {
    const schema = Joi.object({
        addressId: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const loggedInUser = req.session.customer;
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const customerAddress = await CustomerAddress.findOneAndUpdate({ _id: result.value.addressId, customerId: loggedInUser.id, isActive: true }, { isDefault: true, updatedBy: loggedInUser.id });
    if (customerAddress) {
        res.status(200).json({ message: "Default Address Updated Successfully !!" });
    } else {
        res.status(402).json({ error: "Data not found !!" });
    }
}

const getAllCustomerAddressById = async (req, res) => {
    const loggedInUser = req.session.customer;
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    const limitVal = Number.parseInt(req.body.pageSize) || 10;
    const page = Number.parseInt(req.body.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = req.body.sortCol;
    const sortBy = req.body.sort || 'asc';

    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await CustomerAddress.find({ customerId: loggedInUser.id, isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal);
    let count = 0;
    count = await CustomerAddress.countDocuments({ customerId: loggedInUser.id, isActive: true });
    res.json({ rows, count });
}

const deleteAddress = async (req, res) => {
    const schema = Joi.object({
        addressId: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }
    const loggedInUser = req.session.customer;
    if (!loggedInUser || !loggedInUser.id) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    const address = await CustomerAddress.findOneAndUpdate({ _id: result.value.addressId, isActive: true }, { isActive: false, updatedBy: loggedInUser.id });
    if (address) {
        res.status(201).json({ message: "User Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

module.exports = { addCustomerAddress, updateCustomerAddress, updateDefaultAddress, getAllCustomerAddressById, deleteAddress }

