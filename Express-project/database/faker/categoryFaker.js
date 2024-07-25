const faker = require('faker');
const Category = require('../../models/Category'); // Adjust the path if necessary

const addRandomCategory = async () => {
  const newCategory = new Category({
    name: faker.commerce.department(),
  });

  try {
    const savedCategory = await newCategory.save();
    console.log('Category added:', savedCategory);
  } catch (err) {
    console.error('Error adding category:', err);
  } finally {
    // mongoose.disconnect(); // Uncomment if you need to disconnect from MongoDB after operation
  }
};

module.exports = addRandomCategory;
