import fetch from "node-fetch";
import * as puppeteer from "puppeteer";

import { Error$OAuthError, Schema$Profile, Schema$Subscriptions } from "@utils/customTypings/youtubeDataAPIType";
import { Schema$ChannelListResponse, Schema$ChannelListItem } from "@utils/customTypings/Schema$ChannelListResponse";
import { Schema$PlaylistItemListResponse } from "@utils/customTypings/Schema$PlaylistItemListResponse";
import { Schema$PlaylistListResponse } from "@utils/customTypings/Schema$PlaylistListResponse";
import { Schema$Response } from "@utils/customTypings/Schema$Response";
import { Schema$SubscriptionListResponse } from "@utils/customTypings/Schema$SubscriptionListResponse";
import {
    URL$ChannelsAPI,
    URL$PlaylistItemsAPI,
    URL$PlaylistsAPI,
    URL$SubscriptionsAPI,
    youtubeChannelsAPI,
    youtubePlaylistItemsAPI,
    youtubePlaylistsAPI,
    youtubeSubscriptionsAPI
} from "@server/utils/constants/youtube";
import YoutubeAPIFetchParams, { ServiceFetchParams } from "@server/utils/classes/YoutubeAPIFetchParams";
import OAuthError, { SERVICE_OAUTH_ERROR_CATCHER } from "@server/utils/classes/OAuthError";
import { constructProfileList } from "@server/utils";

