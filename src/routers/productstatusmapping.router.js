const express = require('express');
const productStatusMappingRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const {saveProductStatusMapping, updateProductStatusMapping, getAllProductStatusMapping, getProductStatusMappingById, deleteProductStatusMapping} = require('../controllers/productstatusmapping.controller');


/**
 * @swagger
 * tags:
 *  name : ProductStatusMapping
 * description : API for managing ProductStatusMapping 
 */



/**
 * @swagger
 * /api/ProductStatusMapping/Save:
 *   post:
 *     summary: Insert New ProductStatusMapping
 *     tags: [ProductStatusMapping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertProductStatusMapping'
 *     responses:
 *       201:
 *         description: ProductStatusMapping Saved Successfully
 */
productStatusMappingRouter.post('/Save', adminAuthMiddleware, saveProductStatusMapping);



/**
  * @swagger
  * /api/ProductStatusMapping/Update:
  *   post:
  *     summary: Update ProductStatusMapping
  *     tags: [ProductStatusMapping]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateProductStatusMapping'
  *     responses:
  *       201:
  *         description: ProductStatusMapping updated successfully.
  */
productStatusMappingRouter.post('/Update', adminAuthMiddleware, updateProductStatusMapping);

/**
  * @swagger
  * /api/ProductStatusMapping/GetAll:
  *   post:
  *     summary: Get All ProductStatusMapping
  *     tags: [ProductStatusMapping]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllProductStatusMapping'
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
productStatusMappingRouter.post('/GetAll', adminAuthMiddleware, getAllProductStatusMapping);

/**
  * @swagger
  * /api/ProductStatusMapping/GetById:
  *   post:
  *     summary: Get ProductStatusMapping by Id
  *     tags: [ProductStatusMapping]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetProductStatusMappingById'
  *     responses:
  *       200:
  *         description: ProductStatusMapping fetched successfully.
  */
productStatusMappingRouter.post('/GetById', adminAuthMiddleware, getProductStatusMappingById);

/**
  * @swagger
  * /api/ProductStatusMapping/Delete:
  *   post:
  *     summary: Delete ProductStatusMapping
  *     tags: [ProductStatusMapping]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteProductStatusMapping'
  *     responses:
  *       200:
  *         description: ProductStatusMapping deleted successfully.
  */
productStatusMappingRouter.post('/Delete', adminAuthMiddleware, deleteProductStatusMapping);


module.exports = productStatusMappingRouter;