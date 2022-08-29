import { Schema$PlaylistItemListItem, Schema$PlaylistItemListItems, Schema$PlaylistItemListResponse } from "./customTypings/Schema$PlaylistItemListResponse";
import { Schema$PlaylistListItem, Schema$PlaylistListItems, Schema$PlaylistListResponse } from "./customTypings/Schema$PlaylistListResponse";
import { Schema$ProfileItems, Schema$ProfileLists } from "./customTypings/youtubeDataAPIType";

export const constructProfileItems = (items: Schema$PlaylistItemListItems | Schema$PlaylistListItems) => {
    return items.map((item) => {
        const profileItems: Schema$ProfileItems = {
            id: item.id || "",
            title: item.snippet?.title || "",
            thumbnail: item.snippet?.thumbnails.maxres?.url || item.snippet?.thumbnails.high?.url || item.snippet?.thumbnails.default?.url || "",
            ownerTitle: "",
            itemCount: 0
        };

        if ("videoId" in item.contentDetails) {
            profileItems.videoId = (item as Schema$PlaylistItemListItem).contentDetails.videoId;
        }

        if ("videoOwnerChannelTitle" in item.snippet) {
            profileItems.ownerTitle = item.snippet?.videoOwnerChannelTitle || "";
        }

        if ("channelTitle" in item.snippet) {
            profileItems.ownerTitle = item.snippet?.channelTitle;
        }

        if ("itemCount" in item.contentDetails) {
            profileItems.itemCount = (item as Schema$PlaylistListItem).contentDetails.itemCount || 0;
        }

        return profileItems;
    });
};

export const constructProfileList = (listResponse: Schema$PlaylistItemListResponse | Schema$PlaylistListResponse) => {
    const profileList: Schema$ProfileLists = {
        totalResults: listResponse?.pageInfo?.totalResults || 0,
        etag: listResponse?.etag || "",
        nextPageToken: "",
        items: constructProfileItems(listResponse.items)
    };

    if ("nextPageToken" in listResponse) {
        profileList.nextPageToken = listResponse?.nextPageToken;
    }

    return profileList;
};

export default constructProfileItems;
