const fs = require("fs");
const Product = require("./models/Product");
const colors = require("colors");
const db_connection = require("./config/mongo_db");



db_connection();

const products = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/products.json`,'utf-8'))


const create_data = async ()=>{
    try{
        await Product.create(products);
        console.log(`Data Successfully Imported`.bgYellow.inverse)
        process.exit();
    }   
    catch(err){
        console.log(err)
    }
}

const delete_data = async ()=>{
    try{
        await Product.deleteMany();
        console.log(`Data Successfully deleted`.green);
        process.exit();
    }   
    catch(err){
        console.log(err)
    }
}

switch(process.argv[2]) {
    case '-i':
        create_data().then();
      break;
    case '-d':
        delete_data().then();
      break;
    default:
      console.log("Please mention one of the following options: \n [-i] To import data \n [-d] To delete recordes from db.")
      process.exit();
  }


