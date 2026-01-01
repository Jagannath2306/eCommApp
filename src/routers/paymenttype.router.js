const express = require('express');
const paymentTypeRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { savePaymentType, updatePaymentType, deletePaymentType, getPaymentTypeById, getAllPaymentTypes } = require('../controllers/paymenttype.controller');


/**
 * @swagger
 * tags:
 *  name : Payment Type
 * description : API for managing Payment Types
 */



/**
 * @swagger
 * /api/PaymentType/Save:
 *   post:
 *     summary: Insert New Payment Type
 *     tags: [Payment Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertPaymentType'
 *     responses:
 *       201:
 *         description: Payment Type Saved Successfully
 */
paymentTypeRouter.post('/Save', adminAuthMiddleware, savePaymentType);



/**
  * @swagger
  * /api/PaymentType/Update:
  *   post:
  *     summary: Update payment type
  *     tags: [Payment Type]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdatePaymentType'
  *     responses:
  *       201:
  *         description: Payment Type updated successfully.
  */
paymentTypeRouter.post('/Update', adminAuthMiddleware, updatePaymentType);
/**
  * @swagger
  * /api/PaymentType/GetAll:
  *   post:
  *     summary: Get All Payment Types
  *     tags: [Payment Type]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllPaymentTypes'
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
paymentTypeRouter.post('/GetAll', adminAuthMiddleware, getAllPaymentTypes);

/**
  * @swagger
  * /api/PaymentType/GetById:
  *   post:
  *     summary: Get payment type by Id
  *     tags: [Payment Type]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetPaymentTypeById'
  *     responses:
  *       200:
  *         description: Payment Type fetched successfully.
  */
paymentTypeRouter.post('/GetById', adminAuthMiddleware, getPaymentTypeById);

/**
  * @swagger
  * /api/PaymentType/Delete:
  *   post:
  *     summary: Delete payment type
  *     tags: [Payment Type]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeletePaymentType'
  *     responses:
  *       200:
  *         description: Payment Type deleted successfully.
  */
paymentTypeRouter.post('/Delete', adminAuthMiddleware, deletePaymentType);


module.exports = paymentTypeRouter;