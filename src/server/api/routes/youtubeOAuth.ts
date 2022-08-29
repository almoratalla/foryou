import { Router } from "express";

import * as ytOAuthController from "@api/controllers/youtubeOAuth";
const router = Router();

// Paths
export const route = {
    login: "/login",
    callback: "/callback",
    refreshToken: "/refresh_token"
} as const;

router.get(route.login, ytOAuthController.authClient);
router.get(route.callback, ytOAuthController.authCallBack);
router.get(route.refreshToken, ytOAuthController.authRefresh);

export default router;
