import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FC, ReactElement, useState, useRef, ChangeEvent, MouseEvent, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import ForYouBrand from "@resources/assets/foryou-brand.svg";
import { logout, trans, themeStorageKey, setPreference } from "@/utils";
import styles from "@/styles/components/modules/Dropdown.module.scss";

const ThemeSwitchSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
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

const CaretSVG = () => {
    return (
        <svg viewBox="0 0 320 512">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" className=""></path>
        </svg>
    );
};

const LogoutSVG = () => {
    return (
        <button className={styles.foryou__signout} onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.971 384.971">
                <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
                <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
            </svg>
        </button>
    );
};

const BackSVG = () => {
    return (
        <svg width="52px" height="52px" style={{ transform: "scale(0.8)" }} viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
        </svg>
    );
};

const DropdownMenuMultiPartItem = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>("device-theme");

    useEffect(() => {
        setSelectedTheme(localStorage.getItem(themeStorageKey) || "device-theme");
    }, []);

    const isRadioChecked = (theme: string): boolean => selectedTheme === theme;
    const themeClickHandler = (e: MouseEvent<HTMLElement>): void => {
        let pref;
        if (e.currentTarget.dataset.theme === "dark-theme") {
            trans();
            pref = "dark";
        } else if (e.currentTarget.dataset.theme === "light-theme") {
            trans();
            pref = "light";
        } else {
            trans();
            pref = "device";
        }

        setPreference(pref);
        setSelectedTheme(e.currentTarget.dataset.theme || "device-theme");
    };
    const radioChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => setSelectedTheme(e.currentTarget.value);

    return (
        <div className={styles["fy-dd-menu-multipart-item"]}>
            <div className={styles["fy-dd-menu-multipart-item__head"]}>
                <span className={styles["fy-icon-button"]}>
                    <ThemeSwitchSVG />
                </span>
                <div className={styles["fy-dd-menu-multipart-item__head-context"]}>
                    <span className={styles["fy-dd-menu-multipart-item__head-context-heading"]}>Appearance</span>
                    <span className={styles["fy-dd-menu-multipart-item__head-context-subheading"]}>Choose your preferred color scheme</span>
                </div>
            </div>
            <div className={styles["fy-dd-menu-multipart-item__body"]}>
                <div className={styles["fy-dd-menu-multipart-item__body-option"]} onClick={(e) => themeClickHandler(e)} data-theme="device-theme">
                    <label htmlFor="device-theme-input">
                        <span className={styles["fy-dd-menu-multipart-item__body-option-label-context"]}>Device theme</span>
                    </label>
                    <input type="radio" name="fy-theme-switch" id="device-theme-input" value="device-theme" checked={isRadioChecked("device-theme")} onChange={radioChangeHandler}></input>
                </div>
                <div className={styles["fy-dd-menu-multipart-item__body-option"]} onClick={(e) => themeClickHandler(e)} data-theme="dark-theme">
                    <label htmlFor="dark-theme-input">
                        <span className={styles["fy-dd-menu-multipart-item__body-option-label-context"]}>Dark theme</span>
                    </label>
                    <input type="radio" name="fy-theme-switch" id="dark-theme-input" value="dark-theme" checked={isRadioChecked("dark-theme")} onChange={radioChangeHandler}></input>
                </div>
                <div className={styles["fy-dd-menu-multipart-item__body-option"]} onClick={(e) => themeClickHandler(e)} data-theme="light-theme">
                    <label htmlFor="light-theme-input">
                        <span className={styles["fy-dd-menu-multipart-item__body-option-label-context"]}>Light theme</span>
                    </label>
                    <input type="radio" name="fy-theme-switch" id="light-theme-input" value="light-theme" checked={isRadioChecked("light-theme")} onChange={radioChangeHandler}></input>
                </div>
            </div>
        </div>
    );
};

