// controllers/account.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get account by userId
async function getAccount(req, res) {
  const userId = req.user.userId;
  try {
    const account = await prisma.account.findUnique({
      where: { userId }
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve account' });
  }
}

// Create new account
async function createAccount(req, res) {
  const userId = req.user.userId;

  const {
    personal_information,
    education_details,
    experience_details,
    technical_skills,
    projects
  } = req.body;

  try {
    const account = await prisma.account.create({
      data: {
        userId,
        name: personal_information.name,
        surname: personal_information.surname,
        phonePrefix: personal_information.phone_prefix,
        phone: personal_information.phone,
        email: personal_information.email,
        github: personal_information.github,
        linkedin: personal_information.linkedin,
        city: personal_information.city,
        state: personal_information.state,
        education: education_details,
        experience: experience_details,
        technicalSkills: technical_skills,
        projects: projects
      }
    });

    res.status(201).json({ message: 'Account created', account });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// Update existing account
async function updateAccount(req, res) {
  const userId = req.user.userId;

  const {
    personal_information,
    education_details,
    experience_details,
    technical_skills,
    projects
  } = req.body;

  try {
    const account = await prisma.account.update({
      where: { userId },
      data: {
        name: personal_information.name,
        surname: personal_information.surname,
        phonePrefix: personal_information.phone_prefix,
        phone: personal_information.phone,
        email: personal_information.email,
        github: personal_information.github,
        linkedin: personal_information.linkedin,
        city: personal_information.city,
        state: personal_information.state,
        education: education_details,
        experience: experience_details,
        technicalSkills: technical_skills,
        projects: projects
      }
    });

    res.json({ message: 'Account updated', account });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAccount,
  createAccount,
  updateAccount
};
