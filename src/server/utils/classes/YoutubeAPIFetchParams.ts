const ID = "id";
const CONTENT_DETAILS = "contentDetails";
const SNIPPET = "snippet";
const STATUS = "status";
const STATISTICS = "statistics";
const CONTENT_OWNER_DETAILS = "contentOwnerDetails";
const BRANDING_SETTINGS = "brandingSettings";
const TOPIC_DETAILS = "topicDetails";
const PLAYER = "player";
const LOCALIZATIONS = "localizations";
const SUBSCRIBER_SNIPPET = "subscriberSnippet";

const paramsPart = (...parts: string[]) => parts.join(",") as YTAPIFetchParamsPart;

type YTAPIFetchType = "channel" | "playlistItems" | "playlist" | "subscriptions";
type YTAPIFetchParamsPart =
    | "contentDetails,statistics,contentOwnerDetails,snippet,brandingSettings,status,topicDetails"
    | "id,contentDetails,snippet,status"
    | "id,contentDetails,snippet,status,player,localizations"
    | "id,contentDetails,snippet,subscriberSnippet";

export type ServiceFetchParams = {
    access_token: string;
    type: string;
    mine?: string | undefined;
    part: string;
    playlistId?: string | undefined;
    maxResults?: string | undefined;
    order?: string | undefined;
    pageToken?: string | undefined;
    id?: string | undefined;
};

class YoutubeAPIFetchParams {
    access_token: string;
    type: YTAPIFetchType | string;
    mine?: string;
    readonly part: YTAPIFetchParamsPart | string;
    playlistId?: string;
    maxResults?: string;
    order?: "relevance" | "alphabetical" | "unread" | string;
    pageToken?: string;
    id?: string;

    constructor(type: YTAPIFetchType, token: string) {
        this.access_token = token;
        this.type = type;

        switch (type) {
            case "channel":
                // contentDetails,statistics,contentOwnerDetails,snippet,brandingSettings,status,topicDetails,id,localizations
                this.part = paramsPart(CONTENT_DETAILS, STATISTICS, CONTENT_OWNER_DETAILS, SNIPPET, BRANDING_SETTINGS, STATUS, TOPIC_DETAILS, ID, LOCALIZATIONS);
                break;
            case "playlistItems":
                // id,contentDetails,snippet,status
                this.part = paramsPart(ID, CONTENT_DETAILS, SNIPPET, STATUS);
                break;
            case "playlist":
                // id,contentDetails,snippet,status,player,localizations
                this.part = paramsPart(ID, CONTENT_DETAILS, SNIPPET, STATUS, PLAYER, LOCALIZATIONS);
                break;
            case "subscriptions":
                // id,contentDetails,snippet,subscriberSnippet
                this.part = paramsPart(ID, CONTENT_DETAILS, SNIPPET, SUBSCRIBER_SNIPPET);
                break;
            default:
                this.part = "";
                break;
        }
    }
    // set mine(value: boolean | string) {
    //     this._mine = value.toString();
    // }
    // set maxResults(value: number | string) {
    //     this._maxResults = value.toString();
    // }
}

export default YoutubeAPIFetchParams;
