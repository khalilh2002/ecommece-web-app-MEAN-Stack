require('dotenv').config(); // Load env variables at the start
const userRandom = require('./userFaker');
const productRandom = require('./productFaker');
const categoryRandom = require('./categoryFaker');
const connectDB = require('../db');

connectDB('mongodb://localhost:27017/khalil-test');

for (let index = 0; index < 30; index++) {
    //categoryRandom();
    //userRandom();
    productRandom();
}
