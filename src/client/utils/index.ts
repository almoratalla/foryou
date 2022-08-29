import "./extensions/string.extensions";
import * as constants from "./constants/dataSchemes";
import * as oauth from "./oauth";
import * as theme from "./theme";

const { errorProfileScheme, profileScheme } = constants;
const { token, getAccessToken, logout } = oauth;
const { themeStorageKey, setPreference, reflectPreference, getColorPreference } = theme;

export const trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
};

export const utils = {
    ...constants,
    ...oauth,
    ...theme
};

const COUNT_ABBRS = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

export const metrix = (value: number, abbr = true) => {
    const i = 0 === value ? value : Math.floor(Math.log(value) / Math.log(1000));
    const result = Math.floor(parseFloat((value / Math.pow(1000, i)).toString()) * 100) / 100;

    if (abbr) {
        return `${result}${COUNT_ABBRS[i] || ""}`;
    }

    return result;
};

export { errorProfileScheme, profileScheme, token, getAccessToken, logout, themeStorageKey, setPreference, reflectPreference, getColorPreference };

export default utils;
