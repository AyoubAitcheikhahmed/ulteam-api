const User = require("../models/User");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("../middleware/validateToken");


const createUser = async (req,res) =>{
  const user = new User(req.body)
  try{
      
      const newUser = await user.save();
      res.status(200).json(newUser)
  }catch(err){
    console.log(err);
      res.status(500).json(err)
  }
}
//uncommited change 
const updateUser = async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const deleteUser = async (req, res) => {

    try{
        const deletedUser = User.findById(req.params.id).username;
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    }catch(err){
        res.status(500).json(err)
    }
}

const getSingleUser = async (req, res) => {

    try{
        
        const getUser = await User.findById(req.params.id);
        const {password, ...info } = getUser._doc;
        res.status(200).json(info)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers
}