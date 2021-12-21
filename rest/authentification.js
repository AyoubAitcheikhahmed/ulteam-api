
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authentification_controller = require("../service/authentification_controller");



//aanmaken van een product 
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *          username:
 *            type: string
 *            description: username.
 *          email:
 *            type: string
 *            description: email of the user.
 *          password:
 *            type: string
 *            description: user password
 *          admin:
 *            type: boolean
 *            description: boolean value if the user is an admin.
 *      example:
 *        username: jhondee
 *        email: jhon.dee@ulteam.com
 *        password: deejhon458752password
 *        admin: false
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Route that manages the users API
 */

/** 
 * @swagger 
 * /authentification/register:
 *   post:
 *     summary: Creates a user
 *     tags: [Users]
 *      
 *     description: creates a user with given data
 *     responses:  
 *       200: 
 *         description: Success creating instance  
 *       500: 
 *         description: Failed creating instance
 */ 
router.post("/register",authentification_controller.register)

/** 
 * @swagger 
 * /authentification/signin:
 *   post:
 *     summary: Login process of a user
 *     tags: [Users]
 *      
 *     description: Login process of a user with given data
 *     responses:  
 *       200: 
 *         description: Success fetching instance of a user 
 *       500: 
 *         description: Failed fetching instance of a user
 */ 
router.post("/signin", authentification_controller.login)

module.exports = router;