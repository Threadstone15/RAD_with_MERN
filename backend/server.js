const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tuitionmanagement', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // List collections in the database
  db.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('Error listing collections:', err);
    } else {
      console.log('Collections:', collections);
    }
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// API endpoint to get collections
app.get('/api/collections', (req, res) => {
  db.db.listCollections().toArray((err, collections) => {
    if (err) {
      return res.status(500).json({ error: 'Error listing collections' });
    }
    res.json(collections);
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