class DataService {
    /**
     * Gets current token owner's channel data
     *
     * @param token Youtube OAuth access token
     * @param params Youtube API fetch parameters
     * @returns Promise< Channel Data | Error >: Schema$ChannelListResponse | Schema$Response | Error$OAuthError;
     * @fetchURL https://www.googleapis.com/youtube/v3/channels?access_token=${token}&part=contentDetails%2Cstatistics%2CcontentOwnerDetails%2Csnippet&mine=true
     */
    public async getMyChannelData(token: string, params?: string | Record<string, string> | undefined) {
        const myChannelDataFetchParams = new YoutubeAPIFetchParams("channel", token);
        myChannelDataFetchParams.mine = "true";

        const fetchParams: ServiceFetchParams = { ...myChannelDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const myChannelData = await this.fetchYoutubeAPI(youtubeChannelsAPI, params || fetchParams);

        return myChannelData as Schema$ChannelListResponse | Error$OAuthError | Schema$Response;
    }

    /**
     * Gets list of playlist items from given playlist id
     *
     * @param token Youtube OAuth Access Token
     * @param id Youtube playlist id
     * @param params Youtube API fetch parameters
     * @returns Promise< PlaylistItemList Data | Error >: Schema$PlaylistItemListResponse | Schema$Response | Error$OAuthError;
     * @fetchURL https://www.googleapis.com/youtube/v3/playlistItems?access_token=${token}&part=id%2CcontentDetails%2Csnippet%2Cstatus&playlistId=${playlistId}
     */
    public async getMyPlaylistItemsData(token: string, id: string, params?: string | Record<string, string> | undefined) {
        const playlistDataFetchParams = new YoutubeAPIFetchParams("playlistItems", token);
        playlistDataFetchParams.mine = "true";
        playlistDataFetchParams.playlistId = id;
        playlistDataFetchParams.maxResults = "15";

        const fetchParams: ServiceFetchParams = { ...playlistDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const playlistData = await this.fetchYoutubeAPI(youtubePlaylistItemsAPI, params || fetchParams);

        return playlistData as Schema$PlaylistItemListResponse | Error$OAuthError | Schema$Response;
    }

    /**
     * Gets list of playlists for the current token owner
     *
     * @param token Youtube OAuth access token
     * @param limit Youtube playlist items limit
     * @param params Youtube API fetch parameters
     * @returns Promise< PlaylistsList Data | Error >: Schema$PlaylistListResponse | Schema$Response | Error$OAuthError;
     * @fetchURL https://www.googleapis.com/youtube/v3/playlists?access_token=${token}&part=contentDetails%2Cid%2Clocalizations%2Cplayer%2Csnippet%2Cstatus&mine=true
     */
    public async getMyPlaylistsData(token: string, limit?: string, params?: string | Record<string, string> | undefined) {
        const playlistDataFetchParams = new YoutubeAPIFetchParams("playlist", token);
        playlistDataFetchParams.mine = "true";
        playlistDataFetchParams.maxResults = limit || "15";

        const fetchParams: ServiceFetchParams = { ...playlistDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const myPlaylistsData = await this.fetchYoutubeAPI(youtubePlaylistsAPI, params || fetchParams);

        return myPlaylistsData as Schema$PlaylistListResponse | Error$OAuthError | Schema$Response;
    }

    /**
     * Gets subscriptions data for the current token owner
     *
     * @param token Youtube OAuth access token
     * @param order Sort order. Either "relevance", "alphabetical" or "unread"
     * @param params Youtube API fetch parameters
     * @returns Promise< PlaylistsList Data | Error >: Schema$PlaylistListResponse | Schema$Response | Error$OAuthError;
     * @fetchURL https://www.googleapis.com/youtube/v3/subscriptions?access_token=${token}&part=id%2CcontentDetails%2Csnippet%2CsubscriperSnippet&mine=true&maxResults=50&order={order}
     */
    public async getMySubscriptionsData(token: string, order: "relevance" | "unread" | "alphabetical" = "relevance", params?: string | Record<string, string> | undefined) {
        const mySubscriptionsDataFetchParams = new YoutubeAPIFetchParams("subscriptions", token);
        mySubscriptionsDataFetchParams.mine = "true";
        mySubscriptionsDataFetchParams.maxResults = "50";
        mySubscriptionsDataFetchParams.order = order || "relevance";

        const fetchParams: ServiceFetchParams = { ...mySubscriptionsDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const subscriptionsData = await this.fetchYoutubeAPI(youtubeSubscriptionsAPI, params || fetchParams);

        return subscriptionsData as Schema$PlaylistListResponse | Error$OAuthError | Schema$Response;
    }

    /**
     * Fetches the google apis youtube endoint with given params
     *
     * @param api Youtube API endpoint
     * @param searchParams URL search parameters
     * @returns Promise< YoutubeAPI Response | Error >
     */
    private async fetchYoutubeAPI(api: URL$ChannelsAPI | URL$PlaylistItemsAPI | URL$PlaylistsAPI | URL$SubscriptionsAPI, searchParams?: string | undefined | Record<string, string>) {
        try {
            const youtubeAPIData = await fetch(`${api}?${searchParams ? this.generateURLSearchParams(searchParams) : ""}`);
            const youtubeAPIDataJSON = (await youtubeAPIData.json()) as
                | Schema$ChannelListResponse
                | Schema$PlaylistItemListResponse
                | Schema$PlaylistListResponse
                | Schema$SubscriptionListResponse
                | Schema$Response
                | Error$OAuthError;

            if (("error" in youtubeAPIDataJSON) as unknown as Error$OAuthError) {
                throw new OAuthError(youtubeAPIDataJSON as Error$OAuthError);
            }

            return youtubeAPIDataJSON;
        } catch (error) {
            const ERR_MESSAGE = SERVICE_OAUTH_ERROR_CATCHER(error, "FETCH_YTAPI");

            return error instanceof OAuthError ? ({ ...error } as Error$OAuthError) : ({ error: { code: 0, message: ERR_MESSAGE }, message: ERR_MESSAGE } as Error$OAuthError);
        }
    }

    /**
     * Generates url search params for youtube api fetch
     *
     * @param params Params to be converted to url search params
     * @returns URLSearchParams: string
     */
    private generateURLSearchParams(params: string | undefined | Record<string, string>) {
        // For multiple ids, id={id1},id={id2},...id={idn}
        if (typeof params === "object" && "id" in params && params.id) {
            const idParams = params.id
                .split(",")
                // .map((id) => `id=${id}`)
                // .join("&")
                .join("%2C");

            const newParams: Record<string, string> = { ...params, id: "" };
            delete newParams.id;

            return new URLSearchParams(newParams).toString() + `&id=${idParams}`;
        }

        return new URLSearchParams(params).toString();
    }

    /**
     * Get Youtube profile schema from current token channel data and playlist/playlist items response.
     *
     * @param token Youtube OAuth access token
     * @returns Promise< Schema$Profile | Error >
     */
    public async getMyYoutubeProfileData(token: string) {
        try {
            // Get channel data from the given token
            const myChannelData = (await this.getMyChannelData(token)) as Schema$ChannelListResponse;
            if ("error" in myChannelData) {
                throw new OAuthError(myChannelData as unknown as Error$OAuthError);
            }

            // Store the first result of the channel data items to a profile variable
            const profile: Schema$ChannelListItem | undefined = myChannelData.items && myChannelData?.items.length > 0 ? myChannelData?.items[0] : undefined;
            if (profile === undefined) throw new OAuthError("No channel found for this profile.", "NOCHANNEL");

            // Fetch uploads playlist data from current profile upload playlist id
            const myChannelUploadsData = (await this.getMyPlaylistItemsData(token, profile.contentDetails.relatedPlaylists?.uploads || "")) as Schema$PlaylistItemListResponse;
            if ("error" in myChannelUploadsData) {
                throw new OAuthError(myChannelUploadsData as unknown as Error$OAuthError);
            }

            // Fetches liked playlist items data from fixed id "LL"
            const myChannelLikedData = (await this.getMyPlaylistItemsData(token, "LL")) as Schema$PlaylistItemListResponse;
            if ("error" in myChannelLikedData) {
                throw new OAuthError(myChannelLikedData as unknown as Error$OAuthError);
            }

            // Fetches lists of playlist of the current token owner
            const myChannelPlaylistsData = (await this.getMyPlaylistsData(token)) as Schema$PlaylistListResponse;
            if ("error" in myChannelPlaylistsData) {
                throw new OAuthError(myChannelPlaylistsData as unknown as Error$OAuthError);
            }

            // Return Schema$Profile data
            const myYoutubeProfile: Schema$Profile = {
                id: profile?.id || "",
                title: profile?.snippet?.title || "",
                description: profile?.snippet?.description || "",
                thumbnail: profile?.snippet?.thumbnails.maxres?.url || profile?.snippet?.thumbnails.high?.url || profile?.snippet?.thumbnails.default?.url || "",
                banner: profile?.brandingSettings?.image?.bannerExternalUrl || "",
                meta: {
                    id: profile?.id || "",
                    publishedAt: profile?.snippet?.publishedAt || "",
                    country: profile?.snippet?.country || "",
                    status: {
                        privacyStatus: profile?.status?.privacyStatus || "",
                        longUploadsStatus: profile?.status?.longUploadsStatus || "",
                        madeForKids: profile?.status?.madeForKids || false,
                        isLinked: profile?.status?.isLinked || false
                    }
                },
                tags: {
                    keywords: profile?.brandingSettings.channel.keywords?.match(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+/g) || [],
                    topics: profile?.topicDetails?.topicCategories || []
                },
                statistics: {
                    subscribers: Number(profile?.statistics?.subscriberCount || 0),
                    views: Number(profile?.statistics?.viewCount || 0),
                    likes: Number(myChannelLikedData.pageInfo?.totalResults || 0),
                    playlists: Number(myChannelPlaylistsData.pageInfo?.totalResults || 0),
                    videos: Number(profile?.statistics?.videoCount || 0),
                    lastUpload: myChannelUploadsData.items[0]?.snippet?.publishedAt || "No uploads"
                },
                uploads: constructProfileList(myChannelUploadsData),
                likes: constructProfileList(myChannelLikedData),
                playlist: constructProfileList(myChannelPlaylistsData)
            };

            return myYoutubeProfile;
        } catch (error) {
            const ERR_MESSAGE = SERVICE_OAUTH_ERROR_CATCHER(error, "GET_MYYTPROFILE");

            return error instanceof OAuthError ? (error as Error$OAuthError) : ({ error: { code: 0, message: ERR_MESSAGE }, message: ERR_MESSAGE } as Error$OAuthError);
        }
    }

    /**
     * Get current token owner youtube subscriptions
     *
     * @param token Youtube OAuth access token
     * @param order Subscription list order; by relevance, alphabetical or unread
     * @param pageToken Reference page token for pagination
     * @param params Youtube API fetch parameters
     * @returns < Schema$Subscriptions | Error > - Can return Schema$Subscriptions with no values.
     */
    public async getMyYoutubeSubscriptions(
        token: string,
        order: string | "relevance" | "unread" | "alphabetical" = "relevance",
        pageToken = "",
        params?: Record<string, string> | undefined
    ): Promise<Schema$Subscriptions> {
        const mySubscriptionsDataFetchParams = new YoutubeAPIFetchParams("subscriptions", token);
        mySubscriptionsDataFetchParams.mine = "true";
        mySubscriptionsDataFetchParams.maxResults = "50";
        mySubscriptionsDataFetchParams.order = order || "relevance";
        mySubscriptionsDataFetchParams.pageToken = pageToken;

        const fetchParams: ServiceFetchParams = { ...mySubscriptionsDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
            if (pageToken === "" && key === "pageToken") {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const subscriptionsData = (await this.fetchYoutubeAPI(youtubeSubscriptionsAPI, params || fetchParams)) as Schema$SubscriptionListResponse;
        const ids = subscriptionsData?.items?.map((subData) => subData.snippet?.resourceId?.channelId || "") || [];
        const idsJoined = ids?.join(",");
        const channelsData = (await this.getChannelData(token, idsJoined)) as Schema$ChannelListResponse;
        const subsItems =
            subscriptionsData?.items?.map((subsData) => ({
                ...subsData,
                channel: channelsData?.items?.find((channel) => channel.id === subsData.snippet.resourceId?.channelId)
            })) || [];

        const topics = channelsData?.items?.reduce((prev: any[] | never[], curr) => {
            const topicsMap =
                curr.topicDetails?.topicIds?.map((topicId, topicIdx) => ({
                    id: topicId,
                    link: curr.topicDetails?.topicCategories[topicIdx]
                })) || [];

            return Array.from(new Map([...prev, ...topicsMap].map((item: { id: string }) => [item?.id, item])).values());
        }, []);

        const subscriptions: Schema$Subscriptions = {
            nextPageToken: subscriptionsData.nextPageToken || "",
            prevPageToken: subscriptionsData.prevPageToken || "",
            subscriptions: subsItems,
            subscriptionsCount: subsItems.length,
            topics
        };

        if (!pageToken && !pageToken.length) {
            if (subscriptionsData.nextPageToken === undefined || !subscriptionsData.nextPageToken) return subscriptions;
            const subscriptionsExtendedDataParams = { ...fetchParams, pageToken: subscriptionsData.nextPageToken };
            Object.keys(subscriptionsExtendedDataParams).forEach((key: string) => {
                if (subscriptionsExtendedDataParams[key as keyof ServiceFetchParams] === undefined) {
                    delete subscriptionsExtendedDataParams[key as keyof ServiceFetchParams];
                }
            });
            const subscriptionsExtendedData = (await this.fetchYoutubeAPI(youtubeSubscriptionsAPI, subscriptionsExtendedDataParams)) as Schema$SubscriptionListResponse;
            const idsExt = subscriptionsExtendedData?.items?.map((subData) => subData.snippet?.resourceId?.channelId || "");
            const idsExtJoined = idsExt?.join(",");
            const channelsExtData = (await this.getChannelData(token, idsExtJoined)) as Schema$ChannelListResponse;
            const subsExtItems =
                subscriptionsExtendedData?.items?.map((subsExtData) => ({
                    ...subsExtData,
                    channel: channelsExtData.items.find((channel) => channel.id === subsExtData.snippet.resourceId?.channelId)
                })) || [];

            const topicsExt = channelsExtData?.items?.reduce(
                (prev: any[] | never[], curr) => {
                    const topicsExtMap =
                        curr.topicDetails?.topicIds.map((topicId, topicIdx) => ({
                            id: topicId,
                            link: curr.topicDetails?.topicCategories[topicIdx]
                        })) || [];

                    return Array.from(new Map([...prev, ...topicsExtMap].map((item: { id: string }) => [item?.id, item])).values());
                },
                [...topics]
            );

            const extSubscriptions: Schema$Subscriptions = {
                nextPageToken: subscriptionsExtendedData.nextPageToken || "",
                prevPageToken: subscriptionsData.prevPageToken || "",
                subscriptions: [...subsItems, ...subsExtItems],
                subscriptionsCount: subsItems.length + subsExtItems.length,
                topics: topicsExt
            };

            return extSubscriptions;
        }

        return subscriptions;
    }

    /**
     * Get channel data from given channel id
     *
     * @param token Youtube OAuth access token
     * @param id Youtube channel id
     * @param params Youtube API fetch parameters
     * @returns Promise< Channel Data | Error >: Schema$ChannelListResponse | Schema$Response | Error$OAuthError;
     */
    public async getChannelData(token: string, id: string, params?: Record<string, string>) {
        const channelDataFetchParams = new YoutubeAPIFetchParams("channel", token);
        channelDataFetchParams.maxResults = "50";
        channelDataFetchParams.id = id;

        const fetchParams: ServiceFetchParams = { ...channelDataFetchParams };
        Object.keys(fetchParams).forEach((key: string) => {
            if (fetchParams[key as keyof ServiceFetchParams] === undefined) {
                delete fetchParams[key as keyof ServiceFetchParams];
            }
        });

        const channelData = await this.fetchYoutubeAPI(youtubeChannelsAPI, params || fetchParams);

        return channelData as Schema$ChannelListResponse | Error$OAuthError | Schema$Response;
    }

    /**
     * Uses puppeteer to query Youtube page from browser to fetch youtube suggestions.
     * Do not call this service through REST methods unless puppeteer service is clustered.
     *
     * @returns Promise< { page: string; content: content; richContents: richContents } >
     */
    public async getYoutubeExploreData() {
        try {
            const browser = await puppeteer.launch({ defaultViewport: null, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
            const page = await browser.newPage();
            await page.goto("https://youtube.com", {
                waitUntil: "domcontentloaded",
                timeout: 10000
            });
            const pageTitle = await page.title();
            await page.waitForSelector("#contents");
            await page.waitForSelector("#overlays span");
            await page.evaluate(() => {
                document?.scrollingElement?.scrollBy(0, 200000);
            });

            // PAGE EVAL for Youtube DOM structure pattern as of 08/16/2022
            // div#primary
            //   ytd-rich-grid-renderer
            //     div#contents.ytd-rich-grid-renderer
            //        ytd-rich-grid-row or ytd-rich-section-renderer
            //          div#contents.ytd-rich-grid-row
            //            ytd-rich-item-renderer[items-per-row="3"]
            //              div#content.ytd-rich-item-renderer
            //                ytd-rich-grid-media > div#dismissible
            //                   ytd-thumbnail > a#thumbnail
            //                   div#details
            //                     a#avatar-link
            //                     div#meta
            //                       h3.ytd-rich-grid-media > a#video-title-link
            //                       ytd-video-meta-block
            //                         div#metadata
            //                           div#byline-container | ytd-badge-supported-renderer > ytd-channel-name > div#container > div#text-container > yt-formatted-string > a.yt-formatted-string
            //                         div#metadata-line > spans
            const contentsList = await page.$$eval("#contents > ytd-rich-item-renderer.ytd-rich-grid-row", (contents) => {
                const contentMap = Array.from(contents).map((element, idx) => {
                    const videoTitleLink = element.querySelector<HTMLAnchorElement>("a#video-title-link");
                    const videoTitle = videoTitleLink?.querySelector<HTMLElement>("yt-formatted-string#video-title");
                    const link = element.querySelector<HTMLAnchorElement>("a#thumbnail");
                    const durationOverlay = link?.querySelector<HTMLSpanElement>("#overlays span");
                    const details = element.querySelector<HTMLElement>("#details");
                    const channelAvatarLink = details?.querySelector<HTMLAnchorElement>("a#avatar-link");
                    const channelAvatar = channelAvatarLink?.querySelector<HTMLImageElement>("img#img");
                    const channelDetailsTitle = details?.querySelector<HTMLAnchorElement>("#meta #metadata ytd-channel-name yt-formatted-string#text a.yt-formatted-string");
                    const channelDetailsIsVerified = details?.querySelector<HTMLElement>(`#details #meta #metadata ytd-channel-name svg`);
                    const channelDetailsSpans = details?.querySelectorAll<HTMLSpanElement>("#meta #metadata #metadata-line span") || [];
                    const spanArray = Array.from(channelDetailsSpans);
                    const YOUTUBE_REGEX = /(^(https?):\/\/([\w.]+|[en]).youtube.com\/watch\?v=)/g;
                    const id: string = link?.href.replace(YOUTUBE_REGEX, "") || "";
                    const timeDuration = durationOverlay?.innerText.trim() || durationOverlay?.innerHTML.trim() || "";

                    return {
                        title: videoTitle?.innerText || videoTitleLink?.title,
                        label: videoTitleLink?.ariaLabel || videoTitle?.ariaLabel,
                        link: link?.href || videoTitleLink?.href,
                        index: idx,
                        id,
                        duration: {
                            label: durationOverlay?.ariaLabel || "",
                            timeDuration
                        },
                        details: {
                            channel: {
                                title: channelAvatarLink?.title || channelDetailsTitle?.innerText,
                                avatar: channelAvatar?.src,
                                link: channelAvatarLink?.href || channelDetailsTitle?.href
                            },
                            views: (spanArray.length > 0 && (spanArray[0]?.innerText || spanArray[0]?.innerHTML)) || "",
                            upload: (spanArray.length > 0 && (spanArray[1]?.innerText || spanArray[1]?.innerHTML)) || "live",
                            isVerified: !channelDetailsIsVerified ? false : true
                        },
                        thumbnail: {
                            url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                            alt: `http://img.youtube.com/vi/${id}/0.jpg`,
                            formats: ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "default.jpg", "hqdefault.jpg", "mqdefault.jpg", "sddefault.jpg", "maxresdefault.jpg"]
                        }
                    };
                });

                return Array.from(contentMap);
            });

            const richContents = await page.$$eval("#contents > ytd-rich-section-renderer", (contents) => {
                const richContentsArray = Array.from(contents).map((content) => {
                    const shelfHeader = content.querySelector<HTMLDivElement>("ytd-rich-shelf-renderer #rich-shelf-header");
                    const shelfContents = content.querySelectorAll<HTMLDivElement>("ytd-rich-shelf-renderer #contents > ytd-rich-item-renderer");
                    const richContentType = shelfHeader?.querySelector<HTMLSpanElement>("#title-text span#title");

                    let type: string;

                    if (richContentType?.innerText.trim().toLowerCase() === "shorts") {
                        type = "shorts";
                    } else if (richContentType?.innerText.trim().toLowerCase() === "trending") {
                        type = "trending";
                    } else {
                        type = richContentType?.innerText.trim().toLowerCase() || "";
                    }

                    const shelfContentsArray = Array.from(shelfContents).map((shelfContent, idx) => {
                        const shelfContentThumbnail = shelfContent.querySelector<HTMLAnchorElement>("a#thumbnail");
                        const shelfContentThumbnailImage = shelfContent.querySelector<HTMLImageElement>("img#img");
                        const shelfContentChannelAvatar = shelfContent.querySelector<HTMLAnchorElement>("#details a#avatar-link");
                        const shelfContentTitle = shelfContent.querySelector<HTMLAnchorElement>("#details #meta a#video-title-link");
                        const shelfContentShortsTitle = shelfContent.querySelector<HTMLAnchorElement>("#details a.yt-simple-endpoint");
                        const shelfContentShortsSpan = shelfContentShortsTitle?.querySelector<HTMLAnchorElement>("span#video-title");
                        const shelfContentTitleString = shelfContentTitle?.querySelector<HTMLElement>("yt-formatted-string");
                        const shelfContentChannel = shelfContent.querySelector<HTMLAnchorElement>("#details #meta #metadata ytd-channel-name #container a.yt-formatted-string");
                        const shelfContentChannelAvatarImg = shelfContentChannelAvatar?.querySelector<HTMLImageElement>("img#img");
                        const channelDetailsIsVerified = shelfContent?.querySelector<HTMLElement>("#details #meta #metadata ytd-channel-name svg");
                        const channelDetailsSpans = shelfContent?.querySelectorAll<HTMLSpanElement>("#meta #metadata #metadata-line span") || [];
                        const shortDetailsSpan = shelfContent?.querySelector<HTMLSpanElement>("#metadata #metadata-line span");
                        const spanArray = Array.from(channelDetailsSpans);
                        const thumbnail = shelfContentThumbnail?.href || "";
                        const YOUTUBE_SHORTS_REGEX = /(^(https?):\/\/([\w.]+|[en]).youtube.com\/shorts\/)/g;
                        const YOUTUBE_REGEX = /(^(https?):\/\/([\w.]+|[en]).youtube.com\/watch\?v=)/g;
                        const id = thumbnail.replace(YOUTUBE_REGEX, "").replace(YOUTUBE_SHORTS_REGEX, "");
                        const durationOverlay = shelfContentThumbnail?.querySelector<HTMLSpanElement>("#overlays span");
                        const timeDuration = durationOverlay?.innerText.trim() || durationOverlay?.innerHTML.trim() || "";

                        return {
                            title: shelfContentTitle?.title || shelfContentTitleString?.innerText || shelfContentShortsTitle?.title || shelfContentShortsSpan?.innerText,
                            label: shelfContentTitle?.ariaLabel || shelfContentTitleString?.ariaLabel || shelfContentShortsTitle?.ariaLabel,
                            index: idx,
                            link: thumbnail || shelfContentTitle?.href,
                            id,
                            thumbnail: {
                                url: shelfContentThumbnailImage?.src || `https://i.ytimg.com/vi/${id}/hq720_2.jpg` || "",
                                alt: `https://i.ytimg.com/vi/${id}/hq720_2.jpg` || "",
                                formats: ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "hq720_2.jpg", "default.jpg", "hqdefault.jpg", "mqdefault.jpg", "sddefault.jpg", "maxresdefault.jpg"]
                            },
                            duration: {
                                label: type === "shorts" ? "shorts" : durationOverlay?.ariaLabel || "",
                                timeDuration: type === "shorts" ? "shorts" : timeDuration
                            },
                            details: {
                                channel: {
                                    title: shelfContentChannelAvatar?.title || shelfContentChannel?.innerText,
                                    avatar: shelfContentChannelAvatarImg?.src,
                                    link: shelfContentChannelAvatar?.href || shelfContentChannel?.href
                                },
                                views: (spanArray.length > 0 && (spanArray[0]?.innerText || spanArray[0]?.innerHTML)) || shortDetailsSpan?.innerText || "",
                                upload: type === "shorts" ? "shorts" : (spanArray.length > 0 && (spanArray[1]?.innerText || spanArray[1]?.innerHTML)) || "live",
                                isVerified: type === "shorts" ? "shorts" : !channelDetailsIsVerified ? false : true
                            }
                        };
                    });

                    return { type, contents: shelfContentsArray };
                });

                return richContentsArray;
            });

            await browser.close();

            return { page: pageTitle, contents: contentsList, richContents: richContents.filter((rc) => rc.type !== "" || rc.contents.length > 0) };
        } catch (err) {
            return { page: "Youtube", contents: [], richContents: [] };
        }
    }
}

export default DataService;
