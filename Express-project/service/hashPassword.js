const bcrypt = require('bcryptjs');

const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Re-throw the error for appropriate handling
  }
};

module.exports = hashPassword;
