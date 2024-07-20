const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');


router.get('/', async (req,res)=>{
    users = await User.find();
    res.json(users);
})

router.put('/add', async (req, res) => {
    try {
        const { name, age, email ,sex} = req.body;
        // Validate input
        if (!name || !age || !email || !sex) {
            return res.status(400).json({ message: 'Name, age, sex and email are required' });
        }

        // Respond with the received data
        user = User({
            name: name,
            age: age,
            email: email,
            sex: sex,
            message: "Data has been received"
        })
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/edit/:id', async (req, res) => {
    try {
        // Assume req.user is correctly set by middleware
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'id not Valid' });
        }
        user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.age) {
            user.age = parseInt(req.body.age)
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        await user.save()
        res.json({
            message: "User updated successfully",
            user: user
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid user ID' });
        }

        // Find the user by ID
        const user = await User.findById(id);

        // If user is not found, return 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the user
        await user.deleteOne();

        // Respond with success message
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle any errors and respond with an error message
        res.status(500).json({ message: error.message });
    }
});

     


// router.params('id',(req,res,next,id)=>{
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ message: 'id not Valid' });
//     }  
// })



module.exports = router