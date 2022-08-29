import { useEffect, useState } from "react";

import Main from "@components/Explore/ExploreContent";
import { API$ExploreSuggestions } from "@utils/customTypings/API$ExploreSuggestions";
import { fetchExploreSuggestions } from "@/utils/youtube";

const Explore = () => {
    const [exploreSuggestions, setExploreSuggestions] = useState<API$ExploreSuggestions>({ page: "Youtube" });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        void fetchExploreSuggestions()
            .then((fetchData) => {
                if (fetchData instanceof Error) throw fetchData;
                setExploreSuggestions(fetchData);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(true));

        return () => {
            setIsLoading(true);
            setExploreSuggestions({ page: "Youtube" });
        };
    }, []);

    return <Main data={exploreSuggestions} isLoading={isLoading} />;
};

export default Explore;
