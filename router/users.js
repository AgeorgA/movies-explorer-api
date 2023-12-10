const router = require('express').Router();
const validator = require('../middlewares/validator');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validator.updateUserValid, updateUser);

module.exports = router;
