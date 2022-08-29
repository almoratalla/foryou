import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./reducers/counterSlice";
import activeUIReducer from "./reducers/activeUISlice";
import profileDataReducer from "./reducers/profileDataSlice";
import authURIReducer from "./reducers/authURISlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        activeUI: activeUIReducer,
        profileData: profileDataReducer,
        authURI: authURIReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
