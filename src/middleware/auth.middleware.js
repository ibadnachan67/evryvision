import { env } from '../config/env.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  const token = authHeader.slice(7);

  if (token !== env.jwtSecret) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  req.auth = { token };
  next();
};
