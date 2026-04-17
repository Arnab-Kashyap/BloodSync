const express = require('express');
const router = express.Router();
const { toggleAvailability, updateProfile } = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

router.put('/availability', protect, toggleAvailability);
router.put('/profile', protect, updateProfile);

module.exports = router;