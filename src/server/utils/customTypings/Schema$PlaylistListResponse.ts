import { Schema$ItemSnippetThumbnails } from "./Schema$Response";

export type Schema$PlaylistListResponse = {
    kind: string | "youtube#playlistListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Schema$PlaylistListItems;
};

export type Schema$PlaylistListItems = Schema$PlaylistListItem[];

export type Schema$PlaylistListItem = {
    kind: string | "youtube#playlist";
    etag: string;
    id: string;
    snippet: Schema$PlaylistListItemSnippet;
    status: Schema$PlaylistListItemStatus;
    contentDetails: Schema$PlaylistListItemContentDetails;
    player: {
        embedHtml: string;
    };
};

type Schema$PlaylistListItemSnippet = {
    title: string;
    description: string;
    publishedAt: string | Date;
    thumbnails: Schema$ItemSnippetThumbnails;
    channelId: string;
    channelTitle: string;
    localized: {
        title: string;
        description: string;
    };
};

type Schema$PlaylistListItemStatus = {
    privacyStatus: string;
};

type Schema$PlaylistListItemContentDetails = {
    itemCount?: number;
};
