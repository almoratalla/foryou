import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "@/styles/components/modules/Header.module.scss";
import { useAppDispatch, useGetAuthURI, useGetProfileData } from "@/store/hooks";
import { setPreference, getColorPreference, getAccessToken } from "@/utils";
import { toggleSideNav } from "@/store/reducers/activeUISlice";

import Dropdown from "./Dropdown";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useGetProfileData(getAccessToken());
    const { url } = useGetAuthURI();

    useEffect(() => {
        setPreference(getColorPreference().split("-")[0] || "device");
    }, []);

    return (
        <header className={styles["fy-head"]}>
            <div className={styles["fy-head-start"]}>
                <button className={styles["fy-head__side-menu-btn"]} onClick={() => dispatch(toggleSideNav())}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className={styles["menu-icon"]}>
                        <g>
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                        </g>
                    </svg>
                </button>
                <div className={styles["logo-container"]}>
                    <Link to="/" className={styles["logo-container__anchor"]}>
                        {/* TODO: LOGO SVG and attach equiv classname */}
                        <svg version="1.1" id="prefix__Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1145.53 385.89" xmlSpace="preserve">
                            <text transform="translate(539.908 327.759)">
                                <tspan x="0" y="0" className="prefix__st1 prefix__st2 prefix__st3" letterSpacing="-66">
                                    Y
                                </tspan>
                                <tspan x="170.4" y="0" className="prefix__st1 prefix__st2 prefix__st3" letterSpacing="-24">
                                    o
                                </tspan>
                                <tspan x="361.19" y="0" className="prefix__st1 prefix__st2 prefix__st3">
                                    u
                                </tspan>
                            </text>
                            <text transform="translate(434.012 327.759)" className="prefix__st1 prefix__st2 prefix__st3">
                                r
                            </text>
                            <path opacity=".03" d="M299.59 171.97l84.96 39.93-11.12 5.38z" />
                            <path
                                d="M332.57 99.86c-62.14 0-112.5 50.36-112.5 112.5s50.36 112.5 112.5 112.5 112.5-50.36 112.5-112.5-50.36-112.5-112.5-112.5zm51.98 112.04l-84.51 40.85-.45-80.78 84.96 39.93z"
                                fill="#f00000"
                            />
                            <path fill="#fff" d="M300.04 252.75l-.06.03-.45-80.84.06.03z" />
                            <path opacity=".5" fill="#3b001a" d="M300.04 252.75l84.51-40.85-84.96-39.93-.06-9.84 95.33 44.81-94.82 45.84z" />
                            <path
                                d="M445.07 212.36c0 62.14-50.36 112.5-112.5 112.5s-112.5-50.36-112.5-112.5c0-61.16 48.8-110.93 109.59-112.46-58.74 1.54-105.89 49.64-105.89 108.77 0 60.08 48.72 108.8 108.8 108.8s108.8-48.72 108.8-108.8c0-59.12-47.15-107.23-105.89-108.77 60.79 1.53 109.59 51.3 109.59 112.46z"
                                opacity=".11"
                                fill="#3b001a"
                            />
                            <text transform="translate(29.23 327.759)" className="prefix__st1 prefix__st2 prefix__st3" letterSpacing="-16">
                                F
                            </text>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className={styles["fy-head-end"]}>
                <Dropdown
                    id={("id" in data && data.id) || ""}
                    title={("title" in data && data.title) || ""}
                    thumbnail={("thumbnail" in data && data.thumbnail) || ""}
                    authURI={url}
                    error={("error" in data && (data as Error$OAuthError)) || null}
                />
            </div>
        </header>
    );
};

export default Header;
