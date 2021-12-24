const express = require("express");
const app = express();
const mongo_db = require("./config/mongo_db");
const userRoute = require("./rest/user");
const authentificationRoute = require("./rest/authentification");
const productRoute = require("./rest/product");
const cartRoute = require("./rest/cart");
const orderRoute = require("./rest/order");
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
// const db = mongoose.connection;
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to db established"));
mongo_db.db_connection();
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.json());
//This is a built-in middleware function in Express.
//It parses incoming requests with JSON payloads and is based on body-parser.
//This will allow our servers to allow incoming .json file format.





    try{
     app.listen(process.env.PORT || 6000, () => {
        console.log('*** ✅ BACKEND RUNNING SUCCESSFULLY ...');
    
    });   
    }catch(err)
    {
        console.log("Something went wrong Runing the server !")
        return res.status(500).json("Somthing Went wrong initialising the Server !")
    }


app.use("/api/users",userRoute);
app.use("/api/authentification",authentificationRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);

// app.post("/api/products", (req,res)=>{
//     console.log("inside post ")
// })

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"Ulteam API",
            version:"1.0.0",
            description:"Gaming distribution platform API",
        },
        servers:[
            {
                url:"http://ulteam-frontend.herokuapp.com/"
            }
        ]
    },
    apis:["./rest/*.js"]
};

const specs = swaggerJsDoc(options);
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))

module.exports = app