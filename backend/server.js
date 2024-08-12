const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const managerRoutes = require('./routes/manager');


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/manager-dashboard', managerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes); // Use the payment routes

// Proxy PayHere requests
app.use('/payhere', createProxyMiddleware({
  target: 'https://sandbox.payhere.lk',
  changeOrigin: true,
  pathRewrite: {
    '^/payhere': '', // Remove '/payhere' prefix when forwarding request
  },
  onProxyRes: (proxyRes, req, res) => {
    // Add any custom headers or logging here if needed
  },
}));

// MongoDB Connection
const dbUrl = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
