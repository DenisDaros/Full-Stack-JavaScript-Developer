const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controller');

router.post('/login', loginController.getOne);
router.post('/register', loginController.create);

module.exports = router;