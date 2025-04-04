require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');
const accountRoutes = require('./routes/account.routes');


app.use(express.json({ limit: '10mb' })); // 或者 '20mb' 視情況調整
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'https://purple-moss-034ab441e.6.azurestaticapps.net'],
  exposedHeaders: ['X-Resume-Title'], // ✅ This line is critical
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
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
