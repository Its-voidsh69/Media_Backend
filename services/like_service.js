const Like = require('../models/like');
const Content = require('../models/content');
const { NotFoundError } = require('../utils/errors');

// Like or unlike content
exports.likeContent = async (contentId, userId) => {
    try {
        const existingLike = await Like.findOne({ content: contentId, likedBy: userId });
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            return { message: 'Content unliked successfully' };
        } else {
            const newLike = new Like({ content: contentId, likedBy: userId });
            await newLike.save();
            return { message: 'Content liked successfully' };
        }
    } catch (error) {
        console.error("Error liking/unliking content:", error);
        throw error;
    }
};

// Get likes for content
exports.getLikesForContent = async (contentId) => {
    try {
        const likes = await Like.find({ content: contentId }).populate('likedBy', 'username');
        return likes;
    } catch (error) {
        console.error("Error getting likes for content:", error);
        throw error;
    }
};
