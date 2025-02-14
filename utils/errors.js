class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

class InvalidInputError extends CustomError {
    constructor(message = "Invalid input") {
        super(message, 422);
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    UnauthorizedError,
    InvalidInputError
};