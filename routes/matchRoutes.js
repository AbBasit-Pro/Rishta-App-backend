const express = require('express');
const router = express.Router();
const { handleMatch, getAllMatches } = require('../controllers/matchController');

router.post('/match', handleMatch);
router.get('/match/all', getAllMatches);

module.exports = router;
