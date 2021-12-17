const express = require("express");
const app = express();
const db_connection = require("./config/mongo_db")
const userRoute = require("./rest/user");
const authentificationRoute = require("./rest/authentification");
const productRoute = require("./rest/product");
const cartRoute = require("./rest/cart");
const orderRoute = require("./rest/order");
const cors = require("cors");
const path = require("path");



// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
// const db = mongoose.connection;
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to db established"));
db_connection();
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.json());
//This is a built-in middleware function in Express.
//It parses incoming requests with JSON payloads and is based on body-parser.
//This will allow our servers to allow incoming .json file format.

app.use("/api/users",userRoute);
app.use("/api/authentification",authentificationRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);

try{
 app.listen(process.env.PORT || 6000, () => {
    console.log('*** ✅ BACKEND RUNNING SUCCESSFULLY ...');

});   
}catch(err)
{
    console.log("Something went wrong Runing the server !")
    return res.status(500).json("Somthing Went wrong initialising the Server !")
}