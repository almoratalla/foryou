import { FC, useEffect, useState } from "react";

import Main from "@components/Playlists/YourPlaylistsContent";
import { fetchPlaylists } from "@/utils/youtube";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import playlistsDemo from "@/utils/demo/playlists.json";

const Playlists: FC<{ isDemo?: boolean }> = ({ isDemo }) => {
    const [yourPlaylistsData, setYourPlaylistsData] = useState<Schema$PlaylistListItems | never[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [errorData, setErrorData] = useState<Error$OAuthError | null>(null);

    useEffect(() => {
        setIsLoadingData(true);
        if (isDemo) {
            setYourPlaylistsData(playlistsDemo.items);
            setIsLoadingData(false);
        } else {
            void fetchPlaylists()
                .then((fetchData) => {
                    if (fetchData instanceof Error) throw fetchData;
                    setYourPlaylistsData(fetchData.items || []);
                    if ("error" in fetchData) throw fetchData;
                    setIsLoadingData(false);
                })
                .catch((error) => {
                    setErrorData(error as Error$OAuthError);
                    setIsLoadingData(false);
                });
        }

        return () => {
            setIsLoadingData(true);
        };
    }, [isDemo]);

    return !errorData ? <Main data={yourPlaylistsData} isLoading={isLoadingData} isDemo={isDemo} /> : <ErrorHandler error={errorData} type="playlists" />;
};

export default Playlists;
