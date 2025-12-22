const UserType = require('../models/usertype.model');
const Joi = require('joi');

const saveUserType = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        name: Joi.string().min(2).max(20).required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const name = result.value.name;
    const usertype = new UserType({ name: name, createdBy: loggedInUser.id });

    let isExists = await UserType.isExists(name);
    if (!isExists) {
        let result = await usertype.save();
        res.status(201).json(result);
    } else {
        res.status(400).json({ Error: `UserType Name ${name} already exists !!` });
        return;
    }
}


const updateUserType = async (req, res) => {
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


    let isExists = await UserType.isExists(name, userTypeId);
    if (!isExists) {
        await UserType.findOneAndUpdate({ _id: userTypeId }, { name: name, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "UserType Updated Successfully !!" });
    } else {
        res.status(400).json({ Error: `UserType Name ${name} already exists !!` });
        return;
    }
}


const deleteUserType = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        id: Joi.string().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const userTypeId = result.value.id;

    let isExists = await UserType.findOne({ _id: userTypeId, isActive: true }, { name: 1 });
    if (isExists) {
        await UserType.findOneAndUpdate({ _id: userTypeId }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "UserType Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

const getUserTypeById = async (req, res) => {
    const id = req.params.id;

    const usertype = await UserType.findOne({ _id: id, isActive: true })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (usertype) {
        res.json({ usertype });
    } else {
        res.status(402).json({ error: "Data not found" });
    }
}

const getAllUserType = async (req, res) => {
    const limitVal = Number.parseInt(req.body.pageSize) || 10;
    const page = Number.parseInt(req.body.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = req.body.sortCol;
    const sortBy = req.body.sort || 'asc';

    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await UserType.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    let count = 0;
    count = await UserType.countDocuments({ isActive: true });
    res.json({ rows, count });
}

module.exports = { saveUserType, updateUserType, deleteUserType, getUserTypeById, getAllUserType }