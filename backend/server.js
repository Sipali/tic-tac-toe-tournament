
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// YE CORS 100% SAFE & WORKING FOR RENDER
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tic-tac-toe-tournament.onrender.com"
  ],
  credentials: true
}));

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());

// MONGODB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/game', require('./routes/game'));   // ← ye line honi chahiye

// SERVE FRONTEND BUILD
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// REACT ROUTER KE LIYE CATCH-ALL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// PORT — RENDER KE LIYE ZAROORI
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});