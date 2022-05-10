const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const morgan = require('morgan');
const authRoute = require('./routes/authRoute');

const app = express();
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));


//Routes
app.use('/api/user', authRoute);

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server is runnig on port ${port}`)
})