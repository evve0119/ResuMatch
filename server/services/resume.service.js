// server/services/resume.service.js
const path = require('path');
const fs = require('fs');
const { generateResumePDF } = require('./resume_builder/generateResumePDF');

async function generateResumeService(resumeData) {
  // 1. Call your pipeline to create the PDF
  const { pdfPath } = await generateResumePDF(resumeData);

  // 2. Optionally read that file into a buffer to return
  // const pdfBuffer = fs.readFileSync(pdfPath);

  // Return whichever you prefer:
  // - The pdfPath (so the controller can handle the file download)
  // OR
  // - The raw pdfBuffer
  return { pdfPath };
}

module.exports = {
  generateResumeService,
};
