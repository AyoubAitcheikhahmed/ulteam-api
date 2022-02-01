const mongoose = require("mongoose");
const dotenv = require("dotenv");
var gracefulShutdown;
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

const db_disconnect= () => {
    return mongoose.disconnect();
  }

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('...');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});





module.exports = {
    db_connection,
    db_disconnect
}
