const Like = require('../models/like');
const Content = require('../models/content');
const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

async function getUserLikedContent(userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }

        const likes = await Like.find({ likedBy: userId })
            .populate({
                path: 'content',
                model: 'Content'
            })
            .exec();

        const likedContent = likes
            .map(like => like.content)
            .filter(content => content !== null);

        return likedContent;
    } catch (error) {
        console.error("Error getting liked content:", error);
        throw error;
    }
}

module.exports = {
    getUserLikedContent
}
