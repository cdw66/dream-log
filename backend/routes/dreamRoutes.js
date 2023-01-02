const express = require('express')
const router = express.Router()
const { getDreams, setDream, updateDream, deleteDream } = require('../controllers/dreamController')

router.route('/').get(getDreams).post(setDream)
router.route('/:id').put(updateDream).delete(deleteDream)

module.exports = router