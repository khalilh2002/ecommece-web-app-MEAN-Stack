const faker = require('faker');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); // Adjust the path if necessary


const addRandomUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456789', salt);
  const roles = ['user', 'admin'];
  const sex = ['F' , 'M']
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  const randomSex = sex[Math.floor(Math.random() * sex.length)];

  const newUser = new User({
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 13, max: 60 }),
    role: randomRole,
    sex:randomSex,
    verified: faker.datatype.boolean().toString(),
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    console.log('User added:', savedUser);
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    // mongoose.disconnect();
  }
};

module.exports =  addRandomUser;
