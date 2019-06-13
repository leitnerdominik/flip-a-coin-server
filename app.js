const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const statsRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_TOKEN
}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(PORT))
  .catch(err => console.log(err));
