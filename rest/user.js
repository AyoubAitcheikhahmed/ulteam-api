const router = require("express").Router();
const User = require("../models/User");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");
  const user_controller = require("../controllers/user_controller");

//verwerken van user
router.put("/:id", validateTokenAuthorisation,user_controller.updateUser);


//user verwijderen
router.delete("/:id", validateTokenAuthorisation,user_controller.deleteUser );

//user halen
router.get("/find/:id",validateTokenAdmin ,user_controller.getSingleUser);

//alle users halen
router.get("/" ,validateTokenAdmin ,user_controller.getAllUsers);



//TODO
router.get("/stats", validateTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;