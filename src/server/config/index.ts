import path from "path";

import dotenv from "dotenv";
import commandLineArgs, { CommandLineOptions } from "command-line-args";
import logger from "jet-logger";

const options: CommandLineOptions = commandLineArgs([
    {
        name: "env",
        alias: "e",
        defaultValue: "development",
        type: String
    }
]);

const result = dotenv.config({
    path: path.join(__dirname, `env/${process.env.NODE_ENV || (options.env as string)}.env`)
});

dotenv.config({ path: path.join(__dirname, "../../../.env") });

export const isProduction = process.env.NODE_ENV === "production";
export const STATIC_HOST = `${process.env.PROTOCOL || "http"}://${process.env.HOST || "localhost"}:${isProduction ? "5000" : "3000"}`;
export const REDIRECT_HOST = (!isProduction && STATIC_HOST) || "";
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const buildPath = path.join(__dirname, "../../../dist/client");
export const staticDir = isProduction ? buildPath : path.join(__dirname, "../public");
export const viewsDir = isProduction ? buildPath : path.join(__dirname, "../views");
export const origin = { origin: isProduction ? false : "*" };
export const logsPath = path.join(__dirname, "./logs");

if (result.error) {
    logger.warn(result.error);
}

export default result;
