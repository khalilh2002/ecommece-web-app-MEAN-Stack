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

router.get('/categoriesByProductCount', async (req ,res)=>{
    const categoryAndProductsCount = await Product.aggregate([
        {
            $lookup:{
                from:'categories',
                localField:'category',
                foreignField:'_id',
                as : 'category',
            }
        },
        {
            $unwind: '$category' // Unwind the category array to simplify the grouping
          },
          {
            $group: {
              _id: '$category.name', // Group by the name of the category
              //products: { $push: '$$ROOT' }, // Push the entire document into the products array
              count: { $sum: 1 } // Optionally, add a count of the number of products in each group
            }
          }
            
        ])
        return res.json(categoryAndProductsCount)
})


module.exports = router