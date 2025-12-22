const Size = require('../models/size.model');
const Joi = require('joi');

const saveSize = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const size = new Size({ name: name, createdBy: loggedInUser.id });

    let isExists = await Size.isExists(name);
    if (!isExists) {
        let result = await size.save();
        res.status(201).json(result);
    } else {
        res.status(400).json({ Error: `Size Name ${name} already exists !!` });
        return;
    }
}


const updateSize = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const userTypeId = result.value.id;


    let isExists = await Size.isExists(name, userTypeId);
    if (!isExists) {
        await Size.findOneAndUpdate({ _id: userTypeId }, { name: name, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Size Updated Successfully !!" });
    } else {
        res.status(400).json({ Error: `Size Name ${name} already exists !!` });
        return;
    }
}


const deleteSize = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const userTypeId = result.value.id;

    let isExists = await Size.findOne({ _id: userTypeId, isActive: true }, { name: 1 });
    if (isExists) {
        await Size.findOneAndUpdate({ _id: userTypeId }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Size Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

const getSizeById = async (req, res) => {
    const id = req.params.id;

    const size = await Size.findOne({ _id: id, isActive: true })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (size) {
        res.json({ size });
    } else {
        res.status(402).json({ error: "Data not found" });
    }
}

const getAllSize = async (req, res) => {
    const limitVal = Number.parseInt(req.body.pageSize) || 10;
    const page = Number.parseInt(req.body.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = req.body.sortCol;
    const sortBy = req.body.sort || 'asc';

    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await Size.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    let count = 0;
    count = await Size.countDocuments({ isActive: true });
    res.json({ rows, count });
}

module.exports = { saveSize, updateSize, deleteSize, getSizeById, getAllSize }