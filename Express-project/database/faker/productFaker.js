const faker = require('faker');
const Product = require('../../models/Product'); // Adjust the path if necessary


const addRandomProduct = async () => {
  

  const newProduct = new Product({
    name: faker.name.findName(),
    description: faker.lorem.toString(),
    price: 1000,
    quantity: 60,
  });

  try {
    const savedProduct = await newProduct.save();
    console.log('User added:', savedProduct);
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    // mongoose.disconnect();
  }
};

module.exports =  addRandomProduct;
