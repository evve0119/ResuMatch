require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Health check
app.get('/api', (req, res) => res.json({ message: 'Hello from the server!' }));

// Auth routes
app.use('/', authRoutes);

// Resume routes
app.use('/resume', resumeRoutes);

// Start server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
