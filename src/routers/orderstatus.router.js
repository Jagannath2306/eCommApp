const express = require('express');
const orderStatusRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { saveOrderStatus, updateOrderStatus, deleteOrderStatus, getOrderStatusById, getAllOrderStatuses } = require('../controllers/orderstatus.controller');


/**
 * @swagger
 * tags:
 *  name : OrderStatus
 * description : API for managing Order Statuses
 */



/**
 * @swagger
 * /api/OrderStatus/Save:
 *   post:
 *     summary: Insert New Order Status
 *     tags: [OrderStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertOrderStatus'
 *     responses:
 *       201:
 *         description: Order Status Saved Successfully
 */
orderStatusRouter.post('/Save', adminAuthMiddleware, saveOrderStatus);



/**
  * @swagger
  * /api/OrderStatus/Update:
  *   post:
  *     summary: Update order status
  *     tags: [OrderStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateOrderStatus'
  *     responses:
  *       201:
  *         description: Order Status updated successfully.
  */
orderStatusRouter.post('/Update', adminAuthMiddleware, updateOrderStatus);
/**
  * @swagger
  * /api/OrderStatus/GetAll:
  *   post:
  *     summary: Get All Order Statuses
  *     tags: [OrderStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllOrderStatuses'
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
orderStatusRouter.post('/GetAll', adminAuthMiddleware, getAllOrderStatuses);

/**
  * @swagger
  * /api/OrderStatus/GetById:
  *   post:
  *     summary: Get order status by Id
  *     tags: [OrderStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetOrderStatusById'
  *     responses:
  *       200:
  *         description: Order Status fetched successfully.
  */
orderStatusRouter.post('/GetById', adminAuthMiddleware, getOrderStatusById);
/**
  * @swagger
  * /api/OrderStatus/Delete:
  *   post:
  *     summary: Delete order status
  *     tags: [OrderStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteOrderStatus'
  *     responses:
  *       200:
  *         description: Order Status deleted successfully.
  */
orderStatusRouter.post('/Delete', adminAuthMiddleware, deleteOrderStatus);


module.exports = orderStatusRouter;