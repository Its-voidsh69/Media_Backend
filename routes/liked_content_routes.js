// like_content_route.js
const express = require('express');
const router = express.Router();
const likedContentService = require('../services/liked_content_service');
const {NotFoundError} = require("../utils/errors");
const mongoose = require('mongoose');
// GET /api/liked_content - Get liked video content for the authenticated user
router.get('/', async (req, res) => { 
    const userId = req.userId; 

    try {
        const likedVideoContent = await likedContentService.getUserLikedContent(userId);
        res.json(likedVideoContent);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error getting liked video content' });
    }
});

module.exports = router;
