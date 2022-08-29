import logger from "jet-logger";

import "@server/config";
import app from "@server/app";

import youtubePuppetTask from "./tasks/youtubePuppet";

const port = process.env.PORT || 5000;

app.listen(port, () => {
    youtubePuppetTask();
    logger.info(`Express server started on port: ${port}`);
});
