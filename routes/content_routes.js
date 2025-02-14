const express = require('express');
const router = express.Router();
const contentService = require('../services/content_service');
const auth = require('../middleware/auth');
const { NotFoundError } = require('../utils/errors');
const watchHistoryService = require('../services/watch_history_service');
// @route   GET /api/content
// @desc    Get all content
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const content = await contentService.getAllContent();
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content/video
// @desc    Get all video content
// @access  Private
router.get('/video', auth, async (req, res) => {
    try {
        const content = await contentService.getContentByType('video');
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content/audio
// @desc    Get all audio content
// @access  Private
router.get('/audio', auth, async (req, res) => {
    try {
        const content = await contentService.getContentByType('audio');
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content/filter
// @desc    Filter content by category, duration, tags
// @access  Private
router.get('/filter', auth, async (req, res) => {
    try {
        const { category, duration, tags } = req.query;
        const content = await contentService.filterContent(category, duration, tags);
        await addToWatchHistory(userId, contentId);
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content/:id
// @desc    Get content by ID and track watch history
// @access  Private
router.get('/:contentId', auth, async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const userId = req.userId;
        const content = await contentService.getContentById(contentId);
        const user = await watchHistoryService.addToWatchHistory(userId, contentId);
        res.json(content);
    } catch (error) {
        console.error("Error getting content:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;