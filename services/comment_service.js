const Comment = require('../models/comment'); //Imported and used
const { NotFoundError, UnauthorizedError } = require('../utils/errors'); //Import errors

// Create a new comment
exports.createComment = async (contentId, userId, text) => {
    try {
        const comment = new Comment({
            contentId: contentId,
            userId: userId,
            text: text
        });
        await comment.save();
        return comment;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};
// Delete a comment
exports.deleteComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        // Check if the user owns the comment
        if (comment.userId.toString() !== userId) {
            throw new UnauthorizedError('Not authorized to delete this comment');
        }
        await Comment.findByIdAndDelete(commentId);
        return { message: 'Comment deleted' };
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
// Update a comment
exports.updateComment = async (commentId, userId, text) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        if (comment.userId.toString() !== userId) {
            throw new UnauthorizedError('Not authorized to update this comment');
        }
        comment.text = text;
        await comment.save();
        return comment;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};