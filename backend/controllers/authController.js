const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashedPassword });
  const token = generateToken(user._id);

  res.cookie('token', token, { httpOnly: true });
  res.json({
    _id: user._id,
    username: user.username,
    wins: user.wins,
    tournamentWins: user.tournamentWins,
    token
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.cookie('token', token, { httpOnly: true });
  res.json({
    _id: user._id,
    username: user.username,
    wins: user.wins,
    tournamentWins: user.tournamentWins
  });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

const updateWins = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wins += req.body.levelsWon || 0;
  if (req.body.tournamentWon) user.tournamentWins += 1;
  await user.save();
  res.json(user);
};

const getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ tournamentWins: -1, wins: -1 }).select('-password');
  res.json(users);
};

module.exports = { register, login, getMe, updateWins, getLeaderboard };