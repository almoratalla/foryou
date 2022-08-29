import { API$Subscription } from "@utils/customTypings/API$Subscription";

import { getAccessToken } from ".";

export const youtube = "YOUTUBE";

export const API_DATA_MINE_PROFILE = "/api/data/mine/profile";
const API_DATA_EXPLORE = "/api/data/explore";
const API_DATA_MINE_SUBSCRIPTIONS = "/api/data/mine/subscriptions";
const API_DATA_MINE_PLAYLISTS = "/api/data/mine/playlists";
const AUTH_LOGIN = "/auth/login";

export const fetchExploreSuggestions = async () => {
    try {
        const exploreSuggestionsData = await fetch(API_DATA_EXPLORE);
        const data = (await exploreSuggestionsData.json()) as API$ExploreSuggestions;

        return data;
    } catch (err) {
        if (typeof err === "string") return new Error(err);
        else if (err instanceof Error) return err;
        else return new Error("Something went wrong.");
    }
};

export const fetchLoginURI = async () => {
    try {
        const data = await fetch(AUTH_LOGIN);
        const { url } = (await data.json()) as { url: string };

        return url;
    } catch (err) {
        if (typeof err === "string") return new Error(err);
        else if (err instanceof Error) return err;
        else return new Error("Something went wrong.");
    }
};

export const fetchSubscriptions = async (sortBy: string) => {
    try {
        const subscriptions = await fetch(`${API_DATA_MINE_SUBSCRIPTIONS}?sort=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json"
            }
        });
        const data = (await subscriptions.json()) as API$Subscription;

        return data;
    } catch (err) {
        if (typeof err === "string") return new Error(err);
        else if (err instanceof Error) return err;
        else return new Error("Something went wrong.");
    }
};

export const fetchPlaylists = async () => {
    try {
        const playlists = await fetch(`${API_DATA_MINE_PLAYLISTS}?limit=50`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json"
            }
        });
        const data = (await playlists.json()) as Schema$PlaylistListResponse;

        return data;
    } catch (err) {
        if (typeof err === "string") return new Error(err);
        else if (err instanceof Error) return err;
        else return new Error("Something went wrong.");
    }
};

export const fetchProfileData = async () => {
    try {
        const profile = await fetch(API_DATA_MINE_PROFILE, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json"
            }
        });
        const data = (await profile.json()) as Schema$Profile;

        return data;
    } catch (err) {
        if (typeof err === "string") return new Error(err);
        else if (err instanceof Error) return err;
        else return new Error("Something went wrong.");
    }
};
