import { Schema$ItemStatistics, Schema$ItemSnippetThumbnails, Schema$ItemBrandingSettings } from "./Schema$Response";

export type Schema$ChannelListResponse = {
    kind: string | "youtube#channelListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Schema$ChannelListItems;
};

export type Schema$ChannelListItems = Schema$ChannelListItem[];

export type Schema$ChannelListItem = {
    kind: string | "youtube#channel";
    etag: string;
    id: string;
    snippet: Schema$ChannelListItemSnippet;
    status: Schema$ChannelListItemStatus;
    contentDetails: Schema$ChannelListItemsContentDetails;
    statistics: Schema$ItemStatistics;
    brandingSettings: Schema$ItemBrandingSettings;
    topicDetails?: {
        topicIds: string[];
        topicCategories: string[];
    };
    contentOwnerDetails?: any;
};

type Schema$ChannelListItemSnippet = {
    title: string;
    description: string;
    publishedAt: string | Date;
    customUrl?: string;
    thumbnails: Schema$ItemSnippetThumbnails;
    localized: {
        title: string;
        description: string;
    };
    country?: string;
};

type Schema$ChannelListItemStatus = {
    privacyStatus: string;
    isLinked?: boolean;
    longUploadsStatus?: string;
    madeForKids?: string | boolean;
};

type Schema$ChannelListItemsContentDetails = {
    relatedPlaylists?: {
        likes: string;
        uploads: string;
    };
};
