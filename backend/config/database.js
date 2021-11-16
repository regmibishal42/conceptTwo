const mongoose = require('mongoose');


const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((data)=>console.log(`Mongodb connected with server: ${data.connection.host}`));
    // .catch((ex)=>console.log("Mongodb connecteion Problem12",ex));

}

module.exports = connectDatabase;