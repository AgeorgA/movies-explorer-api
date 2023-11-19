const router = require('express').Router();
const validator = require('../middlewares/validator');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/me', validator.getCurrentUserValid, getCurrentUser);
router.patch('/me', validator.updateUserValid, updateUser);

module.exports = router;