const DropdownMenu: FC<{ id: string; title: string; thumbnail: string; authURI?: string; error?: Error$OAuthError | null }> = ({ id, title, thumbnail, authURI, error }) => {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState<number | null>(null);
    const [searchParams, _setSearchParams] = useSearchParams();
    const location = useLocation();

    const dropDownRef = useRef(null);
    const mainNodeRef = useRef<HTMLDivElement>(null);
    const themeNodeRef = useRef<HTMLDivElement>(null);

    const calcHeightMain = () => {
        setMenuHeight(mainNodeRef.current && mainNodeRef.current.offsetHeight + 35);
    };
    const calcHeightTheme = () => {
        setMenuHeight(themeNodeRef.current && themeNodeRef.current.offsetHeight + 35);
    };

    const DropdownMenuItem: FC<{ leftIcon?: string | ReactElement; rightIcon?: string; goToMenu?: string; leftThumbnail?: string; back?: boolean }> = ({
        children,
        leftIcon,
        rightIcon,
        goToMenu,
        leftThumbnail,
        back
    }) => {
        if (back) {
            return (
                <div className={styles["fy-dd-menu-item--back"]}>
                    <span className={styles["fy-icon-button"]} style={leftThumbnail ? { padding: "0px" } : { padding: "5px" }} onClick={() => goToMenu && setActiveMenu(goToMenu)}>
                        {leftThumbnail ? <img className={styles["fy-icon-button-thumbnail--left"]} src={leftThumbnail} alt="" /> : leftIcon}
                    </span>
                    {children}
                    {rightIcon && <span className={styles["fy-icon-right"]}>{rightIcon}</span>}
                </div>
            );
        }

        return (
            <div className={styles["fy-dd-menu-item"]} onClick={() => goToMenu && setActiveMenu(goToMenu)}>
                <span className={styles["fy-icon-button"]} style={leftThumbnail ? { padding: "0px" } : { padding: "5px" }}>
                    {leftThumbnail ? <img className={styles["fy-icon-button-thumbnail--left"]} src={leftThumbnail} alt="" /> : leftIcon}
                </span>
                {children}
                {rightIcon && <span className={styles["fy-icon-right"]}>{rightIcon}</span>}
            </div>
        );
    };

    return (
        <div className={styles["fy-dd-menu-container"]} ref={dropDownRef} style={{ height: menuHeight ? menuHeight : "unset" }}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames={{
                    enter: styles["fy-dd-menu-primary-enter"],
                    enterActive: styles["fy-dd-menu-primary-enter-active"],
                    exit: styles["fy-dd-menu-primary-exit"],
                    exitActive: styles["fy-dd-menu-primary-exit-active"]
                }}
                onEnter={calcHeightMain}
                nodeRef={mainNodeRef}
            >
                <div className={styles["fy-dd-menu"]} ref={mainNodeRef}>
                    {(error?.error.status === "NOCHANNEL" || error?.message?.includes("No channel")) && (
                        <a href="https://support.google.com/youtube/answer/1646861" style={{ textDecoration: "none" }}>
                            <DropdownMenuItem leftIcon="" leftThumbnail={thumbnail} goToMenu="main">
                                <span className={styles["fy-dd-menu-item-option"]}>No channel found.</span>
                            </DropdownMenuItem>
                        </a>
                    )}
                    {!id && (error?.error.status !== "NOCHANNEL" || !error?.message?.includes("No channel")) && (
                        <a href={authURI} style={{ textDecoration: "none" }}>
                            <DropdownMenuItem leftIcon={<ForYouBrand />} leftThumbnail={""} goToMenu="main">
                                <span className={styles["fy-dd-menu-item-option"]}>SIGN IN</span>
                            </DropdownMenuItem>
                        </a>
                    )}
                    {id && (
                        <a href={`https://www.youtube.com/channel/${id}`} style={{ textDecoration: "none" }}>
                            <DropdownMenuItem leftIcon="" leftThumbnail={thumbnail} goToMenu="main">
                                <span className={styles["fy-dd-menu-item-option"]}>{title}</span>
                            </DropdownMenuItem>
                        </a>
                    )}
                    <Link to={searchParams.get("demo") === "true" ? location.pathname : "?demo=true"} style={{ textDecoration: "none" }}>
                        <DropdownMenuItem leftIcon={<ForYouBrand />} leftThumbnail={""} goToMenu="main">
                            <span className={styles["fy-dd-menu-item-option"]}>Demo {searchParams.get("demo") === "true" ? "On" : "Off"}</span>
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem leftIcon={<ThemeSwitchSVG />} goToMenu="theme">
                        <span className={styles["fy-dd-menu-item-option"]}>Display</span>
                    </DropdownMenuItem>
                    {(error?.error.status === "NOCHANNEL" || error?.message?.includes("No channel")) && !id && (
                        <DropdownMenuItem leftIcon={<LogoutSVG />}>
                            <span className={styles["fy-dd-menu-item-option"]} onClick={logout}>
                                Logout
                            </span>
                        </DropdownMenuItem>
                    )}
                    {id && (
                        <DropdownMenuItem leftIcon={<LogoutSVG />}>
                            <span className={styles["fy-dd-menu-item-option"]} onClick={logout}>
                                Logout
                            </span>
                        </DropdownMenuItem>
                    )}
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === "theme"}
                unmountOnExit
                timeout={500}
                classNames={{
                    enter: styles["fy-dd-menu-secondary-enter"],
                    enterActive: styles["fy-dd-menu-secondary-enter-active"],
                    exit: styles["fy-dd-menu-secondary-exit"],
                    exitActive: styles["fy-dd-menu-secondary-exit-active"]
                }}
                onEnter={calcHeightTheme}
                nodeRef={themeNodeRef}
            >
                <div className={styles["fy-dd-menu"]} ref={themeNodeRef}>
                    <DropdownMenuItem leftIcon={<BackSVG />} goToMenu="main" back>
                        <span className={styles["fy-dd-menu-item-option--back"]}>Display & accessibility</span>
                    </DropdownMenuItem>
                    <DropdownMenuMultiPartItem />
                </div>
            </CSSTransition>
        </div>
    );
};

const DropdownNavItem: FC<{ icon?: ReactElement }> = ({ icon, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className={styles["fy-dd-nav-list-item"]}>
            <button className={styles["fy-dd-button"]} onClick={() => setOpen(!open)}>
                {icon}
            </button>
            {open && children}
        </li>
    );
};

const Dropdown: FC<{ id: string; title: string; thumbnail: string; authURI?: string; error?: Error$OAuthError | null }> = ({ id, title, thumbnail, authURI, error }) => {
    return (
        <nav className={styles["fy-head-dd-nav"]}>
            <ul className={styles["fy-dd-nav-list"]}>
                <DropdownNavItem icon={<CaretSVG />}>
                    <DropdownMenu id={id} title={title} thumbnail={thumbnail} authURI={authURI} error={error} />
                </DropdownNavItem>
            </ul>
        </nav>
    );
};

export default Dropdown;
