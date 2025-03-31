const { generateResumePDF } = require('./resume_builder/generateResumePDF');

async function generateResumeService(resumeData) {
  const pdfBuffer = await generateResumePDF(resumeData);
  return pdfBuffer; // directly return Buffer, no wrapping
}

module.exports = { generateResumeService };
