const router = require("express").Router();
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");
const product_controller = require("../service/product_controller");


//aanmaken van een product 
router.post("/",validateTokenAdmin,product_controller.createProduct);

//verwerken van user
router.put("/:id", validateTokenAdmin, product_controller.updateProduct);

//product verwijderen
router.delete("/:id", validateTokenAdmin, product_controller.deleteProduct);

//product halen
router.get("/find/:id", product_controller.getSingleProduct);

//alle producten halen
router.get("/",product_controller.getAllProducts);


module.exports = router;