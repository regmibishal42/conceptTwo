const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const  cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

// Importing The Routes 
const products = require('./routers/productRoute');
const user = require('./routers/userRoute');
app.use('/api/v1',products);
app.use('/api/v1',user);

// Middleware For Errors in The REq,REs Pipeline
app.use(errorMiddleware);

module.exports = app;