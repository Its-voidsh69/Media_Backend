const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content" 
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);