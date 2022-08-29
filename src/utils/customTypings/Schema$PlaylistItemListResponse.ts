export type Schema$PlaylistItemListResponse = {
    kind: string | "youtube#playlistItemListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken: string;
    items: Schema$PlaylistItemListItems;
};

export type Schema$PlaylistItemListItems = Schema$PlaylistItemListItem[] | never[];

export type Schema$PlaylistItemListItem = {
    kind: string | "youtube#playlistItem";
    etag: string;
    id: string;
    snippet: Schema$PlaylistItemListItemSnippet;
    status: Schema$PlaylistItemListItemStatus;
    contentDetails: Schema$PlaylistItemListItemContentDetails;
};

type Schema$PlaylistItemListItemSnippet = {
    title: string;
    description: string;
    publishedAt: string | Date;
    thumbnails: Schema$ItemSnippetThumbnails;
    channelId: string;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
        kind: string | "youtube#video";
        videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
};

type Schema$PlaylistItemListItemStatus = {
    privacyStatus: string;
};

type Schema$PlaylistItemListItemContentDetails = {
    videoId: string;
    videoPublishedAt: string | Date;
};
