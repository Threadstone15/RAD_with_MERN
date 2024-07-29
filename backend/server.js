const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tuition-management', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
