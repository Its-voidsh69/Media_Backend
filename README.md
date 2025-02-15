# CLINIKK_TV BACKEND

## Project Overview
```md
Clinikk TV is a backend service that provides users access to health-related content in the form of audio and video.This project is a Proof of Concept (POC) for Clinikk TV's backend API, enabling user authentication, subscription based access, media upload, retrieval, streaming, and user interaction.
```

## Table of Contents
```md
Tech Stack
Directory Structure
Installation and Setup
Environment Variables
Running the Backend Service
API Endpoints
Design Approach
License
Author
```
## Tech Stack
```md
Node.js
Express.js
MongoDB with Mongoose
JSON Web Token (JWT) authentication
AWS SDK for S3 integration
```

## Directory Structure
```md
its-voidsh69-media_backend/
├── app.js # Main entry point
├── package.json # Dependencies and scripts
├── middleware/ # Authentication middleware
│ └── auth.js
├── models/ # Mongoose schemas
│ ├── comment.js
│ ├── content.js
│ ├── like.js
│ └── user.js
├── routes/ # API endpoints
│ ├── comment_routes.js
│ ├── content_routes.js
│ ├── like_routes.js
│ ├── liked_content_routes.js
│ ├── user_routes.js
│ └── watch_history_routes.js
├── services/ # Business logic
│ ├── comment_service.js
│ ├── content_service.js
│ ├── like_service.js
│ ├── liked_content_service.js
│ ├── user_service.js
│ └── watch_history_service.js
└── utils/
└── errors.js
```
## Installation and Setup
```md
git clone https://github.com/yourusername/its-voidsh69-media_backend.git
cd its-voidsh69-media_backend
```
## Install dependencies:
```md
npm install
```
## Environment Variables
```md
config/default.json
PORT=5000
DB_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
```
## Running the Backend Service
```md
Start the server in production mode:
npm start
Run in development mode (with hot-reloading using Nodemon):
npm run dev
```
## API Endpoints
```md
### User Authentication _(Public)_
| Method | Endpoint            | Description                   |
|--------|---------------------|-------------------------------|
| POST   | /api/users/register | Register new users           |
| POST   | /api/users/login    | Authenticate and get JWT      |
| POST   | /api/users/logout   | Logout user                  |

### Content Management _(Private - Only Subscribed Users)_
| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| GET    | /api/content         | Fetch all content               |
| POST   | /api/content         | Upload media(video/audio)       |
| GET    | /api/content/video   | Fetch all video content         |
| GET    | /api/content/audio   | Fetch all audio content         |
| GET    | /api/content/filter  | Fetch content with filter       |
| GET    | /api/content/:id     | Fetch content by ID             |

### User Interaction _(Private)_
| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| POST   | /api/comments            | Add a comment                   |
| PUT    | /api/comments/:id        | Update a comment                |
| DELETE | /api/comments/:id        | Delete a comment                |
| POST   | /api/likes/:contentId    | Like or unlike a content        |
| GET    | /api/liked-content       | Get liked content of user       |
| GET    | /api/watch-history       | Get user watch history          |
```

## Design Approach
```md
The backend follows a modular service-based architecture to separate concerns, making it scalable and maintainable.

Authentication: JWT-based authentication ensures security.
Database: MongoDB with Mongoose ORM is used for flexible data modeling.
AWS S3: Used for scalability
Error Handling: A custom error handling mechanism is implemented in utils/errors.js.
Code Organization:
models/ contains database schemas.
routes/ defines API endpoints.
services/ handles business logic separately from routes.
middleware/ contains authentication logic.
```

## License
```md
This project is for educational purpose.
```

## Author
```md
SUMIT(sumit22b@iiitg.ac.in)
```
