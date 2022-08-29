export type API$Subscription = {
    nextPageToken: string;
    prevPageToken: string;
    subscriptions: API$SubscriptionListItems;
    subscriptionsCount: number;
    topics: {
        id: string;
        link: string;
    }[];
};

export type API$SubscriptionListItems = {
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
    channel: Schema$ChannelListItem;
}[];
