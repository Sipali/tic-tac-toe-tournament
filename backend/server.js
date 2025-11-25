// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();

// const app = express();

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// THIS CODE = 100% RENDER READY
// backend/server.js → FINAL 100% WORKING VERSION
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// BASIC MIDDLEWARE
app.use(cors({ origin: true, credentials: true }));
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// YOUR API ROUTES — MUST BE BEFORE app.get('*')
app.use('/api/auth', require('./routes/auth'));

// SERVE FRONTEND BUILD
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// CATCH-ALL ROUTE FOR REACT — MUST BE LAST!
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
