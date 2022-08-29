import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { Credentials } from "google-auth-library";

import { CallbackQuery, AuthCookies } from "@utils/customTypings/Server$OAuth";
import { AuthService } from "@server/service/youtubeOAuth";
import ServerError, { CONTROLLER_ERROR_REDIRECT_CATCHER } from "@server/utils/classes/ServerError";
import { REDIRECT_HOST } from "@server/config";

const { OK } = StatusCodes;
const stateKey = "youtube_auth_state";
const AuthClient = new AuthService();

interface ReqCookie extends Request {
    cookies: AuthCookies;
}

/**
 * GET /auth/login - Auth Client Controller.
 * Generates a random string state and an OAuth url.
 *
 * @param _req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /auth/login
 * @response OK: { url: string; state: string} - BAD_RESPONSE: Error
 */
export const authClient = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const state = AuthClient.generateRandomString(16);
        res.cookie(stateKey, state);
        const url = AuthClient.generateAuthURL(state);

        if (url instanceof Error) {
            throw url;
        }

        res.status(OK).json({ url, state });
    } catch (err) {
        next(err as typeof ServerError);
    }
};

/**
 * GET /auth/callback - Gets STATE and CODE from query params and gets new tokens for auth
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /auth/login
 * @redirect /foryou | /#error
 */
export const authCallBack = (req: ReqCookie, res: Response, _next: NextFunction) => {
    try {
        const code = req.query.code?.toString() || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;

        const getAsyncNewToken = async () => {
            const responseToken = await AuthClient.getNewToken(code || "");
            if (responseToken instanceof Error) throw responseToken;

            return responseToken;
        };

        void getAsyncNewToken()
            .then((responseToken) => {
                if (responseToken instanceof Error || responseToken instanceof ServerError) throw responseToken;
                const [tokens] = responseToken;
                const { access_token, refresh_token } = tokens as Credentials;

                if (state === null || state !== storedState) {
                    res.redirect(`/#${new URLSearchParams({ error: "state_mismatch" }).toString()}`);
                } else {
                    res.clearCookie(stateKey);
                    res.redirect(
                        `${REDIRECT_HOST}/foryou?${new URLSearchParams({
                            access_token: access_token || "",
                            refresh_token: refresh_token || ""
                        }).toString()}`
                    );
                }
            })
            .catch((err) => {
                CONTROLLER_ERROR_REDIRECT_CATCHER(res, err);
            });
    } catch (err) {
        CONTROLLER_ERROR_REDIRECT_CATCHER(res, err);
    }
};

/**
 * GET /auth/refresh_token
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /auth/refresh_token
 * @response OK { access_token: string; expires_in: number; scope: string; token_type: string; } | BAD_RESPONSE Error
 */
export const authRefresh = (req: Request<unknown, unknown, unknown, CallbackQuery>, res: Response, next: NextFunction) => {
    try {
        const { refresh_token } = req.query;

        AuthClient.refreshToken(refresh_token)
            .then((access_token) => {
                if (access_token instanceof Error || access_token instanceof ServerError) throw access_token;
                res.json({ ...access_token });
            })
            .catch((err: Error) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};
