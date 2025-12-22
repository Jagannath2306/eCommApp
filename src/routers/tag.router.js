const express = require('express');
const tagRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { saveTag, updateTag, deleteTag, getTagById, getAllTags} = require('../controllers/tag.controller');


/**
 * @swagger
 * tags:
 *  name : Tag
 * description : API for managing Tags
 */



/**
 * @swagger
 * /api/Tag/Save:
 *   post:
 *     summary: Insert New Tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsertTag'
 *     responses:
 *       201:
 *         description: Tag Saved Successfully
 */
tagRouter.post('/Save', adminAuthMiddleware, saveTag);



/**
  * @swagger
  * /api/Tag/Update:
  *   post:
  *     summary: Update tag
  *     tags: [Tag]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateTag'
  *     responses:
  *       201:
  *         description: Tag updated successfully.
  */
tagRouter.post('/Update', adminAuthMiddleware, updateTag);
/**
  * @swagger
  * /api/Tag/GetAll:
  *   post:
  *     summary: Get All Tags
  *     tags: [Tag]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllTags'
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
tagRouter.post('/GetAll', adminAuthMiddleware, getAllTags);

/**
  * @swagger
  * /api/Tag/GetById/{id}:
  *   get:
  *     summary: Get tag by Id
  *     tags: [Tag]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: Tag Id
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Returns Tag object.
  */
tagRouter.get('/GetById/:id', adminAuthMiddleware, getTagById);
/**
  * @swagger
  * /api/Tag/Delete:
  *   post:
  *     summary: Delete tag
  *     tags: [Tag]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteTag'
  *     responses:
  *       200:
  *         description: Tag deleted successfully.
  */
tagRouter.post('/Delete', adminAuthMiddleware, deleteTag);


module.exports = tagRouter;