import { Buffer } from "buffer";

import fetch from "node-fetch";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import logger from "jet-logger";

import { SERVICE_ERROR_CATCHER } from "@server/utils/classes/ServerError";
import { OAuthGoogleAPIsTokenResponse, TokenParams } from "@utils/customTypings/Server$OAuth";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "@server/config";

const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

const oAuth2Client: OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export class AuthService {
    /**
     * Generates auth URL using the current OAuthClient
     *
     * @param state State generated random string
     * @returns URL from OAuthClient.generateAuthURL | ServerError
     */
    public generateAuthURL(state: string) {
        try {
            const url = oAuth2Client.generateAuthUrl({
                access_type: "offline",
                scope: SCOPES[0],
                response_type: "code",
                redirect_uri: REDIRECT_URI,
                state,
                prompt: "consent"
            });

            return url;
        } catch (err) {
            return SERVICE_ERROR_CATCHER(err, "GENERATE_AUTH_URL");
        }
    }

    /**
     * Generates a random string from a given length
     *
     * @param length Length of the desired string output
     * @returns Random string of x length
     */
    public generateRandomString = (length: number) => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    /**
     * Gets new tokens object which contains access token, refresh token, scope, token type and expiry date.
     *
     * @param code Code provided from the generated OAuth URL Callback.
     * @returns Array with OAuth2Client reference and the token object. [OAuth2Client, tokens] | Error ; tokens = { access_token: string, refresh_token: string, scope: string, token_type: string, expiry_date: number}
     *
     */
    public async getNewToken(code: string) {
        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.credentials = tokens;
            oAuth2Client.setCredentials(tokens);

            return [tokens, oAuth2Client];
        } catch (err) {
            return SERVICE_ERROR_CATCHER(err, "GET_NEW_TOKEN");
        }
    }

    /**
     * Fetches new tokens using a given refresh token
     *
     * @param rtoken Refresh token needed to fetch new tokens
     * @returns OAuthGooleAPIsToken Response | Error ; OAuthGoogleAPIsToken Response = { access_token?: string | undefined; expires_in?: number | undefined; scope?: string | undefined; token_type?: string | undefined;}
     */
    public async refreshToken(rtoken: string) {
        oAuth2Client.on("tokens", (tokens) => logger.info(tokens));

        const bodyparams: TokenParams = {
            client_id: CLIENT_ID || "",
            client_secret: CLIENT_SECRET || "",
            refresh_token: rtoken,
            grant_type: "refresh_token"
        };
        const targetbuffer = `${CLIENT_ID || ""}:${CLIENT_SECRET || ""}`;
        const authbuffer = Buffer.from(targetbuffer).toString("base64");

        const formBody = Object.keys(bodyparams)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(bodyparams[key] || ""))
            .join("&");

        try {
            const RefreshedAccessToken = await fetch("https://oauth2.googleapis.com/token", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    Authorization: `Basic ${authbuffer}`
                },
                method: "POST",
                body: formBody
            });
            const RefreshedAccessTokenJson = (await RefreshedAccessToken.json()) as OAuthGoogleAPIsTokenResponse;

            if (!RefreshedAccessToken.ok || RefreshedAccessTokenJson.error) {
                throw new Error(RefreshedAccessTokenJson?.error || RefreshedAccessTokenJson?.error_description || "Something went wrong during refreshing of access token.");
            }

            return RefreshedAccessTokenJson;
        } catch (err) {
            return SERVICE_ERROR_CATCHER(err, "REFRESH_TOKEN");
        }
    }
}

export default AuthService;
