const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./rest/user");
const authentificationRoute = require("./rest/authentification");
const productRoute = require("./rest/product");
const cartRoute = require("./rest/cart");
const orderRoute = require("./rest/order");
const cors = require("cors")
dotenv.config();


// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
// const db = mongoose.connection;
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to db established"));

mongoose
    .connect(process.env.MONGO_LINK)
    .then(()=>console.log("DB SUCCESSULL"))
    .catch((err) => {
        console.log(err);
    });


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

app.listen(process.env.PORT || 6000, () => {
    console.log('backend server running');

});