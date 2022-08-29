import { existsSync, mkdirSync, closeSync, openSync, createWriteStream } from "fs";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import logger from "jet-logger";
import StatusCodes from "http-status-codes";
import colors from "colors";
import compression from "compression";
import expressStatusMonitor from "express-status-monitor";

import router from "@api/routes";

import ServerError from "./utils/classes/ServerError";
import { staticDir, viewsDir, origin, logsPath } from "./config";

const app = express();
if (!existsSync(logsPath)) {
    mkdirSync(logsPath, { recursive: true });
    closeSync(openSync(`${logsPath}/access.log`, "a"));
}
const accessLogStream = createWriteStream(`${logsPath}/access.log`, { flags: "a" });
const { BAD_REQUEST } = StatusCodes;
colors.enable();

logger.info(`App is in ${process.env.NODE_ENV || ""} mode`);

// App setup
app.set("json spaces", 4);
app.set("views", viewsDir);
app.set("trust proxy", 1);

// Middlewares
app.use(expressStatusMonitor());
app.use(express.static(staticDir));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors(origin));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", origin.origin === false ? "http://localhost:5000" : "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
    next();
});

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives: {
                "img-src": ["'self'", "https: data: blob:"]
            }
        })
    );
    app.use(morgan("combined", { stream: accessLogStream }));
}

// Add api router
app.use(router);

// Setup Error handling
app.use((err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    logger.err(err, true);
    // console.error(err);

    return res.status(BAD_REQUEST).json({
        error: err.message || "Something went wrong",
        type: err?.type || "GENERAL_ERROR",
        isError: true
    });
});

// Serve index.html file
app.get("*", (_req: Request, res: Response) => {
    res.sendFile("index.html", { root: viewsDir });
});

export default app;
