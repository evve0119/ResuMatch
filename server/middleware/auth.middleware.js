const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch {
      res.status(403).json({ error: 'Invalid token' });
    }
  };

module.exports = {
    authenticate,
};
