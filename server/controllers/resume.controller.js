// server/controllers/resume.controller.js
const { generateResumeService } = require('../services/resume.service');
const { generateResumePDF } = require('../services/resume_builder/generateResumePDF');

const fs = require('fs');

const { SASProtocol } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_ACCOUNT_NAME = process.env.AZURE_ACCOUNT_NAME;
const AZURE_ACCOUNT_KEY = process.env.AZURE_ACCOUNT_KEY;
const containerName = 'resumes';


async function handleGenerateResume(req, res) {
  try {
    const resumeData = req.body;
    const pdfBuffer = await generateResumeService(resumeData);

    // Check explicitly Buffer instance
    if (!Buffer.isBuffer(pdfBuffer)) {
      console.error('❌ pdfBuffer is not a valid Buffer:', pdfBuffer);
      return res.status(500).send('PDF generation failed');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Resume.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('❌ Error generating resume:', error);
    res.status(500).json({ error: 'Failed to generate PDF resume' });
  }
}

// List all saved resumes
async function listResumes(req, res) {
  try {
    const userId = req.user.userId;

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const userPrefix = `${userId}/`;
    const blobs = [];

    const sharedKeyCredential = new StorageSharedKeyCredential(
      AZURE_ACCOUNT_NAME,
      AZURE_ACCOUNT_KEY
    );

    for await (const blob of containerClient.listBlobsFlat({ prefix: userPrefix })) {
      const blobClient = containerClient.getBlobClient(blob.name);

      // 建立 SAS Token (有效時間 1 小時)
      const sasToken = generateBlobSASQueryParameters(
        {
          containerName,
          blobName: blob.name,
          expiresOn: new Date(new Date().valueOf() + 3600 * 1000),
          permissions: BlobSASPermissions.parse("r"),
          protocol: SASProtocol.Https,
        },
        sharedKeyCredential
      ).toString();

      const previewUrl = `${blobClient.url}?${sasToken}`;

      blobs.push({
        name: blob.name,
        previewUrl,
        lastModified: blob.properties.lastModified,
      });
    }

    res.json(blobs);
  } catch (err) {
    console.error('❌ Failed to list blobs:', err);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
}

// Delete a resume by blob name
async function deleteResume(req, res) {
  try {
    const { blobName } = req.params;
    const userId = req.user.userId;

    if (!blobName.startsWith(`${userId}/`)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    await blobClient.delete();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete resume:', err);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
}

module.exports = { handleGenerateResume, listResumes, deleteResume };
