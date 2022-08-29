import { Request, Response, NextFunction } from "express";

import { Schema$Profile, Error$OAuthError } from "@utils/customTypings/youtubeDataAPIType";
import YoutubeDataService from "@server/service/youtubeData";
import { OtherRichContents, YTDATA_CACHE, YT_DATA_CONTENTS } from "@server/tasks/youtubePuppet";
import ServerError from "@server/utils/classes/ServerError";

const YoutubeData = new YoutubeDataService();

/**
 * GET /api/data/mine - Get My Youtube Data Controller
 * Gets current token owner's channnel data
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine
 * @response OK: Schema$ChannelListResponse | Schema$Response | Error$OAuthError - BAD_RESPONSE: Error
 */
export const getMyYoutubeData = (req: Request<Record<string, unknown>, unknown, { token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";

        YoutubeData.getMyChannelData(token || "")
            .then((myChannelData) => {
                if (myChannelData instanceof Error || myChannelData instanceof ServerError) throw myChannelData;
                res.status(200).json(myChannelData);
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/mine/playlists - Get My Youtube Playlists Data
 * Gets current token owner's youtube playlists data
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine/playlists?limit
 * @response OK: Schema$PlaylistListResponse | Schema$Response | Error$OAuthError - BAD_RESPONSE: Error
 */
export const getMyYoutubePlaylistsData = (req: Request<Record<string, unknown>, unknown, { token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";
        const { limit } = req.query;

        YoutubeData.getMyPlaylistsData(token || "", limit && !isNaN(Number(limit)) ? limit?.toString() : "15")
            .then((myPlaylistsData) => {
                if (myPlaylistsData instanceof Error || myPlaylistsData instanceof ServerError) throw myPlaylistsData;
                res.status(200).json(myPlaylistsData);
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/mine/playlists/liked - Get My Youtube Liked Videos Playlist Data
 * Gets current token owners liked playlist items data
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine/playlists/liked
 * @response OK: Schema$PlaylistItemListResponse | Schema$Response | Error$OAuthError - BAD_RESPONSE: Error
 */
export const getMyYoutubeLikedVideosPlaylistData = (req: Request<Record<string, unknown>, unknown, { token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";

        YoutubeData.getMyPlaylistItemsData(token || "", "LL")
            .then((myLikedPlaylistItemsData) => {
                if (myLikedPlaylistItemsData instanceof Error || myLikedPlaylistItemsData instanceof ServerError) throw myLikedPlaylistItemsData;
                res.status(200).json(myLikedPlaylistItemsData);
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/mine/playlists/uploads - Get My Uploads Playlist Data
 * Gets current token owner's uploads playlist data
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine/playlists/uploads
 * @response OK: Schema$PlaylistItemListResponse | Schema$Response | Error$OAuthError - BAD_RESPONSE: Error
 */
export const getMyUploadsPlaylistData = (req: Request<Record<string, unknown>, unknown, { id: string; token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";

        let id = "";
        if ("id" in req.body) {
            id = req.body.id;
        }

        YoutubeData.getMyPlaylistItemsData(token || "", id)
            .then((myUploadsPlaylistsData) => {
                if (myUploadsPlaylistsData instanceof Error || myUploadsPlaylistsData instanceof ServerError) throw myUploadsPlaylistsData;
                res.status(200).json(myUploadsPlaylistsData);
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/mine/profile
 * Gets current token owner's profile data based on a profile schema
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine/profile
 * @response OK: Schema$PlaylistItemListResponse | Schema$Response | Error$OAuthError - BAD_RESPONSE: Error
 */
export const getMyYoutubeProfileData = (req: Request<Record<string, unknown>, unknown, { id: string; token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";

        YoutubeData.getMyYoutubeProfileData(token || "")
            .then((myYoutubeProfileData: Schema$Profile | Error$OAuthError) => {
                if (myYoutubeProfileData instanceof Error || myYoutubeProfileData instanceof ServerError) throw myYoutubeProfileData;
                res.status(200).json(myYoutubeProfileData);
            })
            .catch((err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/mine/subscriptions - Get My Youtube Subscriptions
 * Gets current token owner's youtube subscriptions data
 *
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/mine/subscriptions?sort={sort}&pageToken={pageToken}
 * @response OK: Schema$Subscriptions - BAD_RESPONSE: Error
 */
export const getMyYoutubeSubscriptions = (req: Request<Record<string, unknown>, unknown, { id: string; token: string }>, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers as { authorization: string };
        const token = !authorization || authorization === undefined ? req.body.token || "" : authorization?.split(" ")[1] || authorization || "";
        const { sort, pageToken } = req.query;

        YoutubeData.getMyYoutubeSubscriptions(token || "", sort?.toString(), pageToken?.toString())
            .then((myYoutubeSubscriptions) => {
                if (myYoutubeSubscriptions instanceof Error || myYoutubeSubscriptions instanceof ServerError) throw myYoutubeSubscriptions;
                res.status(200).json(myYoutubeSubscriptions);
            })
            .catch((err) => {
                throw err;
            });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/data/explore - Get Youtube Explore Data
 * Gets youtube explore feed suggestions from puppeteer youtube task
 *
 * @param _req Request
 * @param res Response
 * @param next Next Function
 * @method GET
 * @route /api/data/explore
 * @response OK: { page: string, content: content: richContents: richContent } - BAD_RESPONSE: Error
 */
export const getYoutubeExploreData = (_req: Request, res: Response, next: NextFunction) => {
    try {
        const YTDATA_EXPLORE_CONTENTS = "YTDATA_EXPLORE_CONTENTS";
        const YTDATA_EXPLORE_RICHCONTENTS_SHORTS = "YTDATA_EXPLORE_RICHCONTENTS_SHORTS";
        const YTDATA_EXPLORE_RICHCONTENTS_TRENDING = "YTDATA_EXPLORE_RICHCONTENTS_TRENDING";
        const YTDATA_EXPLORE_RICHCONTENTS_OTHERS = "YTDATA_EXPLORE_RICHCONTENTS_OTHERS";

        let ytec = YTDATA_CACHE.get(YTDATA_EXPLORE_CONTENTS) as YT_DATA_CONTENTS;
        let ytercs = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_SHORTS) as YT_DATA_CONTENTS;
        let yterct = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_TRENDING) as YT_DATA_CONTENTS;
        let yterco = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_OTHERS) as OtherRichContents;

        if (ytec === undefined) {
            ytec = [];
        }
        if (ytercs === undefined) {
            ytercs = [];
        }
        if (yterct === undefined) {
            yterct = [];
        }
        if (yterco === undefined) {
            yterco = [];
        }

        res.status(200).json({
            page: "Youtube",
            contents: ytec?.sort(() => Math.random() - 0.5),
            richContents: [
                { type: "shorts", contents: ytercs?.sort(() => Math.random() - 0.5) },
                { type: "trending", contents: yterct?.sort(() => Math.random() - 0.5) },
                ...yterco.map((m) => ({ type: m.type, content: m.contents?.sort(() => Math.random() - 0.5) }))
            ]
        });
    } catch (err) {
        next(err);
    }
};

export default getMyYoutubeData;
