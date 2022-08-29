export const errorProfileScheme: Schema$Profile = {
    title: "",
    playlist: { totalResults: 0, items: [] },
    likes: { totalResults: 0, items: [] },
    uploads: { totalResults: 0, items: [] }
};

export const profileScheme: Schema$Profile = {
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    banner: "",
    meta: {
        id: "",
        publishedAt: "",
        country: "",
        status: {
            privacyStatus: "",
            longUploadsStatus: "",
            madeForKids: "",
            isLinked: ""
        }
    },
    tags: {
        topics: [],
        keywords: []
    },
    statistics: {
        subscribers: "",
        views: "",
        likes: "",
        playlists: "",
        videos: "",
        lastUpload: ""
    },
    uploads: {
        totalResults: 0,
        items: []
    },
    likes: {
        totalResults: 0,
        items: []
    },
    playlist: {
        totalResults: 0,
        items: []
    }
};
