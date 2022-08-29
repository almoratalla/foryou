/* eslint-disable no-extend-native */
const LongMonthName = Array.from(Array(11).keys()).map((key) => new Date(0, key).toLocaleString("en", { month: "long" }));
const ShortMonthName = Array.from(Array(11).keys()).map((key) => new Date(0, key).toLocaleString("en", { month: "short" }));
// const LongDayName = Array.from(Array(6).keys()).map((key) => new Date(0, key).toLocaleString("en", { weekday: "long" }));
const ShortDayName = Array.from(Array(6).keys()).map((key) => new Date(0, key).toLocaleString("en", { weekday: "short" }));

export const prefix = function (this: string, pre: string) {
    return pre + this;
};

export const capitalize = function (this: string) {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

export const saneDateFormat = function (this: string | number | Date, format = "sane") {
    const d = new Date(this);
    const fmonth = d.getMonth();
    const fdate = d.getDate();
    const fday = d.getDay();
    const fyear = d.getFullYear();
    const ftimeStandard = d.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }).toLowerCase();
    const monthIndex = fmonth < 12 ? fmonth : fmonth - 12;
    const dayIndex = fday < 7 ? fday : fday - 7;
    const shortMonth = ShortMonthName[monthIndex];
    const longMonth = LongMonthName[monthIndex];
    // const longDay = LongDayName[dayIndex];
    const shortDay = ShortDayName[dayIndex];
    const monthYearRegex = /^m[\s-][Yy](?:(?:[eE][aA][rR])$|[rR]$)/;

    switch (format) {
        case "M":
            return longMonth;
        case "m":
            return shortMonth;
        // Required "m", pattern "year" or "yr" case insensitive. e.g. "m year" | "m-YR"
        case format.match(monthYearRegex)?.input || format.match(/^m[\s-][Yy]$/)?.input:
            return `${shortMonth || ""} ${fyear}`;
        case "m/d/y":
            return `${fmonth + 1 < 10 ? "0" : ""}${fmonth + 1}/${fmonth + 1 < 10 ? "0" : ""}${fmonth + 1}/${fyear.toString().slice(-2)}`;
        default:
            return `${ftimeStandard} ${shortDay || ""}, ${fdate} ${shortMonth || ""} ${fyear}`;
    }
};

String.prototype.prefix = prefix;
String.prototype.capitalize = capitalize;
String.prototype.saneDateFormat = saneDateFormat;
