const express = require('express');

const authController = require('../controllers/auth');
const checkUser = require('../middleware/check-user');

const router = express.Router();

// router.post('/login', authController.postLogin);
router.get('/signup', checkUser, authController.createUser);

module.exports = router;
