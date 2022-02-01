const router = require("express").Router();
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");
const product_controller = require("../service/product_controller");


//aanmaken van een product 
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - desc
 *        - image
 *      properties:
 *          title:
 *            type: string
 *            description: the title of the game.
 *          userOwnership:
 *            type: boolean
 *            description: boolean value if the user owns the game.
 *          desc:
 *            type: string
 *            description: boolean value if the user owns the game.
 *          image:
 *            type: boolean
 *            description: boolean value if the user owns the game.
 *          categories:
 *            type: Array
 *            description: array of values containing values to what category the game belongs to.
 *          platform:
 *            type: Array
 *            description: array of values containing the platforms the game available on.
 *          price:
 *            type: number
 *            description: selling price of the game.
 *      example:
 *        title: Warzone
 *        userOwnership: false
 *        desc: battle royale first person shooter game
 *        image: https://imagelink.com
 *        categories: action
 *        platform: pc
 *        price: 30 
 */
/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Route that manages the games API
 */

/** 
 * @swagger 
 * /products:
 *   post:
 *     summary: Creates a product
 *     tags: [Products]
 *      
 *     description: creates a game with given data
 *     responses:  
 *       200: 
 *         description: Success creating instance  
 *       500: 
 *         description: Failed creating instance
 */ 
router.post("/",product_controller.createProduct);


/** 
 * @swagger 
 * /products/{id}:
 *   put:
 *     summary: Updates a game with a given id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: the game id
 *     tags: [Products] 
 *     description: updates a given instance of a game
 *     responses:  
 *       200: 
 *         description: Success updating data  
 *       500: 
 *         description: Failed updating data 
 */

router.put("/:id", validateTokenAdmin ,product_controller.updateProduct);

//uncommited yet  
/** 
 * @swagger 
 * /products/{id}:
 *   delete:
 *     summary: Deletes a game with a given id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: the game id
 *     tags: [Products] 
 *     description: Deletes a given instance of a game
 *     responses:  
 *       200: 
 *         description: Success deleting data  
 *       500: 
 *         description: Failed deleting data 
 */
router.delete("/:id", validateTokenAdmin, product_controller.deleteProduct);

/** 
 * @swagger 
 * /products/find/{id}:
 *   get:
 *     summary: Returns a game with a given id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: the game id
 *     tags: [Products] 
 *     description: Get a game with a given id
 *     responses:  
 *       200: 
 *         description: Success fetching data  
 *       500: 
 *         description: Failed fetching data 
 */
router.get("/find/:id", product_controller.getSingleProduct);




/** 
 * @swagger 
 * /products:
 *   get:
 *     summary: Returns a list of all games
 *     tags: [Products] 
 *     description: Get all games
 *     responses:  
 *       200: 
 *         description: Success fetching data  
 *       500: 
 *         description: Failed fetching data 
 */
router.get("/",product_controller.getAllProducts);


module.exports = router;