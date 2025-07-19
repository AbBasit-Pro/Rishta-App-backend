const express = require('express');
const router = express.Router();
const { handleMatch } = require('../controllers/matchController');

router.post('/match', handleMatch);

module.exports = router;
