const express = require('express');
const userRouter = express.Router();
const { adminAuthMiddleware, userAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { addUser, loginUser, updateProfile, getAllUsers, getUserById, deleteUserById, updateUserById, validateUserEmail,resetUserPassword } = require('../controllers/user.controller');



/**
  * @swagger
  * tags:
  *   name: User
  *   description: API for managing users
  */




/**
  * @swagger
  * /api/User/Register:
  *   post:
  *     summary: Register a new user
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UserRegister'
  *     responses:
  *       201:
  *         description: User registered successfully
  */
userRouter.post('/Register', addUser);
/**
  * @swagger
  * /api/User/Login:
  *   post:
  *     summary: Login a user
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *              $ref: '#/components/schemas/UserLogin'
  *     responses:
  *       200:
  *         description: User logged in successfully
  */
userRouter.post('/Login', loginUser);

/**
  * @swagger
  * /api/User/UpdateProfile:
  *   post:
  *     summary: Update user profile
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateProfile'
  *     responses:
  *       200:
  *         description: Profile updated successfully
  */

userRouter.post('/UpdateProfile', userAuthMiddleware, updateProfile);
/**
  * @swagger
  * /api/User/GetAllUsers:
  *   post:
  *     summary: Get All User 
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllUser'
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  */
userRouter.post('/GetAllUsers', adminAuthMiddleware, getAllUsers);

/**
  * @swagger
  * /api/User/GetUserById/{id}:
  *   get:
  *     summary: Get user by Id
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: User Id
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Returns User object.
  */
userRouter.get('/GetUserById/:id', userAuthMiddleware, getUserById);

/**
  * @swagger
  * /api/User/DeteteUserById/{id}:
  *   put:
  *     summary: Delete user by ID
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: User ID
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: User deleted successfully
  */
userRouter.put('/DeteteUserById/:id', adminAuthMiddleware, deleteUserById);

/**
  * @swagger
  * /api/User/UpdateUserById/{id}:
  *   put:
  *     summary: Update user by ID
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: User ID
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: User updated successfully
  */
userRouter.put('/UpdateUserById/:id', adminAuthMiddleware, updateUserById);


/**
  * @swagger
  * /api/User/ValidateEmailId:
  *   post:
  *     summary: Validate User Email
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/EmailValidation'
  *     responses:
  *       200:
  *         description: Email validated successfully
  */
userRouter.post('/ValidateEmailId', userAuthMiddleware, validateUserEmail);


/**
  * @swagger
  * /api/User/ResetPassword:
  *   post:
  *     summary: Reset User Password
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/ResetPassword'
  *     responses:
  *       200:
  *         description: Password reset successfully
  */
userRouter.post('/ResetPassword', userAuthMiddleware, resetUserPassword);

module.exports = userRouter;