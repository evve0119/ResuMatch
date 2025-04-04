// controllers/resume.controller.js
require('dotenv').config();

const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'resumes';


async function saveResume(req, res) {
  try {
    const userId = req.user.userId;
    const { buffer, resumeTitle } = req.body;

    if (!buffer) return res.status(400).json({ error: 'Missing PDF buffer' });

    const safeTitle = resumeTitle
      ? resumeTitle.replace(/[^\w\s_-]/g, '').replace(/\s+/g, '_')
      : uuidv4();

    const blobName = `${userId}/${safeTitle}.pdf`;

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const bufferData = Buffer.from(buffer, 'base64'); // decode base64 string

    await blockBlobClient.uploadData(bufferData, {
      blobHTTPHeaders: { blobContentType: 'application/pdf' },
    });

    res.status(200).json({
      message: 'Resume saved successfully',
      blobName,
      filename: `${safeTitle}.pdf`,
    });
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
}

module.exports = { saveResume };
