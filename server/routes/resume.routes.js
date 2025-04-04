// server/routes/resume.routes.js
const express = require('express');
const { saveResume } = require('../controllers/save.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { handleGenerateResume, listResumes, deleteResume } = require('../controllers/resume.controller');
// const tailorResume = require('../services/tailorResume/tailorResume');

const router = express.Router();

// POST -> /resume/generate
router.post('/generate', authenticate, handleGenerateResume);
router.post('/save', authenticate, saveResume);

// router.post('/tailor', tailorResume);

router.get('/history', authenticate, listResumes);
router.delete('/history/:blobName', authenticate, deleteResume);

module.exports = router;
