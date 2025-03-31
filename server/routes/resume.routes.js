// server/routes/resume.routes.js
const express = require('express');
const { handleGenerateResume } = require('../controllers/resume.controller');

const router = express.Router();

// POST -> /resume/generate
router.post('/generate', handleGenerateResume);

module.exports = router;
