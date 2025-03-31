// server/routes/account.routes.js
const express = require('express');
const router = express.Router();
const { createAccount, updateAccount, getAccount } = require('../controllers/account.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', authenticate, getAccount);
router.post('/', authenticate, createAccount);
router.put('/', authenticate, updateAccount);

module.exports = router;
