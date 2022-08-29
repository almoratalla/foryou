import { FC, useEffect, useState } from "react";

import Main from "@components/Profile/ProfileContent";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import { fetchProfileData } from "@/utils/youtube";
import profileDemo from "@/utils/demo/profile.json";

const Profile: FC<{ isDemo?: boolean }> = ({ isDemo }) => {
    const [profileData, setProfileData] = useState<Schema$Profile>();
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [errorData, setErrorData] = useState<Error$OAuthError | null>(null);
    const [matchesLargeMobile480, setMatchesLargeMobile480] = useState(window.matchMedia("screen and (max-width: 480px) and (min-width: 401px)").matches);
    const [matchesSmallMobile400, setMatchesSmallMobile400] = useState(window.matchMedia("(max-width: 400px)").matches);

    useEffect(() => {
        setIsLoadingData(true);
        if (isDemo) {
            setProfileData(profileDemo);
            setIsLoadingData(false);
        } else {
            void fetchProfileData()
                .then((fetchData) => {
                    if (fetchData instanceof Error) throw fetchData;
                    setProfileData(fetchData || []);
                    if ("error" in fetchData) throw fetchData;
                    setIsLoadingData(false);
                })
                .catch((error) => {
                    setErrorData(error as Error$OAuthError);
                    setIsLoadingData(false);
                });
        }

        window.matchMedia("screen and (max-width: 480px) and (min-width: 401px)").addEventListener("change", (e) => setMatchesLargeMobile480(e.matches));
        window.matchMedia("(max-width: 400px)").addEventListener("change", (e) => setMatchesSmallMobile400(e.matches));

        return () => {
            setIsLoadingData(true);
        };
    }, [isDemo]);

    return !errorData ? (
        <Main
            isLoadingData={isLoadingData || profileData === undefined || !profileData}
            profileData={profileData}
            isDemo={isDemo || false}
            isMediaSmallMobile={matchesSmallMobile400}
            isMediaLargeMobile={matchesLargeMobile480}
        />
    ) : (
        <ErrorHandler error={errorData} />
    );
};

export default Profile;
