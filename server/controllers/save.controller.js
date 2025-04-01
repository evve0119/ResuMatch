// controllers/resume.controller.js
const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'resumes';

async function saveResume(req, res) {
  try {
    const userId = req.user.userId;
    const { buffer } = req.body;

    if (!buffer) return res.status(400).json({ error: 'Missing PDF buffer' });

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `${userId}/${uuidv4()}.pdf`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const bufferData = Buffer.from(buffer, 'base64');

    await blockBlobClient.uploadData(bufferData, {
      blobHTTPHeaders: { blobContentType: 'application/pdf' },
    });

    res.status(200).json({ message: 'Resume saved to Azure Blob Storage', blobName });
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
}

module.exports = { saveResume };
