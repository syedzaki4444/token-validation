const express = require('express');
const userRouter = express.Router();
require('dotenv').config();

// Example list of users
const users = process.env.USERS.split(',');

/**
 * @swagger
 * components:
 *   schemas:
 *     USER:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username to check
 *       required:
 *         - username
 */

/**
 * @swagger
 * /validate-user:
 *   post:
 *     summary: Check if the user exists
 *     description: Checks if the username exists in the system
 *     tags:
 *       - USER
 *     requestBody:
 *       description: The username to check
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/USER'
 *     responses:
 *       200:
 *         description: Returns whether the user exists or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: integer
 *                   description: 1 if user exists, 0 if not
 *               example:
 *                 result: 1
 */

userRouter.post('/validate-user', (req, res) => {
    const username = req.body.username;

    // Check if username exists in the list of users
    if (users.includes(username)) {
        res.json({ result: 1 }); // User exists
    } else {
        res.json({ result: 0 }); // User does not exist
    }
});

module.exports = userRouter;

