export type API$ExploreSuggestions = {
    page?: string;
    contents?: API$ExploreSuggestionsContents;
    richContents?: {
        type: string;
        contents: API$ExploreSuggestionsContents;
    }[];
};

export type API$ExploreSuggestionsContents = {
    title?: string;
    label?: string;
    link?: string;
    id: string;
    index: number;
    duration: {
        label: string;
        timeDuration?: string;
    };
    details: {
        channel: {
            title?: string;
            avatar?: string;
            link?: string;
        };
        views?: string;
        upload?: string;
        isVerified: boolean | string;
    };
    thumbnail: {
        url: string;
        alt: string;
        formats: string[];
    };
}[];
