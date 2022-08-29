const COUNT_ABBRS = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

export const metrix = (value: number, abbr = true) => {
    const i = 0 === value ? value : Math.floor(Math.log(value) / Math.log(1000));
    const result = Math.floor(parseFloat((value / Math.pow(1000, i)).toString()) * 100) / 100;

    if (abbr) {
        return `${result}${COUNT_ABBRS[i] || ""}`;
    }

    return result;
};

export default metrix;
