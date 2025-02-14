const express = require('express');
const router = express.Router();
const userService = require('../services/user_service');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, password, isSubscribed, email } = req.body;
        const userId = await userService.registerUser(username, password, isSubscribed, email);
        res.status(201).json({ message: 'User registered successfully', userId: userId });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await userService.loginUser(username, password);
        res.json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(400).json({ message: error.message });
    }
});

// @route   POST /api/users/logout
// @desc    Logout user and invalidate token
// @access  Private
router.post('/logout', auth, (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        userService.logoutUser(token);
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
