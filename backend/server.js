
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: "*",
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
app.use('/api/game', require('./routes/game'));

app.get('/api/test', (req, res) => {
  res.json({ 
    message: "BACKEND ALIVE! Ready for login/register!",
    timestamp: new Date().toISOString(),
    status: "CHAMPION MODE ON"
  });
});


app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test route: https://tic-tac-toe-tournament.onrender.com/api/test`);
});