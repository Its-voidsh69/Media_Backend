const User = require('../models/user');
const { NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

async function addToWatchHistory(userId, contentId) {
  try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new BadRequestError('Invalid user ID format'); // Or NotFoundError if you prefer
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
          throw new BadRequestError('Invalid content ID format');
      }

      const user = await User.findById(userId);

      if (!user) {
          throw new NotFoundError('User not found');
      }

      const contentExists = user.watchHistory.find(item => item.contentId.equals(contentId));

      if (contentExists) {
          contentExists.timestamp = new Date();
      } else {
          user.watchHistory.push({ contentId: contentId, timestamp: new Date() });
      }

      await user.save();
  } catch (error) {
      throw error; 
  }
}

async function getWatchHistory(userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new NotFoundError('User not found or invalid Id format');
        }
        const user = await User.findById(userId)
            .populate({
                path: 'watchHistory.contentId',
                select: 'title description thumbnail duration contentType'
            });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user.watchHistory
            .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getWatchHistory,
    addToWatchHistory
};