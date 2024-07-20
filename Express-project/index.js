console.log("backend start");

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");

const connectDB = require('./database/db');

const PORT = 8080;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(cors({
  origin: process.env.FRONT_END_URL, // Update to your Angular app's URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


connectDB()


app.get('/', (req, res) => {
    res.status(200).json({
        msg:"now you are connected to Mongodb"
    })
});

const usersRouter = require('./routes/users') ;
const productsRouter = require('./routes/Products') ;
const securityRouter = require('./routes/security');
const statics = require('./routes/statics');

app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/auth',securityRouter);
app.use('/statics',statics);



app.listen(PORT, () => console.log("server is listening on port " + PORT));
