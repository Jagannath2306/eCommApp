const Color = require('../models/color.model');
const Joi = require('joi');

const saveColor = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        code: Joi.string().min(7).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const code = result.value.code;
    const color = new Color({ name: name, code: code, createdBy: loggedInUser.id });

    let isExists = await Color.isExists(name, code);
    if (!isExists) {
        let result = await color.save();
        res.status(201).json(result);
    } else {
        res.status(400).json({ Error: `Color Name ${name} or Code ${code} already exists !!` });
        return;
    }
}


const updateColor = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(20).required(),
        code: Joi.string().min(7).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const code = result.value.code;
    const colorId = result.value.id;


    let isExists = await Color.isExists(name, code, colorId);
    if (!isExists) {
        await Color.findOneAndUpdate({ _id: colorId }, { ...result.value, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Color Updated Successfully !!" });
    } else {
        res.status(400).json({ Error: `Color Name ${name} or Code ${code} already exists !!` });
        return;
    }
}

const getAllColors = async (req, res) => {
    const limitVal = Number.parseInt(req.body.pageSize) || 10;
    const page = Number.parseInt(req.body.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = req.body.sortCol;
    const sortBy = req.body.sort || 'asc';

    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await Color.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    let count = 0;
    count = await Color.countDocuments({ isActive: true });
    res.json({ rows, count });
}

const getColorById = async (req, res) => {
    const id = req.params.id;

    const color = await Color.findOne({ _id: id, isActive: true })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (color) {
        res.json({ color });
    } else {
        res.status(402).json({ error: "Data not found" });
    }
}

const deleteColor = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const colorId = result.value.id;

    let isExists = await Color.findOne({ _id: colorId, isActive: true }, { name: 1 });
    if (isExists) {
        await Color.findOneAndUpdate({ _id: colorId }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Color Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

module.exports = { saveColor, updateColor, deleteColor, getColorById, getAllColors }