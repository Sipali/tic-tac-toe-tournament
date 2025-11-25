const express = require('express');
const router = express.Router();
const { register, login, getMe, updateWins, getLeaderboard } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/update-wins', protect, updateWins);
router.get('/leaderboard', getLeaderboard);

module.exports = router;