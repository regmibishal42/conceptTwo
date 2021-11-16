const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');



app.use(express.json());


// Route Imports
const products = require('./routers/productRoute');
const user = require('./routers/userRoute');
app.use('/api/v1',products);
app.use('/api/v1',user);

// middleware for Error
app.use(errorMiddleware);

module.exports = app;