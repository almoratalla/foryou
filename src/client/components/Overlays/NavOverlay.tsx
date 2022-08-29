import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import styles from "@/styles/components/modules/Overlay.module.scss";
import { logout, trans, themeStorageKey, setPreference } from "@/utils";
import ytLogoLight from "@resources/assets/brandings/youtube/developed-with-youtube-sentence-case-light.png";
import ytLogoDark from "@resources/assets/brandings/youtube/developed-with-youtube-sentence-case-dark.png";
import ForYouBrand from "@resources/assets/foryou-brand.svg";

const ThemeSwitchSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434" className={styles["fy-nav-overlay__link-item--left"]}>
            <path
                stroke="#000"
                strokeMiterlimit="10"
                d="M216.3 100c-9.7 0-19 1.2-28 3.4-.1 0-.2.1-.3.1-1.6.4-3.1.8-4.6 1.3-.1 0-.2.1-.3.1-4.8 1.4-9.4 3.1-13.9 5.1-.1.1-.2.1-.3.1-1.4.6-2.9 1.3-4.3 2-.1 0-.2.1-.3.2-4.4 2.2-8.6 4.6-12.6 7.2-.1.1-.2.1-.3.2-1.3.8-2.5 1.7-3.8 2.6l-.3.3c-1.3.9-2.5 1.9-3.7 2.8l-.1.1c-2.5 2-4.9 4.1-7.2 6.2l-.3.3c-1.1 1-2.2 2.1-3.2 3.2-.1.1-.2.3-.4.4-1.1 1.1-2.1 2.2-3.1 3.3l-.2.2c-1.1 1.2-2.1 2.4-3.1 3.6 0 0 0 0 0 0-1 1.2-1.9 2.4-2.9 3.6-.1.1-.2.3-.3.4-.9 1.2-1.8 2.4-2.6 3.6-.1.2-.2.3-.4.5-.9 1.2-1.7 2.5-2.5 3.7-.1.1-.1.2-.2.3-.8 1.3-1.6 2.6-2.4 4 0 0 0 .1-.1.1-.8 1.3-1.5 2.7-2.2 4l-.3.6c-.7 1.3-1.3 2.6-1.9 4-.1.2-.2.4-.3.7-.6 1.3-1.2 2.7-1.8 4.1-.1.2-.1.3-.2.5-.6 1.4-1.1 2.8-1.7 4.3v.1c-.5 1.4-1 2.9-1.5 4.4-.1.2-.1.4-.2.6-.4 1.4-.9 2.8-1.3 4.3-.1.3-.1.5-.2.8-.4 1.4-.7 2.9-1.1 4.3 0 .2-.1.4-.1.6-.3 1.5-.6 3-.9 4.6v.1c-.3 1.5-.5 3.1-.7 4.7 0 .2-.1.5-.1.7-.2 1.5-.4 3-.5 4.5 0 .3 0 .6-.1.8-.1 1.5-.2 3-.3 4.6v.7c-.1 1.6-.1 3.2-.1 4.9 0 64.9 52.6 117.5 117.5 117.5h4.2c.7 0 1.4 0 2.1-.1.4 0 .8-.1 1.2-.1.6 0 1.3-.1 1.9-.1.4 0 .9-.1 1.3-.1.6-.1 1.2-.1 1.8-.2.4-.1.9-.1 1.3-.2.6-.1 1.2-.1 1.8-.2.4-.1.9-.1 1.3-.2l1.8-.3c.4-.1.9-.1 1.3-.2l1.8-.3 1.2-.2c.6-.1 1.2-.2 1.8-.4l1.2-.3c.6-.1 1.3-.3 1.9-.5.4-.1.7-.2 1.1-.3l2.1-.6c.3-.1.5-.1.8-.2 2-.6 3.9-1.2 5.9-1.8.1 0 .2-.1.3-.1.9-.3 1.7-.6 2.5-.9.2-.1.5-.2.7-.3.7-.3 1.4-.5 2.1-.8.3-.1.6-.2.8-.3.7-.3 1.3-.5 2-.8.3-.1.6-.3.9-.4.6-.3 1.3-.6 1.9-.8.3-.1.6-.3.9-.4.6-.3 1.2-.6 1.9-.9.3-.1.6-.3.9-.4.6-.3 1.2-.6 1.9-1 .3-.1.5-.3.8-.4.6-.3 1.3-.7 1.9-1.1.2-.1.5-.3.7-.4.7-.4 1.4-.8 2-1.2.2-.1.4-.2.5-.3.8-.5 1.6-1 2.3-1.4.1 0 .1-.1.2-.1 3.4-2.2 6.7-4.6 9.9-7.1.1-.1.2-.1.3-.2.7-.6 1.4-1.1 2-1.7.1-.1.3-.2.4-.3.6-.5 1.3-1.1 1.9-1.6l.4-.4c.6-.5 1.2-1.1 1.8-1.6l.4-.4c.6-.6 1.2-1.1 1.8-1.7l.4-.4 1.8-1.8.3-.3c.6-.6 1.2-1.3 1.8-1.9l.2-.2c19.2-20.9 31-48.8 31-79.5-.2-65.3-52.8-117.9-117.7-117.9zm54.3 196.6c-59.7-5.6-106.5-55.8-106.5-117 0-17.2 3.7-33.6 10.4-48.4 12.6-6.1 26.8-9.6 41.8-9.6 53 0 95.9 42.9 95.9 95.9 0 32.8-16.4 61.8-41.6 79.1z"
            />
            <circle cx="265.4" cy="177.5" r="25.8" />
            <circle fill="none" stroke="#000" strokeMiterlimit="10" cx="265.4" cy="177.5" r="25.8" />
            <circle cx="246.9" cy="234.3" r="25.8" />
            <circle fill="none" stroke="#000" strokeMiterlimit="10" cx="246.9" cy="234.3" r="25.8" />
            <g>
                <circle cx="209.6" cy="169.4" r="25.8" />
                <circle fill="none" stroke="#000" strokeMiterlimit="10" cx="209.6" cy="169.4" r="25.8" />
            </g>
            <g stroke="#000" strokeMiterlimit="10">
                <path d="M216.8 82.8h-3.1c-7.6 0-13.8-6.2-13.8-13.8V14.3c0-7.6 6.2-13.8 13.8-13.8h3.1c7.6 0 13.8 6.2 13.8 13.8V69c-.1 7.6-6.2 13.8-13.8 13.8zM215.6 434.5h-3.1c-7.6 0-13.8-6.2-13.8-13.8V366c0-7.6 6.2-13.8 13.8-13.8h3.1c7.6 0 13.8 6.2 13.8 13.8v54.7c0 7.7-6.2 13.8-13.8 13.8zM351.1 218.2v-3.1c0-7.6 6.2-13.8 13.8-13.8h54.7c7.6 0 13.8 6.2 13.8 13.8v3.1c0 7.6-6.2 13.8-13.8 13.8h-54.7c-7.6-.1-13.8-6.2-13.8-13.8zM-.7 217.3v-3.1c0-7.6 6.2-13.8 13.8-13.8h54.7c7.6 0 13.8 6.2 13.8 13.8v3.1c0 7.6-6.2 13.8-13.8 13.8H13.1C5.5 231-.7 224.9-.7 217.3z" />
            </g>
            <g stroke="#000" strokeMiterlimit="10">
                <path d="M117.1 116.2l-2.2 2.2c-5.7 5.7-14.9 5.7-20.6 0L53.5 77.7c-5.7-5.7-5.7-14.9 0-20.6l2.2-2.2c5.7-5.7 14.9-5.7 20.6 0L117 95.6c5.8 5.7 5.8 14.9.1 20.6zM378.7 379.5l-2.2 2.2c-5.7 5.7-14.9 5.7-20.6 0L315.1 341c-5.7-5.7-5.7-14.9 0-20.6l2.2-2.2c5.7-5.7 14.9-5.7 20.6 0l40.7 40.7c5.8 5.7 5.8 14.9.1 20.6zM318.3 116.9l-2.2-2.2c-5.7-5.7-5.7-14.9 0-20.6l40.7-40.7c5.7-5.7 14.9-5.7 20.6 0l2.2 2.2c5.7 5.7 5.7 14.9 0 20.6L339 116.9c-5.7 5.7-15 5.7-20.7 0zM55.2 378.7l-2.2-2.2c-5.7-5.7-5.7-14.9 0-20.6l40.7-40.7c5.7-5.7 14.9-5.7 20.6 0l2.2 2.2c5.7 5.7 5.7 14.9 0 20.6l-40.7 40.7c-5.7 5.7-14.9 5.7-20.6 0z" />
            </g>
        </svg>
    );
};

