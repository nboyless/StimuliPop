const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const popperRoutes = require('./routes/popper');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // <-- This allows React frontend (localhost:3000) to talk to backend (localhost:5000)
app.use(express.json());
app.use(session({
    secret: 'stimuliPopSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/stimulipop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', popperRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
