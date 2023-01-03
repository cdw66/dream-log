const express = require('express')
const router = express.Router()
const { getDreams, setDream, updateDream, deleteDream } = require('../controllers/dreamController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getDreams).post(protect, setDream)
router.route('/:id').put(protect, updateDream).delete(protect, deleteDream)

module.exports = router