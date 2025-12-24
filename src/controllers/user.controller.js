const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        userTypeId: Joi.string().required(),
        password: Joi.string().required()
    });

    const result = schema.validate(user);
    return result;
}
function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = schema.validate(user);
    return result;
}

const addUser = async (req, res) => {
    const result = validateUser(req.body);

    // if (result.error) {
    //     return res.status(400).send({ error: result.error.details[0].message });
    // }

    const userData = result.value;
    // We have to Check Password and Confirm Password Equality

    let isExist = await User.isExists(userData.email);
    if (!isExist) {
        let user = await new User(userData).save();
        res.status(201).json(user);
    } else {
        return res.send({ error: "Email Id already exists !!" });
    }
}

const loginUser = async (req, res) => {
    const result = validateLoginUser(req.body);

    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const { email, password } = result.value;
    const user = await User.findOne({ email: email, isActive: true }).populate('userTypeId', 'name');

    if (user) {
        const isMatchPassword = bcrypt.compareSync(password, user.password);
        if (isMatchPassword) {
            const payload = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userTypeId: user.userTypeId._id,
                userTypeName: user.userTypeId.name
            }
            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.json({ message: "Login Success !!", token })
        } else {
            return res.status(402).send({ error: "Invalid Credential !!" });
        }
    } else {
        return res.status(402).send({ error: "User Not Found !!" });
    }
}

const updateProfile = async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const loggedInUser = req.session.user;
    await User.findOneAndUpdate({ _id: loggedInUser.id }, result.value);
    res.json({ message: "User Profile Updated Successfully !!" });
}

const updateUserById = async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const loggedInUser = req.session.user;
    
    await User.findOneAndUpdate({ _id: req.params.id, isActive: true }, { ...result.value, updatedBy: loggedInUser.id })
        .populate({ path: 'userTypeId', select: 'name' })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    res.json({ message: "User Profile Updated Successfully !!" });
}

const getAllUsers = async (req, res) => {
    const limitVal = Number.parseInt(req.body.pageSize) || 10;
    const page = Number.parseInt(req.body.page) || 1;
    const skipCount = limitVal * (page - 1);
    const sortCol = req.body.sortCol;
    const sortBy = req.body.sort || 'asc';

    const sortObject = {};
    sortObject[sortCol] = sortBy === 'asc' ? 1 : -1;

    const rows = await User.find({ isActive: true })
        .sort(sortObject)
        .skip(skipCount)
        .limit(limitVal)
        .populate({ path: 'userTypeId', select: 'name' })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' })
    let count = 0;
    count = await User.countDocuments({ isActive: true });
    res.json({ rows, count });
}

const deleteUserById = async (req, res) => {
    const loggedInUser = req.session.user;
    let isExists = await User.findOne({ _id: req.params.id, isActive: true }, { name: 1 });
    if (isExists) {
        await User.findOneAndUpdate({ _id: req.params.id, isActive: true }, { isActive: false, updatedBy: loggedInUser.id });
        res.status(201).json({ message: "User Deleted Successfully !!" });
    } else {
        res.status(402).json({ Error: `Record not found to delete !!` });
        return;
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id, isActive: true })
     .populate({ path: 'userTypeId', select: 'name' })
        .populate({ path: 'createdBy', select: 'firstName lastName email' })
        .populate({ path: 'updatedBy', select: 'firstName lastName email' });
    if (user) {
        res.json({ user });
    } else {
        res.status(402).json({ error: "Data not found" });
    }
}

const validateUserEmail = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        email: Joi.string().email().required()
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const email = result.value.email;

    let isExists = await User.isExists(email);
    if (!isExists) {
        res.status(400).json({ error: "User doesn't exist !!" });
    } else {
        res.status(200).json({ message: `User exist` });
        return;
    }
}

const resetUserPassword = async (req, res) => {
    const loggedInUser = req.session.user;

    const Schema = Joi.object({
        email: Joi.string().email().required(),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    });

    const result = Schema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message });
    }

    const email = result.value.email;
    const oldPassword = result.value.oldPassword

    let isExists = await User.isExists(email);
    if (!isExists) {
        res.status(400).json({ error: "User doesn't exist !!" });
        return;
    }
    const user = await User.findOne({ email: email, isActive: true });
    if (user) {
        const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

        if (isPasswordMatch) {
            const newPassword = await bcrypt.hash(req.body.newPassword, 12);
            await User.findOneAndUpdate({ email: email, isActive: true }, { password: newPassword });
            res.status(200).json({ message: "Password Reset Successfully !!" });
        } else {
            res.status(400).json({ error: "Old Password didn't match !!" });
        }
    }
}

module.exports = { addUser, loginUser, updateProfile, getAllUsers, getUserById, deleteUserById, updateUserById, validateUserEmail, resetUserPassword }


// Refresh Token
// Reset Password

//first Verfy

