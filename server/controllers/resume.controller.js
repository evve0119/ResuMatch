// server/controllers/resume.controller.js
const { generateResumeService } = require('../services/resume.service');
const fs = require('fs');

async function handleGenerateResume(req, res) {
  try {
    const resumeData = req.body; // JSON data from client
    const { pdfPath } = await generateResumeService(resumeData);

    // Now return the PDF to the client
    // Option 1: Let Express handle the file download
    res.download(pdfPath, 'Resume.pdf', (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        res.status(500).send('Failed to download PDF');
      }
    });

    // OR Option 2: read the file and send as a buffer
    /*
    const pdfBuffer = fs.readFileSync(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Resume.pdf"');
    res.send(pdfBuffer);
    */
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'Failed to generate PDF resume' });
  }
}

module.exports = { handleGenerateResume };
