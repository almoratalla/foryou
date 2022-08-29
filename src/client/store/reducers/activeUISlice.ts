import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";

interface ActiveUIState {
    value: {
        isSideNavActive: boolean;
    };
}

const initialState: ActiveUIState = {
    value: {
        isSideNavActive: false
    }
};

export const activeUISlice = createSlice({
    name: "activeUI",
    initialState,
    reducers: {
        toggleSideNav: (state) => {
            state.value.isSideNavActive = !state.value.isSideNavActive;
        }
    }
});

export const { toggleSideNav } = activeUISlice.actions;

export const selectActiveUI = (state: RootState) => state.activeUI.value;

export default activeUISlice.reducer;
