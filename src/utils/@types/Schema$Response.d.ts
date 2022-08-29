type Schema$Response = {
    kind: string | "youtube#playlistListResponse" | "youtube#channelListResponse" | "youtube#playlistItemListResponse" | "youtube#SubscriptionListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken?: string; // PlaylistItemListResponse && SubscriptionListResponse
    prevPageToken?: string; // SubscriptionListResponse
    items: Schema$Items;
};

type Schema$Items = Schema$Item[];
type Schema$Item = {
    kind: string | "youtube#playlist" | "youtube#channel" | "youtube#playlistItem" | "youtube#subscription";
    etag: string;
    id: string;
    snippet: Schema$ItemSnippet;
    status?: Schema$ItemStatus; // PlaylistListResponse && PlaylistItemListResponse && ChannelListResponse
    contentDetails: Schema$ItemContentDetails;
    player?: {
        embedHtml: string;
    }; // PlaylistListResponse
    statistics?: Schema$ItemStatistics; // ChannelListResponse
    brandingSettings?: Schema$ItemBrandingSettings; // ChannelListResponse
    topicDetails?: {
        topicIds: string[];
        topicCategories: string[];
    }; // ChannelListResponse
    subscriberSnippet: {
        title: string;
        description: string;
        channelId: string;
        thumbnails: Schema$ItemSnippetThumbnails;
    }; // SubscriberListResponse
};

type Schema$ItemSnippet = {
    title: string;
    description: string;
    publishedAt: string | Date;
    thumbnails: Schema$ItemSnippetThumbnails;
    channelId?: string; // PlaylistListResponse && PlaylistItemListResponse && SubscriptionListResponse
    channelTitle?: string; // PlaylistListResponse && PlaylistItemListResponse
    localized?: {
        title: string;
        description: string;
    }; // PlaylistListResponse && ChannelListResponse
    country?: string; // ChannelListResponse
    playlistId?: string; // PlaylistItemListResponse
    position?: number; // PlaylistItemListResponse
    resourceId?: {
        kind: string | "youtube#video" | "youtube#channel";
        videoId?: string;
        channelId?: string;
    }; // PlaylistItemListResponse && SubscriptionListResponse
    videoOwnerChannelTitle?: string; // PlaylistItemListResponse
    videoOwnerChannelId?: string; // PlaylistItemListResponse
};

type Schema$ItemSnippetThumbnails = {
    default?: Schema$ItemSnippetThumbnail;
    medium?: Schema$ItemSnippetThumbnail;
    high?: Schema$ItemSnippetThumbnail;
    standard?: Schema$ItemSnippetThumbnail;
    maxres?: Schema$ItemSnippetThumbnail;
};

type Schema$ItemSnippetThumbnail = {
    url: string;
    width?: number;
    height?: number;
};

type Schema$ItemStatus = {
    privacyStatus: string;
    isLinked?: boolean; // ChannelListResponse
    longUploadsStatus?: string; // ChannelListResponse
    madeForKids?: string; // ChannelListResponse
};

type Schema$ItemContentDetails = {
    relatedPlaylists?: {
        likes: string;
        uploads: string;
    }; // ChannelListResponse
    itemCount?: number; // PlaylistListResponse
    videoId?: string; // PlaylistItemListResponse
    videoPublishedAt?: string | Date; // PlaylistItemListResponse
    totalItemCount?: number; // SubscriptionListResponse
    newItemCount?: number; // SubscriptionListResponse
    activityType?: string; // SubscriptionListResponse
};

type Schema$ItemStatistics = {
    viewCount: string | number;
    subscriberCount: string | number;
    hiddenSubscriberCount: boolean;
    videoCount: string | number;
};

type Schema$ItemBrandingSettings = {
    channel: {
        title: string;
        description: string;
        keywords: string;
        country?: string;
        trackingAnalyticsAccountId?: string;
        unsubscribedTrailer?: string;
    };
    image: {
        bannerExternalUrl: string;
    };
};
