const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateUserCreate, validateUserAuth } = require('../utils/validate');
const auth = require('../middlewares/auth');

router.post('/signin', validateUserAuth, login);

router.post('/signup', validateUserCreate, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
