const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/game/save
router.post('/save', auth, async (req, res) => {
  try {
    const { levelsWon, tournamentWon } = req.body;
    const user = await User.findById(req.user.id);

    user.wins += levelsWon;
    if (tournamentWon) user.tournamentWins += 1;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/game/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaders = await User.find()
      .sort({ tournamentWins: -1, wins: -1 })
      .select('username wins tournamentWins')
      .limit(10);
    res.json(leaders);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;