// In models/user.js

const User = require('mongoose').model('User');

async function getUsersWithPagination(pageNumber, pageSize) {
  const skip = (pageNumber - 1) * pageSize;
  const users = await User.find().skip(skip).limit(pageSize);
  return users;
}

module.exports = {
  getUsersWithPagination,
  // ... other User model methods
};
