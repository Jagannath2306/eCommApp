const express = require('express');
const paymentStatusRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { savePaymentStatus, updatePaymentStatus, deletePaymentStatus, getPaymentStatusById, getAllPaymentStatuses} = require('../controllers/paymentstatus.controller');


/**
 * @swagger
 * tags:
 *  name : Payment Status
 * description : API for managing Payment Statuses
 */



/**
 * @swagger
 * /api/PaymentStatus/Save:
 *   post:
 *     summary: Insert New Payment Status
 *     tags: [Payment Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertPaymentStatus'
 *     responses:
 *       201:
 *         description: Payment Status Saved Successfully
 */
paymentStatusRouter.post('/Save', adminAuthMiddleware, savePaymentStatus);



/**
  * @swagger
  * /api/PaymentStatus/Update:
  *   post:
  *     summary: Update payment status
  *     tags: [Payment Status]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdatePaymentStatus'
  *     responses:
  *       201:
  *         description: Payment Status updated successfully.
  */
paymentStatusRouter.post('/Update', adminAuthMiddleware, updatePaymentStatus);
/**
  * @swagger
  * /api/PaymentStatus/GetAll:
  *   post:
  *     summary: Get All Payment Statuses
  *     tags: [Payment Status]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllPaymentStatuses'
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
paymentStatusRouter.post('/GetAll', adminAuthMiddleware, getAllPaymentStatuses);

/**
  * @swagger
  * /api/PaymentStatus/GetById:
  *   post:
  *     summary: Get payment status by Id
  *     tags: [Payment Status]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetPaymentStatusById'
  *     responses:
  *       200:
  *         description: Payment Status fetched successfully.
  */
paymentStatusRouter.post('/GetById', adminAuthMiddleware, getPaymentStatusById);
/**
  * @swagger
  * /api/PaymentStatus/Delete:
  *   post:
  *     summary: Delete payment status
  *     tags: [Payment Status]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeletePaymentStatus'
  *     responses:
  *       200:
  *         description: Payment Status deleted successfully.
  */
paymentStatusRouter.post('/Delete', adminAuthMiddleware, deletePaymentStatus);


module.exports = paymentStatusRouter;