const jwt = require('jsonwebtoken');
const config = require('config');
const { UnauthorizedError } = require('../utils/errors');
const User = require('../models/user');
const mongoose = require('mongoose');

async function auth(req, res, next) {
  try {
    let token = req.header('x-auth-token') || getBearerToken(req.header('Authorization'));

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    if (!mongoose.Types.ObjectId.isValid(decoded.user.id)) {
      console.log("Invalid user ID format in token.");
      return res.status(400).json({ msg: 'Invalid user ID format' });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      console.log("User not found in database.");
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.isSubscribed) {
      console.log("Access denied: Subscription required.");
      return res.status(403).json({ msg: 'Subscription required' });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

function getBearerToken(authHeader) {
  return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
}

module.exports = auth;
