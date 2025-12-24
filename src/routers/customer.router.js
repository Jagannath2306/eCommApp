const express = require('express');
const customerRouter = express.Router();
const { customerAuthMiddleware, adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { addCustomer, loginCustomer, updateCustomerProfile, getAllCustomers, deleteCustomerById, getCustomerById, validateUserEmail, resetUserPassword } = require('../controllers/customer.controller');



/**
  * @swagger
  * tags:
  *   name: Customer
  *   description: API for managing customers       
  */


/**
  * @swagger
  * /api/Customer/Register:
  *   post:
  *     summary: Register a new user
  *     tags: [Customer]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/CustomerRegister'
  *     responses:
  *       201:
  *         description: Customer registered successfully
  */
customerRouter.post('/Register', addCustomer);
/**
  * @swagger
  * /api/Customer/Login:
  *   post:
  *     summary: Login a customer
  *     tags: [Customer]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *              $ref: '#/components/schemas/CustomerLogin'
  *     responses:
  *       200:
  *         description: User logged in successfully
  */
customerRouter.post('/Login', loginCustomer);

/**
 * @swagger
 * /api/Customer/UpdateProfile:
 *   post:
 *     summary: Update customer profile
 *     tags: [Customer]
 *     description: Update customer basic details with profile picture
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - profilePicture
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 20
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 20
 *               phone:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *               profilePicture:
 *                 type: file
 *                 description: Upload customer profile image
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile Updated Successfully !!
 *       400:
 *         description: Validation or upload error
 *       401:
 *         description: Unauthorized user
 */


customerRouter.post('/UpdateProfile', customerAuthMiddleware, updateCustomerProfile);
/**
  * @swagger
  * /api/Customer/GetAllCustomers:
  *   post:
  *     summary: Get All Customer 
  *     tags: [Customer]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllCustomers'
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
customerRouter.post('/GetAllCustomers', adminAuthMiddleware, getAllCustomers);

/**
  * @swagger
  * /api/Customer/GetCustomerById:
  *   get:
  *     summary: Get customer 
  *     tags: [Customer]    
  *     responses:
  *       200:
  *         description: Returns Customer object.
  */
customerRouter.get('/GetCustomerById', customerAuthMiddleware, getCustomerById);

/**
  * @swagger
  * /api/Customer/DeleteCustomerById:
  *   put:
  *     summary: Delete customer
  *     tags: [Customer]
  *     responses:
  *       200:
  *         description: Customer deleted successfully
  */
customerRouter.put('/DeleteCustomerById', customerAuthMiddleware, deleteCustomerById);



/**
  * @swagger
  * /api/Customer/ValidateEmailId:
  *   post:
  *     summary: Validate Customer Email
  *     tags: [Customer]
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
customerRouter.post('/ValidateEmailId', customerAuthMiddleware, validateUserEmail);


/**
  * @swagger
  * /api/Customer/ResetPassword:
  *   post:
  *     summary: Reset Customer Password
  *     tags: [Customer]
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
customerRouter.post('/ResetPassword', customerAuthMiddleware, resetUserPassword);

module.exports = customerRouter;