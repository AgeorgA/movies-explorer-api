const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/users');
const {
  getCurrentUserValid,
  updateUserValid,
} = require('../middlewares/validator');

router.get('/me', getCurrentUserValid, getCurrentUser);
router.patch('/me', updateUserValid, updateUser);

module.exports = router;
