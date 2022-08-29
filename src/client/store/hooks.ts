import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { fetchYoutubeProfileData, selectProfileData, selectProfileDataStatus } from "./reducers/profileDataSlice";
import { fetchAuthURI, selectAuthURI, selectAuthURIStatus } from "./reducers/authURISlice";

import { AppDispatch, RootState } from ".";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetProfileData = (token: string) => {
    const dispatch = useAppDispatch();
    const data = useSelector((state: RootState) => selectProfileData(state));
    const status = useSelector((state: RootState) => selectProfileDataStatus(state));
    useEffect(() => {
        if (status === undefined) {
            void dispatch(fetchYoutubeProfileData(token));
        }
    }, [status, token, dispatch]);

    const isUninitialized = status === undefined;
    const isLoading = status === "pending" || status === undefined;
    const isError = status === "rejected";
    const isSuccess = status === "fulfilled";

    return { data, isUninitialized, isLoading, isError, isSuccess };
};

export const useGetAuthURI = () => {
    const dispatch = useAppDispatch();
    const url = useSelector((state: RootState) => selectAuthURI(state));
    const status = useSelector((state: RootState) => selectAuthURIStatus(state));
    useEffect(() => {
        if (status === undefined) {
            void dispatch(fetchAuthURI());
        }
    }, [status, dispatch]);

    const isUninitialized = status === undefined;
    const isLoading = status === "pending" || status === undefined;
    const isError = status === "rejected";
    const isSuccess = status === "fulfilled";

    return { url, isUninitialized, isLoading, isError, isSuccess };
};
