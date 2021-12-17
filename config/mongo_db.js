const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db_connection = async ()=>{

    await mongoose
       .connect(process.env.MONGO_LINK)
       .then(()=>console.log("*** ✅ CONNECTION TO DATABASE ESTABLISHED"))
       .catch((err) => {
           console.log(err);
           return res.status(500).json("Somthing Went wrong initialising the Database!");
           
       });
}




module.exports = db_connection;