import logger from "jet-logger";

import { Error$OAuthError } from "../customTypings/youtubeDataAPIType";

export default class OAuthError {
    error?: {
        code?: number;
        errors?: {
            domain: string;
            location: string;
            locationType: string;
            message: string;
            reason: string;
        }[];
        message?: string;
        status?: number | string;
    };
    message?: string;

    constructor(oauthError: string | Record<string, string | number | Record<string, string>[]> | Error$OAuthError, status?: string) {
        if (typeof oauthError === "object" && oauthError.error) {
            this.error = oauthError.error as unknown as Error$OAuthError;
        } else if (typeof oauthError === "string") {
            this.message = oauthError;
            this.error = { status: status || "FAILURE", message: this.message };
        } else {
            this.message = "Something went wrong";
        }
    }
}

export const SERVICE_OAUTH_ERROR_CATCHER = (err: unknown, type = "OAUTH_ERROR") => {
    let ERR_MESSAGE = "Something went wrong";
    logger.info(`SERVICE: ${type}`);
    if (typeof err === "string") {
        ERR_MESSAGE = err;
        logger.err(err);
    } else if (err instanceof Error) {
        ERR_MESSAGE = err.message;
        logger.err(err.message);
    } else {
        ERR_MESSAGE = "Something went wrong";
    }

    if (err instanceof OAuthError) logger.err({ ...err }.error?.message);

    return ERR_MESSAGE;
};
