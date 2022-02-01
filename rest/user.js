const router = require("express").Router();
const User = require("../models/User");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");
  const user_controller = require("../service/user_controller");


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
 * /users/{id}:
 *   put:
 *     summary: Updates a user with a given id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: the user id
 *     tags: [Users] 
 *     description: Update a user with a given id
 *     responses:  
 *       200: 
 *         description: Success updating data  
 *       500: 
 *         description: Failed updating data 
 */

router.put("/:id", validateTokenAuthorisation,user_controller.updateUser);


/** 
 * @swagger 
 * /users/{id}:
 *   put:
 *     summary: Updates a user instance
 *     tags: [Users]
 *      
 *     description: Updates a user with given data
 *     responses:  
 *       200: 
 *         description: Success Updating user instance  
 *       500: 
 *         description: Failed Updating user instance
 */
router.delete("/:id", validateTokenAuthorisation,user_controller.deleteUser );

/** 
 * @swagger 
 * /users/find/{id}:
 *   get:
 *     summary: Returns a user with a given id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: the user id
 *     tags: [Users] 
 *     description: Get a user with a given id
 *     responses:  
 *       200: 
 *         description: Success fetching data  
 *       500: 
 *         description: Failed fetching data 
 */
router.get("/find/:id",validateTokenAdmin ,user_controller.getSingleUser);

router.post("/register",user_controller.createUser);

/** 
 * @swagger 
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users] 
 *     description: Get all users
 *     responses:  
 *       200: 
 *         description: Success fetching data  
 *       500: 
 *         description: Failed fetching data 
 */
router.get("/" ,validateTokenAdmin ,user_controller.getAllUsers);



// //TODO
// router.get("/stats", validateTokenAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
//     try {
//       const data = await User.aggregate([
//         { $match: { createdAt: { $gte: lastYear } } },
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: 1 },
//           },
//         },
//       ]);
//       res.status(200).json(data)
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


module.exports = router;