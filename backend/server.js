


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // CORS — NOW FULL WILD FOR TESTING
// app.use(cors({
//   origin: "*",  // ← THIS FIXES CORS BLOCK
//   credentials: true
// }));

// app.set('trust proxy', 1);
// app.use(express.json());
// app.use(cookieParser());

// // MONGODB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log('MongoDB Error:', err));

// // ROUTES
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/game', require('./routes/game'));

// // TEST ROUTE — CHECK IF BACKEND RESPONDS
// app.get('/api/test', (req, res) => {
//   res.json({ message: "BACKEND ALIVE! Ready for login/register!" });
// });

// // SERVE FRONTEND
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS — FULLY WORKING FOR RENDER + LOCAL
app.use(cors({
  origin: "*",                  // ← Sab allow (mobile + desktop)
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

// TEST ROUTE — YE ZAROORI HAI (backend alive check)
app.get('/api/test', (req, res) => {
  res.json({ message: "BACKEND ALIVE! Ready for login/register!" });
});

// SERVE FRONTEND (Vite build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// REACT ROUTER KE LIYE SAB ROUTES INDEX.HTML PE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});