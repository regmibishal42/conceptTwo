const express = require('express');
const app = express();

const  cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// Importing The Routes 
const products = require('./routers/productRoute');
const user = require('./routers/userRoute');
const order = require('./routers/orderRoutes');

app.use('/api/v1',products);
app.use('/api/v1',user);
app.use('/api/v1',order);

// Middleware For Errors in The REq,REs Pipeline
app.use(errorMiddleware);

module.exports = app;

