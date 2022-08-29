import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { profileScheme } from "@/utils";
import { API_DATA_MINE_PROFILE } from "@/utils/youtube";
import { Error$OAuthError } from "@utils/customTypings/youtubeDataAPIType";

import { RootState } from "..";

interface ProfileDataState {
    value: Schema$Profile | Error$OAuthError;
    status: RequestState | undefined;
}

type RequestState = "pending" | "fulfilled" | "rejected";

const initialState: ProfileDataState = {
    value: profileScheme,
    status: undefined
};

export const fetchYoutubeProfileData = createAsyncThunk<Schema$Profile, string>("foryou/fetchProfileData", async (token) => {
    try {
        const response = await fetch(API_DATA_MINE_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = (await response.json()) as Schema$Profile;
        document.title = data.title ? `ForYou: ${data.title}` : "ForYou";

        return data;
    } catch (err) {
        document.title = "ForYou";

        return profileScheme;
    }
});

export const profileDataSlice = createSlice({
    name: "profileData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchYoutubeProfileData.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchYoutubeProfileData.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.value = action.payload;
        });
        builder.addCase(fetchYoutubeProfileData.rejected, (state) => {
            state.status = "rejected";
        });
    }
});

export const selectProfileData = (state: RootState) => state.profileData.value;
export const selectProfileDataStatus = (state: RootState) => state.profileData.status;

export default profileDataSlice.reducer;
