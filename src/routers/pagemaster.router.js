const express = require('express');
const pagemasterRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { savePageMaster, updatePageMaster, getAllPageMasters, getPageMasterById, deletePageMaster } = require('../controllers/pagemaster.controller');


/**
 * @swagger
 * tags:
 *  name : PageMaster
 * description : API for managing PageMaster
 */


/**
  * @swagger
  * /api/PageMaster/Save:
  *   post:
  *     summary: Save new PageMaster
  *     tags: [PageMaster]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/InsertPageMaster'
  *     responses:
  *       200:
  *         description: PageMaster saved successfully.
  */
pagemasterRouter.post('/Save', adminAuthMiddleware, savePageMaster);


/**
  * @swagger
  * /api/PageMaster/Update:
  *   post:
  *     summary: Update PageMaster
  *     tags: [PageMaster]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdatePageMaster'
  *     responses:
  *       200:
  *         description: PageMaster updated successfully.
  */
pagemasterRouter.post('/Update', adminAuthMiddleware, updatePageMaster);

/**
  * @swagger
  * /api/PageMaster/GetAll:
  *   post:
  *     summary: Get All PageMaster
  *     tags: [PageMaster]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllPageMasters'
  *     responses:
  *       200:
  *         description: Successfully fetched all PageMasters.
  */
pagemasterRouter.post('/GetAll', adminAuthMiddleware, getAllPageMasters);

/**
  * @swagger
  * /api/PageMaster/GetById:
  *   post:
  *     summary: Get PageMaster by Id
  *     tags: [PageMaster]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetPageMasterById'
  *     responses:
  *       200:
  *         description: PageMaster fetched successfully.
  */
pagemasterRouter.post('/GetById', adminAuthMiddleware, getPageMasterById);

/**
  * @swagger
  * /api/PageMaster/Delete:
  *   post:
  *     summary: Delete PageMaster
  *     tags: [PageMaster]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeletePageMaster'
  *     responses:
  *       200:
  *         description: PageMaster deleted successfully.
  */
pagemasterRouter.post('/Delete', adminAuthMiddleware, deletePageMaster);


module.exports = pagemasterRouter;