import { Schema$ItemSnippetThumbnails } from "./Schema$Response";

export type Schema$SubscriptionListResponse = {
    kind: string | "youtube#SubscriptionListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken: string;
    prevPageToken?: string;
    items: Schema$SubscriptionListItems;
};

export type Schema$SubscriptionListItems = Schema$SubscriptionListItem[];

export type Schema$SubscriptionListItem = {
    kind: string | "youtube#subscription";
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
};

export type Schema$SubscriberListItemSnippet = {
    title: string;
    description: string;
    publishedAt: string | Date;
    thumbnails: Schema$ItemSnippetThumbnails;
    channelId: string;
    resourceId?: {
        kind: string | "youtube#channel";
        channelId: string;
    };
};

export type Schema$SubscriberListItemContentDetails = {
    totalItemCount: number;
    newItemCount: number | string;
    activityType: string;
};
