require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');
const accountRoutes = require('./routes/account.routes');
const PORT = process.env.PORT || 8080;


app.use(express.json({ limit: '10mb' })); // 或者 '20mb' 視情況調整
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: '*', // or specify array of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Resume-Title'],
}));

// Health check
app.get('/api', (req, res) => res.json({ message: 'Hello from the server!' }));

// Auth routes
app.use('/', authRoutes);

// Resume routes
app.use('/resume', resumeRoutes);

// Account routes
app.use('/account', accountRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
