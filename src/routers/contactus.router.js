const express = require('express');
const contactusRouter = express.Router();
const { adminAuthMiddleware } = require('../middlewares/user.auth.middleware');
const { addContactUs, getAllContactUs, deleteContactUs, getContactUsById } = require('../controllers/contactus.controller');



/**
  * @swagger
  * tags:
  *   name: ContactUs
  *   description: API for managing contact us
  */




/**
  * @swagger
  * /api/ContactUs/AddContactUs:
  *   post:
  *     summary: Register a new Contact Us
  *     tags: [ContactUs]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/ContactUsRegister'
  *     responses:
  *       201:
  *         description: Contact Us registered successfully
  */
contactusRouter.post('/AddContactUs', addContactUs);

/**
  * @swagger
  * /api/ContactUs/GetAllContactUs:
  *   post:
  *     summary: Get All Contact Us 
  *     tags: [ContactUs]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetAllContactUs'
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
contactusRouter.post('/GetAllContactUs', adminAuthMiddleware, getAllContactUs);

/**
  * @swagger
  * /api/ContactUs/GetContactUsById:
  *   post:
  *     summary: Get All Contact Us 
  *     tags: [ContactUs]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/GetContactUsById'
  *     responses:
  *       200:
  *         description: User retrieved successfully 
  */
contactusRouter.post('/GetContactUsById', adminAuthMiddleware, getContactUsById);

/**
  * @swagger
  * /api/ContactUs/DeleteContactUsById:
  *   post:
  *     summary: Get All Contact Us 
  *     tags: [ContactUs]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/DeleteContactUs'
  *     responses:
  *       200:
  *         description: Contact Us deleted successfully 
  */
contactusRouter.post('/DeleteContactUsById', adminAuthMiddleware, deleteContactUs);

module.exports = contactusRouter;