export type CallbackQuery = {
    refresh_token: string;
    code: string;
    state: string;
};

export type AuthCookies = {
    [index: string]: string;
    youtube_auth_state: string;
};

export type OAuthGoogleAPIsTokenResponse = {
    access_token?: string;
    expires_in?: number;
    scope?: string;
    token_type?: string;
    error?: string;
    error_description?: string;
};

export type TokenParams = {
    client_id: string;
    client_secret: string;
    refresh_token: string;
    grant_type: string;
    [index: string]: string | number;
};
