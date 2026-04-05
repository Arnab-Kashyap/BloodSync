const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getRequest, updateRequest } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getRequests);
router.post('/', protect, createRequest);
router.get('/:id', getRequest);
router.put('/:id', protect, updateRequest);

module.exports = router;