import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";

interface AuthURIState {
    value: string;
    status: RequestState | undefined;
}

type RequestState = "pending" | "fulfilled" | "rejected";

const initialState: AuthURIState = {
    value: "",
    status: undefined
};

export const fetchAuthURI = createAsyncThunk<{ url: string }>("foryou/fetchAuthURI", async () => {
    try {
        const response = await fetch("/auth/login");
        const data = (await response.json()) as { url: string };

        return data;
    } catch (err) {
        return { url: "/" };
    }
});

export const authURISlice = createSlice({
    name: "authURI",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthURI.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchAuthURI.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.value = action.payload.url;
        });
        builder.addCase(fetchAuthURI.rejected, (state) => {
            state.status = "rejected";
        });
    }
});

export const selectAuthURI = (state: RootState) => state.authURI.value;
export const selectAuthURIStatus = (state: RootState) => state.authURI.status;

export default authURISlice.reducer;
