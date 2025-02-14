const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser'); // Check if body-parser is needed if using express.json()

// Import route files
const contentRoutes = require('./routes/content_routes');
const userRoutes = require('./routes/user_routes');
const commentRoutes = require('./routes/comment_routes');
const likeRoutes = require('./routes/like_routes');
const watchHistoryRoutes = require('./routes/watch_history_routes');
const likedContent = require('./routes/liked_content_routes');

const app = express();

// Bodyparser Middleware (Check is no longer required due to express.json and express.urlencoded)
app.use(bodyParser.json());

// Connect to MongoDB
const db = config.get('db.uri');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/watch-history', watchHistoryRoutes);
app.use('/api/liked-content', likedContent);

const port = config.get('port') || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));