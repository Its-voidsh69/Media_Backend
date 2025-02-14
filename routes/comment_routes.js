const express = require('express');
const router = express.Router();
const commentService = require('../services/comment_service'); 
const auth = require('../middleware/auth');
const { NotFoundError, UnauthorizedError } = require('../utils/errors'); 
const {body, validationResult} = require('express-validator');  

// @route   POST api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', [auth,
    body('contentId').notEmpty().withMessage('Content ID is required'),
    body('text').notEmpty().withMessage('Comment text is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { contentId, text } = req.body;
        const userId = req.userId; 
        const newComment = await commentService.createComment(contentId, userId, text);
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   DELETE api/comments/:commentId
// @desc    Delete a comment
// @access  Private
router.delete('/:commentId', auth, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;
        await commentService.deleteComment(commentId, userId);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   PUT api/comments/:commentId
// @desc    Update a comment
// @access  Private
router.put('/:commentId', [auth,
    body('text').notEmpty().withMessage('Comment text is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { commentId } = req.params;
        const userId = req.userId;
        const { text } = req.body;
        const updatedComment = await commentService.updateComment(commentId, userId, text);
        res.json(updatedComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;