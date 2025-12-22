const Tag = require('../models/tag.model');
const Joi = require('joi');

const saveTag = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const tag = new Tag({ name: name, createdBy: loggedInUser.id });

    let isExists = await Tag.isExists(name);
    if (!isExists) {
        let result = await tag.save();
        res.status(201).json(result);
    } else {
        res.status(400).json({ Error: `Tag Name ${name} already exists !!` });
        return;
    }
}


const updateTag = async (req, res) => {
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
    const tagId = result.value.id;


    let isExists = await Tag.isExists(name, tagId);
    if (!isExists) {
        await Tag.findOneAndUpdate({ _id: tagId }, { name: name, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Tag Updated Successfully !!" });
    } else {
        res.status(400).json({ Error: `Tag Name ${name} already exists !!` });
        return;
    }
}


const deleteTag = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const tagId = result.value.id;

    let isExists = await Tag.findOne({ _id: tagId, isActive: true }, { name: 1 });
    if (isExists) {
        await Tag.findOneAndUpdate({ _id: tagId }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "Tag Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

const getTagById = async (req, res) => {
    const id = req.params.id;

    const tag = await Tag.findOne({ _id: id, isActive: true })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (tag) {
        res.json({ tag });
    } else {
        res.status(402).json({ error: "Data not found" });
    }
}

const getAllTags = async (req, res) => {
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
    count = await Tag.countDocuments({ isActive: true });
    res.json({ rows, count });
}

module.exports = { saveTag, updateTag, deleteTag, getTagById, getAllTags }