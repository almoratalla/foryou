import { Response } from "express";
import logger from "jet-logger";

export default class ServerError extends Error {
    constructor(message?: string, public type?: string, public status?: number) {
        super(message);
    }
}

export const SERVICE_ERROR_CATCHER = (err: unknown, type: string, err_message?: string) => {
    let ERR_MESSAGE = err_message || "Something went wrong";
    logger.info("SERVICE: GENERATE AUTH URL");
    if (typeof err === "string") {
        ERR_MESSAGE = err;
    } else if (err instanceof Error) {
        ERR_MESSAGE = err.message;
    } else {
        ERR_MESSAGE = "Something went wrong";
    }
    logger.err(ERR_MESSAGE);

    return new ServerError(ERR_MESSAGE, type);
};

export const CONTROLLER_ERROR_REDIRECT_CATCHER = (res: Response, err: unknown) => {
    if (typeof err === "string") {
        res.redirect(`/#${new URLSearchParams({ error: err }).toString()}`);
    } else if (err instanceof Error) {
        res.redirect(`/#${new URLSearchParams({ error: err.message }).toString()}`);
    } else {
        res.redirect(`/#${new URLSearchParams({ error: "something went wrong" }).toString()}`);
    }
};
