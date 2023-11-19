const router = require('express').Router();
const validator = require('../middlewares/validator');
const { getCurrentUser, updateProfile } = require('../controllers/users');

router.get('/me', validator.getCurrentUserValid, getCurrentUser);
router.patch('/me', validator.updateUserValid, updateProfile);

module.exports = router;
