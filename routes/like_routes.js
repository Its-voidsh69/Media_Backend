const express = require('express');
const router = express.Router();
const likeService = require('../services/like_service');
const auth = require('../middleware/auth');
const { NotFoundError } = require('../utils/errors');
// @route   POST /api/likes/:contentId
// @desc    Like or unlike a content
// @access  Private
router.post('/:contentId', auth, async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const userId = req.userId;

        const result = await likeService.likeContent(contentId, userId);
        res.json(result);
    } catch (error) {
        console.error("Error liking/unliking content:", error);
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).send("Server Error");
    }
});
// @route   GET /api/likes/:contentId
// @desc    Get likes for content
// @access  Public
router.get('/:contentId', async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const likes = await likeService.getLikesForContent(contentId);
        res.json(likes);
    } catch (error) {
        console.error("Error getting likes:", error);
        res.status(500).send("Server Error");
    }
});
module.exports = router;