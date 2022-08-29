export const themeStorageKey = "fy-theme-preference";

export const setPreference = (pref: string) => {
    localStorage.setItem(themeStorageKey, `${pref}-theme`);
    reflectPreference(pref);
};

export const reflectPreference = (pref: string) => {
    const dataThemeTuple: [string, string] = ["data-theme", "device"];
    if (pref === "device") {
        dataThemeTuple[1] = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
        dataThemeTuple[1] = pref;
    }
    document.documentElement.setAttribute(...dataThemeTuple);
};

export const getColorPreference = () => (localStorage.getItem(themeStorageKey) ? localStorage.getItem(themeStorageKey) || "device-theme" : "device-theme");
