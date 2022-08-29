// Profile
type Schema$ProfileItems = {
    id: string;
    videoId?: string;
    title: string;
    thumbnail: string;
    ownerTitle: string;
    itemCount?: number;
};

type Schema$ProfileLists = {
    totalResults: number;
    items: Schema$ProfileItems[] | never[];
    etag?: string;
    nextPageToken?: string;
};

type Schema$Profile = {
    id?: string;
    title: string;
    description?: string;
    thumbnail?: string;
    banner?: string;
    meta?: {
        id: string;
        publishedAt: string | number | Date;
        country: string;
        status: {
            privacyStatus: string;
            longUploadsStatus: string;
            madeForKids: string | boolean;
            isLinked: string | boolean;
        };
    };
    tags?: {
        topics: string[] | never[];
        keywords: string[] | never[];
    };
    statistics?: {
        subscribers: number | string;
        views: number | string;
        likes: number | string;
        playlists: number | string;
        videos: number | string;
        lastUpload: Date | string;
    };
    uploads: Schema$ProfileLists;
    likes: Schema$ProfileLists;
    playlist: Schema$ProfileLists;
    error?: {
        code: number;
        errors: {
            message: string;
            domain: string;
            reason: string;
            location: string;
            locationType: string;
        }[];
        message: string;
        status: string;
    };
};

type Subscriptions = {
    id: string;
    snippet: {
        thumbnails: {
            high: {
                url: string;
            };
            medium: {
                url: string;
            };
        };
        title: string;
        resourceId: {
            channelId: string;
        };
    };
    contentDetails: {
        newItemCount: number;
    };
};

type Data = {
    [data: string]: Subscriptions[];
};

type Schema$PlaylistItem = {
    kind: string;
    etag: string;
    items: {
        kind: string;
        etag: string;
        id: string;
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                default?: {
                    url: string;
                    width: number;
                    height: number;
                };
                medium?: {
                    url: string;
                    width: number;
                    height: number;
                };
                high?: {
                    url: string;
                    width: number;
                    height: number;
                };
                maxres?: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
            channelTitle: string;
            playlistId: string;
            position: number;
            resourceId: {
                kind: string;
                videoId: string;
            };
            videoOwnerChannelTitle: string;
            videoOwnerChannelId: string;
        };
        contentDetails: {
            videoId: string;
            videoPublishedAt: string;
        };
        status: {
            privacyStatus: string;
        };
    }[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
};

type Schema$ChannelItems = {
    kind?: string;
    etag?: string;
    id?: string;
    snippet?: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: {
            default?: {
                url: string;
                width: number;
                height: number;
            };
            medium?: {
                url: string;
                width: number;
                height: number;
            };
            high?: {
                url: string;
                width: number;
                height: number;
            };
            maxres?: {
                url: string;
                width: number;
                height: number;
            };
        };
        localized?: {
            title: string;
            description: string;
        };
        country?: string;
        videoOwnerChannelTitle?: string;
        channelTitle?: string;
    };
    contentDetails: {
        relatedPlaylists: {
            likes?: string | number;
            uploads?: string | number;
        };
        videoId?: string;
        itemCount?: number | undefined;
    };
    statistics?: {
        viewCount: number | string;
        subscriberCount: number | string;
        hiddenSubscriberCount?: boolean;
        videoCount: string;
    };
    contentOwnerDetails?: unknown;
};

type Schema$ChannelList = Schema$Channel[];
type Schema$PlaylistItemList = Schema$PlaylistItem[];

type Error$OAuthError = {
    error: {
        code: number;
        errors: {
            domain: string;
            location: string;
            locationType: string;
            message: string;
            reason: string;
        }[];
        message: string;
        status: number | string;
    };
    message?: string;
};

type Schema$Channel = {
    kind?: string;
    etag?: string;
    pageInfo?: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Schema$ChannelItems[];
};

type Schema$Subscriptions = {
    nextPageToken: string;
    prevPageToken: string;
    subscriptions: {
        channel: Schema$ChannelListItem | undefined;
        kind: string;
        etag: string;
        id: string;
        snippet: Schema$SubscriberListItemSnippet;
        contentDetails: Schema$SubscriberListItemContentDetails;
        subscriberSnippet: {
            title: string;
            description: string;
            channelId: string;
            thumbnails: Schema$ItemSnippetThumbnails;
        };
    }[];
    subscriptionsCount: number;
    topics: any[];
};
