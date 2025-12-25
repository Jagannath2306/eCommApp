const express = require('express');
const customerAddressRoute = express.Router();
const { customerAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { addCustomerAddress, updateCustomerAddress, updateDefaultAddress, getAllCustomerAddressById, deleteAddress } = require('../controllers/customeraddress.controller');



/**
  * @swagger
  * tags:
  *   name: Address
  *   description: API for managing customer addresses       
  */


/**
  * @swagger
  * /api/CustomerAddress/Register:
  *   post:
  *     summary: Register a new user
  *     tags: [Address]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/CustomerAddressRegister'
  *     responses:
  *       201:
  *         description: Customer registered successfully
  */
customerAddressRoute.post('/Register', customerAuthMiddleware, addCustomerAddress);

/**
 * @swagger
 * /api/CustomerAddress/UpdateAddress:
 *   post:
 *     summary: Update customer profile
 *     tags: [Address]
 *     description: Update customer basic details with profile picture
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateCustomerAddress'
  *     responses:
  *       201:
  *         description: Customer registered successfully
 */

customerAddressRoute.post('/UpdateAddress', customerAuthMiddleware, updateCustomerAddress);
/**
  * @swagger
  * /api/CustomerAddress/GetAllCustomerAddressById:
  *   post:
  *     summary: Get All Customer Address
  *     tags: [Address]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllCustomerAddressById'
  *     responses:
  *       201:
  *         description: Customer registered successfully
  */
customerAddressRoute.post('/GetAllCustomerAddressById', customerAuthMiddleware, getAllCustomerAddressById);

/**
 * @swagger
 * /api/CustomerAddress/UpdateDefaultAddress:
 *   post:
 *     summary: Update Default Address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDefaultAddress'
 *     responses:
 *       200:
 *         description: Default Address Updated Successfully !!
 */
customerAddressRoute.post('/UpdateDefaultAddress', customerAuthMiddleware, updateDefaultAddress);

/**
  * @swagger
  * /api/CustomerAddress/DeleteAddress:
  *   post:
  *     summary: Delete customer
  *     tags: [Address]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteAddress'
  *     responses:
  *       200:
  *         description: Default Address Updated Successfully !!
  */
customerAddressRoute.post('/DeleteAddress', customerAuthMiddleware, deleteAddress);



module.exports = customerAddressRoute;