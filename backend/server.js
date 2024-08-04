const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// MongoDB Connection
const dbUrl = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Routes
app.post('/create', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, message: 'User created successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error });
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, message: 'Users fetched successfully', data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
