const router = require('express').Router();
const { getCurrentUser, updateUserDate } = require('../controllers/users');
const { validateUserData } = require('../utils/validate');

router.get('/me', getCurrentUser);

router.patch('/me', validateUserData, updateUserDate);

module.exports = router;
