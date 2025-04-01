// server/routes/resume.routes.js
const express = require('express');
const { saveResume } = require('../controllers/save.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { handleGenerateResume, listResumes, deleteResume } = require('../controllers/resume.controller');

const router = express.Router();

// POST -> /resume/generate
router.post('/generate', handleGenerateResume);
router.post('/save', authenticate, saveResume);

router.get('/history', authenticate, listResumes);
router.delete('/history/:blobName', authenticate, deleteResume);

module.exports = router;
