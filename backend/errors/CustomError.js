// Export Custom Error Class
export class CustomError extends Error {
    constructor(name, message, statusCode) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        super("NotFoundError", message, 404);
    }
}

export class ExpiredError extends CustomError {
    constructor(message) {
        super("ExpiredError", message, 410);
    }
}

export class BadRequestError extends CustomError {
    constructor(message) {
        super("BadRequestError", message, 400);
    }
}
