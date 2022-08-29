import { Router } from "express";

import ytOAuthRouter from "@api/routes/youtubeOAuth";
import ytDataRouter from "@api/routes/youtubeData";

const baseRouter = Router();

baseRouter.use("/auth", ytOAuthRouter);
baseRouter.use("/api/data", ytDataRouter);

export default baseRouter;
