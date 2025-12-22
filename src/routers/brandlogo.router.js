const express = require('express');
const brandLogoRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { saveBrandLogo, updateBrandLogo, deleteBrandLogo, getBrandLogoById, getAllBrandLogos } = require('../controllers/brandlogo.controller');


/**
 * @swagger
 * tags:
 *  name : BrandLogo
 * description : API for managing Brand Logos 
 */



/**
 * @swagger
 * /api/Brandlogo/Save:
 *   post:
 *     summary: Save new Brand Logo
 *     tags: [BrandLogo]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - imagePath
 *             properties:
 *               name:
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
brandLogoRouter.post('/Save', adminAuthMiddleware, saveBrandLogo);

/**
 * @swagger
 * /api/Brandlogo/Update:
 *   post:
 *     summary: Update Brand Logo
 *     tags: [BrandLogo]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - imagePath
 *             properties:
 *               id:
 *                 type: string
 *               name:
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

brandLogoRouter.post('/Update', adminAuthMiddleware, updateBrandLogo);
/**
  * @swagger
  * /api/BrandLogo/GetAll:
  *   post:
  *     summary: Get All Brand Logos
  *     tags: [BrandLogo]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllBrandLogos'
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
brandLogoRouter.post('/GetAll', adminAuthMiddleware, getAllBrandLogos);

/**
  * @swagger
  * /api/BrandLogo/GetById/{id}:
  *   get:
  *     summary: Get brand logo by Id
  *     tags: [BrandLogo]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: Brand Logo Id
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Returns Brand Logo object.
  */
brandLogoRouter.get('/GetById/:id', adminAuthMiddleware, getBrandLogoById);

/**
  * @swagger
  * /api/BrandLogo/Delete:
  *   post:
  *     summary: Delete brand logo
  *     tags: [BrandLogo]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteBrandLogo'
  *     responses:
  *       200:
  *         description: Brand Logo deleted successfully.
  */
brandLogoRouter.post('/Delete', adminAuthMiddleware, deleteBrandLogo);


module.exports = brandLogoRouter;