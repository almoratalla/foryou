import { Router } from "express";

import * as ytDataController from "@api/controllers/youtubeData";
const router = Router();

// Paths
export const route = {
    mine: "/mine",
    myplaylists: "/mine/playlists",
    mylikedvideosplaylist: "/mine/playlists/liked",
    myuploadsplaylist: "/mine/playlists/uploads",
    myprofiledata: "/mine/profile",
    mysubscriptions: "/mine/subscriptions",
    explore: "/explore"
} as const;

router.get(route.mine, ytDataController.getMyYoutubeData);
router.get(route.myplaylists, ytDataController.getMyYoutubePlaylistsData);
router.get(route.mylikedvideosplaylist, ytDataController.getMyYoutubeLikedVideosPlaylistData);
router.get(route.myuploadsplaylist, ytDataController.getMyUploadsPlaylistData);
router.get(route.myprofiledata, ytDataController.getMyYoutubeProfileData);
router.get(route.mysubscriptions, ytDataController.getMyYoutubeSubscriptions);
router.get(route.explore, ytDataController.getYoutubeExploreData);

export default router;
