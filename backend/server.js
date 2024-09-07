const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require('./controllers/db');  // Import the database connection file

// Routes
const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/managerDashboard');
const studentRoutes = require('./routes/studentDashboard');
const tutorRoutes = require('./routes/tutorDashboard');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/manager-dashboard', managerRoutes);
app.use('/student-dashboard', studentRoutes);
app.use('/tutor-dashboard', tutorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes); // Use the payment routes

// Proxy PayHere requests
app.use(
  '/payhere',
  createProxyMiddleware({
    target: 'https://sandbox.payhere.lk',
    changeOrigin: true,
    pathRewrite: {
      '^/payhere': '', // Remove '/payhere' prefix when forwarding request
    },
  })
);

// Connect to the database
connectDB();

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
