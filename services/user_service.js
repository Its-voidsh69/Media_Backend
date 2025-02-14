const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { UnauthorizedError } = require('../utils/errors');

const tokenBlacklist = new Set();  

async function registerUser(username, password, isSubscribed, email) {
    try {
        const user = new User({ username, password, isSubscribed, email });
        await user.save();
        return user._id;
    } catch (error) {
        throw error;
    }
}

async function loginUser(username, password) {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '24h' }
        );

        return token;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

function verifyToken(token) {
    try {
        if (tokenBlacklist.has(token)) {
            throw new UnauthorizedError("Token has been revoked");
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        return decoded.user.id;
    } catch (error) {
        throw new UnauthorizedError("Invalid token");
    }
}

// Logout function
function logoutUser(token) {
    tokenBlacklist.add(token);
}

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    logoutUser
};
