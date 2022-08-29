const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const getTokenTimestamp = () => window.localStorage.getItem("youtube_token_timestamp") || `${EXPIRATION_TIME}`;
const getLocalAccessToken = () => window.localStorage.getItem("youtube_access_token") || "";
const getLocalRefreshToken = () => window.localStorage.getItem("youtube_refresh_token") || "";

const setTokenTimestamp = () => window.localStorage.setItem("youtube_token_timestamp", Date.now().toString());
const setLocalAccessToken = (localToken: string) => {
    setTokenTimestamp();
    window.localStorage.setItem("youtube_access_token", localToken);
};
const setLocalRefreshToken = (refreshToken: string) => window.localStorage.setItem("youtube_refresh_token", refreshToken);

const getAccessParams = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const error = params.get("error");
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    return { error, access_token, refresh_token };
};

const refreshAccessToken = async () => {
    try {
        const localRefresh = getLocalRefreshToken();
        if (!localRefresh) return;
        const response = await fetch(`/auth/refresh_token?refresh_token=${localRefresh}`);
        const { access_token } = (await response.json()) as { access_token: string };
        setLocalAccessToken(access_token);
        // window.location.reload();

        return;
    } catch (err) {
        console.log(err);
    }
};

export const getAccessToken = () => {
    const localAccessToken = getLocalAccessToken();
    const { error, access_token, refresh_token } = getAccessParams();

    if (Date.now() - +getTokenTimestamp() < EXPIRATION_TIME) {
        return localAccessToken;
    }

    if (error) {
        void refreshAccessToken();
    }
    if (Date.now() - +getTokenTimestamp() > EXPIRATION_TIME) {
        void refreshAccessToken();
    }

    if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token || "");

        return access_token;
    }

    return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
    window.localStorage.removeItem("youtube_token_timestamp");
    window.localStorage.removeItem("youtube_access_token");
    window.localStorage.removeItem("youtube_refresh_token");
    window.location.pathname === "/foryou" && window.location.search ? (window.location.href = "/") : window.location.reload();
};
