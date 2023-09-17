import { CustomError } from "../errors/CustomError.js";

export const errorHandler = (error, _req, res, _next) => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).send({ error: error.name, message: error.message });
    } else {
        res.status(500).send({ error: "Internal Server Error", message: error.message });
    }
}
