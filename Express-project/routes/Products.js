const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const upload = require('../Config/multer-config');
const path = require('path');
const fs = require('fs');



router.get('/', async (req,res)=>{
    if (req.query.search) {
        product = await Product.find({ "name": { $regex: req.query.search, $options: 'i' } });
    }else{
        product = await Product.find();
    }
    res.json(product);
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    product = await Product.findById(id);
    res.json(product);
})

router.put('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        const fileName = req.file ? req.file.filename : '';
        //const image = req.file ? req.file.path : '';

        //remove public path and left only image/products/*
        const image = req.file ? path.join('image/products', req.file.filename) : '';


        // Validate input
        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'Name, price, and quantity are required' });
        }

        // Create new Product instance
        const product = new Product({
            name,
            description: description || '',
            image,
            price,
            quantity
        });

        // Save the product to the database
        await product.save();

        // Respond with the saved product
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/edit/:id', upload.single('image') ,async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product fields based on request body
        if (req.body.name) {
            product.name = req.body.name;
        }
        
        if (req.body.description) {
            product.description = req.body.description;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }
        if (req.body.quantity) {
            product.quantity = req.body.quantity;
        }

        if (req.file) {
            if (product.image && product.image !== '' ) {
                const imagePath = path.join(__dirname, '..', 'public', product.image);
                console.error(imagePath);
                if(fs.existsSync(imagePath)){
                    fs.unlinkSync(imagePath)
                }
            }
            product.image = path.join("image/products",req.file.filename)
        }
        // Save the updated product
        await product.save();

        res.json({
            message: 'Product updated successfully',
            product: product
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
        const product = await Product.findById(id);

        // If user is not found, return 404 error
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        if (product.image && product.image !== '') {
            const imagePathToDelete = path.join(__dirname, '..', 'public', product.image);
            console.error(imagePathToDelete);
            if (fs.existsSync(imagePathToDelete)) {
                fs.unlinkSync(imagePathToDelete);
                console.log(`Deleted previous image: ${imagePathToDelete}`);
            }
        }

        // Remove the user
        await product.deleteOne();

        // Respond with success message
        res.json({ message: 'product deleted successfully' });
    } catch (error) {
        // Handle any errors and respond with an error message
        res.status(500).json({ message: error.message });
    }
});


module.exports = router