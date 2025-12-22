const express = require('express');
const categoryRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { saveCategory, updateCategory, deleteCategory, getCategoryById, getAllCategories } = require('../controllers/category.controller');


/**
 * @swagger
 * tags:
 *  name : Category
 * description : API for managing Categories 
 */

/**
 * @swagger
 * /api/Category/Save:
 *   post:
 *     summary: Save new Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - title
 *               - isSave
 *               - link
 *               - imagePath
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                type: string
 *               isSave:
 *                type: number
 *               link:
 *                 type: string
 *               imagePath:
 *                 type: file
 *     responses:
 *       201:
 *         description: Brand logo saved successfully
 *       400:
 *         description: Validation or upload error
 *       401:
 *         description: Unauthorized
 */
categoryRouter.post('/Save', adminAuthMiddleware, saveCategory);

/**
 * @swagger
 * /api/Category/Update:
 *   post:
 *     summary: Update Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - title
 *               - isSave
 *               - link
 *               - imagePath
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               title:
 *                type: string
 *               isSave:
 *                type: number
 *               link:
 *                 type: string
 *               imagePath:
 *                 type: file
 *     responses:
 *       201:
 *         description: BrandLogo updated successfully
 *       400:
 *         description: Validation or upload error
 *       401:
 *         description: Unauthorized
 */

categoryRouter.post('/Update', adminAuthMiddleware, updateCategory);
/**
  * @swagger
  * /api/Category/GetAll:
  *   post:
  *     summary: Get All Categories
  *     tags: [Category]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllCategories'
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
categoryRouter.post('/GetAll', adminAuthMiddleware, getAllCategories);

/**
  * @swagger
  * /api/Category/GetById/{id}:
  *   get:
  *     summary: Get category by Id
  *     tags: [Category]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: Category Id
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Returns Category object.
  */
categoryRouter.get('/GetById/:id', adminAuthMiddleware, getCategoryById);

/**
  * @swagger
  * /api/Category/Delete:
  *   post:
  *     summary: Delete category
  *     tags: [Category]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteCategory'
  *     responses:
  *       200:
  *         description: Category deleted successfully.
  */
categoryRouter.post('/Delete', adminAuthMiddleware, deleteCategory);


module.exports = categoryRouter;