const LogoutSVG = () => {
    return (
        <button className={styles["fy-nav-overlay__link-item--left"]} onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.971 384.971">
                <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
            </svg>
        </button>
    );
};

const NavOverlay: FC<{ toggleNavOverlay: boolean; setToggleNavOverlay: React.Dispatch<React.SetStateAction<boolean>>; title?: string; id?: string }> = ({
    toggleNavOverlay,
    setToggleNavOverlay,
    title,
    id
}) => {
    const [selectedTheme, setSelectedTheme] = useState<string>("light-theme");
    const [searchParams, _setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedTheme(localStorage.getItem(themeStorageKey) || "light-theme");
    }, []);

    const themeToggleClickHandler = (): void => {
        let pref;
        if (selectedTheme === "light-theme") {
            trans();
            pref = "dark";
        } else if (selectedTheme === "dark-theme") {
            trans();
            pref = "device";
        } else {
            trans();
            pref = "light";
        }

        setPreference(pref);
        setSelectedTheme(`${pref}-theme` || "device-theme");
    };

    if (!toggleNavOverlay) return null;

    return (
        <div className={styles["fy-nav-overlay-container"]}>
            <ul>
                <li>
                    <a className={styles["fy-nav-overlay__list-item-link--title"]} href={`https://www.youtube.com/channel/${id || ""}`} style={{ textDecoration: "none" }}>
                        <span style={{ margin: "unset", fontWeight: "600", fontSize: "1.2rem" }}>{title}</span>
                    </a>
                </li>
                <li onClick={() => (searchParams.get("demo") ? navigate(location.pathname) : navigate(`${location.pathname}?demo=true`))}>
                    <ForYouBrand style={{ minWidth: "30px", width: "30px" }} />
                    <span>Demo {searchParams.get("demo") === "true" ? "On" : "Off"}</span>
                </li>
                <li onClick={() => themeToggleClickHandler()}>
                    <ThemeSwitchSVG />
                    <span>{selectedTheme?.split("-")[0]?.capitalize()} Theme</span>
                </li>
                {id && (
                    <li onClick={logout}>
                        <LogoutSVG />
                        <span>Logout</span>
                    </li>
                )}

                <li onClick={() => setToggleNavOverlay(false)}>
                    <button className={styles["fy-nav-overlay__link-item--left"]}>
                        <div></div>
                    </button>
                    <span>Close</span>
                </li>
                <hr />
            </ul>
            <ul className={styles["fy-nav-overlay-credit-list"]}>
                <li style={{ margin: "0" }}>
                    <a href="https://youtube.com" className={styles.item__link}>
                        {selectedTheme !== "device-theme" && <img src={selectedTheme === "light-theme" ? (ytLogoDark as string) : (ytLogoLight as string)} alt="" />}
                        {selectedTheme === "device-theme" && <img src={window.matchMedia("(prefers-color-scheme: dark)").matches ? (ytLogoLight as string) : (ytLogoDark as string)} alt="" />}
                    </a>
                </li>
                <li style={{ margin: "0" }}>
                    <a href="https://github.com/almoratalla/foryou" className={styles.item__link} style={{ background: "white" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.58 31.77">
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path
                                        className="cls-1"
                                        d="M16.29,0a16.29,16.29,0,0,0-5.15,31.75c.82.15,1.11-.36,1.11-.79s0-1.41,0-2.77C7.7,29.18,6.74,26,6.74,26a4.36,4.36,0,0,0-1.81-2.39c-1.47-1,.12-1,.12-1a3.43,3.43,0,0,1,2.49,1.68,3.48,3.48,0,0,0,4.74,1.36,3.46,3.46,0,0,1,1-2.18c-3.62-.41-7.42-1.81-7.42-8a6.3,6.3,0,0,1,1.67-4.37,5.94,5.94,0,0,1,.16-4.31s1.37-.44,4.48,1.67a15.41,15.41,0,0,1,8.16,0c3.11-2.11,4.47-1.67,4.47-1.67A5.91,5.91,0,0,1,25,11.07a6.3,6.3,0,0,1,1.67,4.37c0,6.26-3.81,7.63-7.44,8a3.85,3.85,0,0,1,1.11,3c0,2.18,0,3.94,0,4.47s.29.94,1.12.78A16.29,16.29,0,0,0,16.29,0Z"
                                    />
                                </g>
                            </g>
                        </svg>
                        <span>Github</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default NavOverlay;
