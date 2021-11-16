const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handeling Uncaught Exception
process.on('uncaughtException',(err)=>{
    console.log(`Error ; ${err.message}`);
    console.log('Shutting down server due to uncaught Exception')
});


// Config
dotenv.config({path:'backend/config/config.env'});

// connect to mongodb after acquireing config 
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejection Waring
process.on("unhandledRejection",(err)=>{
    console.log(`error has occured:${err.message}`);
    console.log('Shutting Down The Server Due to Unhanlded Promise Rejection');

    server.close(()=>{
        process.exit(1);
    })
});