const express = require('express');
const productmasterstatusRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const {  saveProductMasterStatus, updateProductMasterStatus, getAllProductMasterStatus, getProductMasterStatusById, deleteProductMasterStatus} = require('../controllers/productmasterstatus.controller');


/**
 * @swagger
 * tags:
 *  name : ProductMasterStatus
 * description : API for managing ProductMasterStatus 
 */



/**
 * @swagger
 * /api/ProductMasterStatus/Save:
 *   post:
 *     summary: Insert New ProductMasterStatus
 *     tags: [ProductMasterStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertProductMasterStatus'
 *     responses:
 *       201:
 *         description: ProductMasterStatus Saved Successfully
 */
productmasterstatusRouter.post('/Save', adminAuthMiddleware, saveProductMasterStatus);



/**
  * @swagger
  * /api/ProductMasterStatus/Update:
  *   post:
  *     summary: Update ProductMasterStatus
  *     tags: [ProductMasterStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateProductMasterStatus'
  *     responses:
  *       201:
  *         description: ProductMasterStatus updated successfully.
  */
productmasterstatusRouter.post('/Update', adminAuthMiddleware, updateProductMasterStatus);

/**
  * @swagger
  * /api/ProductMasterStatus/GetAll:
  *   post:
  *     summary: Get All ProductMasterStatus
  *     tags: [ProductMasterStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllProductMasterStatus'
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
productmasterstatusRouter.post('/GetAll', adminAuthMiddleware, getAllProductMasterStatus);

/**
  * @swagger
  * /api/ProductMasterStatus/GetById:
  *   post:
  *     summary: Get ProductMasterStatus by Id
  *     tags: [ProductMasterStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetProductMasterStatusById'
  *     responses:
  *       200:
  *         description: ProductMasterStatus fetched successfully.
  */
productmasterstatusRouter.post('/GetById', adminAuthMiddleware, getProductMasterStatusById);

/**
  * @swagger
  * /api/ProductMasterStatus/Delete:
  *   post:
  *     summary: Delete ProductMasterStatus
  *     tags: [ProductMasterStatus]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteProductMasterStatus'
  *     responses:
  *       200:
  *         description: ProductMasterStatus deleted successfully.
  */
productmasterstatusRouter.post('/Delete', adminAuthMiddleware, deleteProductMasterStatus);


module.exports = productmasterstatusRouter;