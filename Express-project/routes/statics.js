const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/userByFemaleAndMale', async(req, res) => {
    const totalFemale = await User.find({sex:'F'}).count()
    const totalMale = await  User.find({sex:'M'}).count()
    const totalUsers = await User.find({}).count()
    return res.json({
        totalFemale,
        totalMale,
        totalUsers
    })
})
module.exports = router