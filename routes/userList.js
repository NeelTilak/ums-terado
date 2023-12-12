// In routes/userList.js

const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 10; // Set your desired page size

    const users = await userModel.getUsersWithPagination(pageNumber, pageSize);

    res.render('userList', { users }); // Pass the users variable to the view
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
