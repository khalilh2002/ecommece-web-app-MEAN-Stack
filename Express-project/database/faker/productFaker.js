const faker = require('faker');
const Product = require('../../models/Product'); // Adjust the path if necessary
const Category = require('../../models/Category'); // Adjust the path if necessary

const addRandomProduct = async () => {
  try {
    // Fetch a random category from the database
    const categories = await Category.aggregate([{ $sample: { size: 1 } }]);
    const category = categories[0];

    // Create a new product with the fetched category
    const newProduct = new Product({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      image: 'image/default/image.png', // Use the default value as specified in your schema
      price: parseFloat(faker.commerce.price()),
      quantity: faker.random.number({ min: 1, max: 100 }),
      category: category._id, // Use the fetched category's ObjectId
    });

    const savedProduct = await newProduct.save();
    console.log('Product added:', savedProduct);
  } catch (err) {
    console.error('Error adding product:', err);
  } finally {
    // mongoose.disconnect(); // Uncomment if you need to disconnect from MongoDB after operation
  }
};

module.exports = addRandomProduct;
