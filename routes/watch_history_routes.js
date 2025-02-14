const express = require('express');
const router = express.Router();
const watchHistoryService = require('../services/watch_history_service');
const auth = require('../middleware/auth');
// @route   GET /api/watch-history
// @desc    Get user's complete watch history
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const watchHistory = await watchHistoryService.getWatchHistory(userId);
        res.json(watchHistory);
    } catch (error) {
        console.error("Error getting watch history:", error);
        res.status(500).send("Server Error");
    }
});
module.exports = router;