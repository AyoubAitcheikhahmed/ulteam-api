const Product = require("../models/Product");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");

const createProduct = async (req,res) =>{
    const product = new Product(req.body)
    try{
        const savedPrd = await product.save();
        res.status(200).json(savedPrd)
    }catch(err){
        res.status(500).json(err)
    }
}

const updateProduct = async (req, res) => {

    try {
      const updatedPrd = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPrd);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const deleteProduct = async (req, res) => {

    try{
        
        const deletedPrd = Product.findById(req.params.id).title;
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPrd);
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleProduct = async (req, res) => {

    try{
        
        const getProduct = await Product.findById(req.params.id);
        res.status(200).json(getProduct)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllProducts = async (req, res) => {
    
    
    
    const query = req.query.new;
    const queryCategory = req.query.cat;   

    try{

        let getAllProducts;

        if(req.query.new){
             getAllProducts = await Product.find().sort({ _id: -1});
        }else if (req.query.cat){
             getAllProducts = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            });
        }else {
            
             getAllProducts = await Product.find()
             
        }

        res.status(200).json(getAllProducts)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    getAllProducts
}