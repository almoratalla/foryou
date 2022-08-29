import { FC, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

import styles from "@/styles/components/modules/SideNav.module.scss";
import overlayStyles from "@/styles/components/modules/Overlay.module.scss";
import ytLogo from "@resources/assets/brandings/youtube/youtube_social_icon_red.png";
import { useAppSelector } from "@/store/hooks";
import { selectActiveUI } from "@/store/reducers/activeUISlice";
import { selectProfileData, selectProfileDataStatus } from "@/store/reducers/profileDataSlice";
import SkeletonElement from "@/components/Skeletons/SkeletonElement";
import ForYouBrand from "@resources/assets/foryou-brand.svg";

import NavOverlay from "../Overlays/NavOverlay";

const SideNav: FC = () => {
    const [searchParams, _setSearchParams] = useSearchParams();
    const activeUI = useAppSelector(selectActiveUI);
    const profileData = useAppSelector(selectProfileData);
    const profileDataStatus = useAppSelector(selectProfileDataStatus);
    const [toggleNavOverlay, setToggleNavOverlay] = useState(false);
    const mainRef = useRef(null);

    return (
        <aside className={styles[activeUI.isSideNavActive ? "fy-sidebar--open" : "fy-sidebar"]}>
            {"id" in profileData && profileData?.thumbnail && (
                <div className={styles["fy-sidebar__top-nav-drawer"]}>
                    <a href="/" className={styles["top-nav-drawer__channel-logo"]}>
                        {profileDataStatus === "pending" || profileDataStatus === undefined ? <SkeletonElement type="avatar" /> : <img src={profileData.thumbnail} alt="" />}
                    </a>
                    {/* TODO: Group descriptions into div then apply wrapping for conditional texts */}
                    <h2 className={`${String(styles["hidden-sidebar"])} ${String(styles["your-channel"])}`}>Youtube Account</h2>
                    <p className={`${String(styles["hidden-sidebar"])} ${String(styles["channel-name"])}`}>{profileData.title}</p>
                </div>
            )}
            <div className={styles["fy-sidebar__mid-nav-drawer"]}>
                <nav className={styles["mid-nav-drawer__nav"]}>
                    <ul className={styles["nav__sidebar-list"]}>
                        {/* TODO: Make list item a component */}
                        <li className={styles["sidebar-list__item"]}>
                            <NavLink
                                to={searchParams.get("demo") === "true" ? "/?demo=true" : ""}
                                className={(navprops) => (navprops.isActive ? styles["item__link--active"] : styles.item__link) || ""}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                    <path d="M217 20c26.6 0 52.4 5.21 76.68 15.47 23.46 9.92 44.53 24.13 62.62 42.23 18.1 18.1 32.3 39.17 42.23 62.62C408.79 164.6 414 190.4 414 217c0 51.53-19.76 100.26-55.65 137.22-21.34 21.98-47.83 38.89-76.6 48.89C261.01 410.34 239.22 414 217 414s-44.01-3.66-64.76-10.89c-32.3-11.23-61.3-30.88-83.88-56.83C37.18 310.48 20 264.56 20 217c0-26.6 5.21-52.4 15.47-76.68C45.39 116.87 59.6 95.8 77.7 77.7c18.1-18.1 39.17-32.3 62.62-42.23C164.6 25.21 190.4 20 217 20m0-20C97.15 0 0 97.15 0 217c0 54.5 20.09 104.31 53.28 142.42 24.56 28.22 56.31 50.03 92.39 62.58 22.34 7.78 46.34 12 71.33 12s48.99-4.22 71.33-12c32.27-11.22 61.07-29.85 84.37-53.85C410.64 329.08 434 275.76 434 217 434 97.15 336.85 0 217 0z" />
                                    <path
                                        fill="#FFF"
                                        d="M217 194.38c-37.22 0-67.5-30.28-67.5-67.5s30.28-67.5 67.5-67.5 67.5 30.28 67.5 67.5-30.28 67.5-67.5 67.5zm-10.87-91.69c-6.39 0-11.58 5.2-11.58 11.58v24.44c0 6.39 5.2 11.59 11.59 11.59 2.01 0 4.01-.54 5.77-1.56l21.16-12.22c3.62-2.09 5.79-5.83 5.79-10.02 0-4.19-2.16-7.94-5.79-10.04l-21.17-12.21a11.485 11.485 0 00-5.77-1.56z"
                                    />
                                    <path d="M217 64.38c34.46 0 62.5 28.04 62.5 62.5s-28.04 62.5-62.5 62.5-62.5-28.04-62.5-62.5 28.04-62.5 62.5-62.5m-10.86 90.92c2.88 0 5.74-.77 8.28-2.23l21.15-12.22c5.19-2.99 8.29-8.35 8.3-14.35.01-6-3.09-11.37-8.29-14.38l-21.15-12.2c-2.53-1.47-5.4-2.24-8.3-2.24-9.14 0-16.58 7.44-16.58 16.59v24.44c0 9.15 7.44 16.59 16.59 16.59M217 54.38c-40.04 0-72.5 32.46-72.5 72.5s32.46 72.5 72.5 72.5 72.5-32.46 72.5-72.5-32.46-72.5-72.5-72.5zm-10.86 90.92c-3.44 0-6.59-2.75-6.59-6.59v-24.44c0-3.84 3.15-6.58 6.58-6.59 1.1 0 2.22.28 3.29.9l21.16 12.21c4.39 2.54 4.39 8.87 0 11.4l-21.16 12.22c-1.06.61-2.18.89-3.28.89z" />
                                    <path
                                        fill="#FFF"
                                        className={styles["sidebar-list__item-svg--stroke"]}
                                        stroke="#000"
                                        strokeWidth="20"
                                        strokeMiterlimit="10"
                                        d="M358.97 355.7c-7.13-155.2-61.61-138.14-142.1-138.14-80.47 0-134.44-17.15-141.69 137.98-.14 2.98-.27 6.09-.39 9.27 21.33 23.42 48.05 41.58 78.13 52.35 20.07 7.2 41.63 11.1 64.09 11.1s44.02-3.9 64.09-11.1c28.99-10.38 54.87-27.61 75.8-49.81.83-.88 1.65-1.78 2.47-2.68-.13-2.94-.26-5.92-.4-8.97z"
                                    />
                                </svg>
                                {/* <svg preserveAspectRatio="xMidYMid meet" focusable="false" viewBox="3 3 18 18">
                                    <g>
                                        <path d="M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z"></path>{" "}
                                    </g>
                                </svg> */}
                                <span>Your Channel</span>
                            </NavLink>
                        </li>
                        <li className={styles["sidebar-list__item"]}>
                            <NavLink
                                to={searchParams.get("demo") === "true" ? "/subscriptions?demo=true" : "/subscriptions"}
                                className={(navprops) => (navprops.isActive ? styles["item__link--active"] : styles.item__link) || ""}
                            >
                                {/* <img src={subscriptions} alt="" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                    <g fill="none" className={styles["sidebar-list__item-svg--stroke"]} stroke="#606060" strokeWidth="20" strokeMiterlimit="10">
                                        <path d="M297.77 424.09H137.79c-13.34 0-24.15-10.75-24.15-29.68V28.26c0-7.6 10.81-18.35 24.15-18.35h159.98c13.34 0 24.15 10.75 24.15 24.02v366.15c0 13.26-10.81 24.01-24.15 24.01z" />
                                        <path d="M358.8 29.42h-38.87C317.81 18.31 308 9.91 296.21 9.91H136.23c-11.79 0-21.6 8.4-23.72 19.51H75.2c-13.34 0-24.15 10.75-24.15 24.02v324.1c0 13.26 10.81 24.02 24.15 24.02h36.93c.77 12.57 11.27 22.53 24.1 22.53h159.98c12.84 0 24.94-9.96 25.71-22.53h36.88c13.34 0 24.15-10.75 24.15-24.02V53.44c0-13.26-10.81-24.02-24.15-24.02z" />
                                        <path d="M408.37 63.4h-25.42v-9.96c0-13.26-10.81-24.02-24.15-24.02h-37.31c-2.12-11.11-11.93-19.51-23.72-19.51H137.79c-11.79 0-21.6 8.4-23.72 19.51H75.2c-13.34 0-24.15 10.75-24.15 24.02v9.96H25.63c-8.79 0-15.92 7.87-15.92 17.57v267.91c0 9.7 7.13 17.57 15.41 21.72h25.92v6.95c0 13.26 10.81 24.02 24.15 24.02h36.88c.77 12.57 12.87 22.53 25.71 22.53h159.98c12.84 0 23.33-9.96 24.1-22.53h36.93c13.34 0 24.15-10.75 24.15-24.02v-6.95h25.92c8.29-4.14 15.41-12.01 15.41-21.72V80.97c.02-9.7-7.11-17.57-15.9-17.57z" />
                                    </g>
                                    <path className={styles["sidebar-list__item-svg--fill"]} fill="#606060" d="M276.37 217l-106.22-61.33v122.66z" />
                                </svg>
                                <span>Subscriptions</span>
                            </NavLink>
                        </li>
                        <li className={styles["sidebar-list__item"]}>
                            <NavLink to="/explore" className={(navprops) => (navprops.isActive ? styles["item__link--active"] : styles.item__link) || ""}>
                                {/* <img src={explore} alt="expl-icon" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                    <circle fill="none" className={styles["sidebar-list__item-svg--stroke"]} stroke="#606060" strokeWidth="20" strokeMiterlimit="10" cx="217.18" cy="217" r="206.94" />
                                    <path
                                        fill="none"
                                        className={styles["sidebar-list__item-svg--stroke"]}
                                        stroke="#606060"
                                        strokeWidth="20"
                                        strokeMiterlimit="10"
                                        d="M279.6 295.26l-176.29 35.43 35.43-176.29c1.59-7.9 7.76-14.08 15.67-15.67L330.7 103.3l-35.44 176.3a19.968 19.968 0 01-15.66 15.66z"
                                    />
                                    <path
                                        className={styles["sidebar-list__item-svg--fill"]}
                                        fill="#606060"
                                        d="M235.53 210.2l-28.5-17.17c-5.29-3.19-12.03.62-12.03 6.8v34.33c0 6.18 6.74 9.99 12.03 6.8l28.5-17.17c5.12-3.08 5.12-10.5 0-13.59z"
                                    />
                                </svg>
                                <span>Explore</span>
                            </NavLink>
                        </li>
                        <li className={styles["sidebar-list__item"]}>
                            <NavLink
                                to={searchParams.get("demo") === "true" ? "/playlists?demo=true" : "/playlists"}
                                className={(navprops) => (navprops.isActive ? styles["item__link--active"] : styles.item__link) || ""}
                            >
                                {/* <img src={playlist} alt="expl-icon" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                    <path
                                        fill="none"
                                        className={styles["sidebar-list__item-svg--stroke"]}
                                        stroke="#606060"
                                        strokeWidth="20"
                                        strokeMiterlimit="10"
                                        d="M392.1 85.1H194.2c-10.8 0-19.5-10-19.5-22.3V34.3c0-14.4-4.9-26-11-26H63c-6.1 0-11 11.6-11 26V336.5c0 25.2 15 45.6 33.6 45.6h306.5c18.6 0 33.6-20.4 33.6-45.6V130.7c0-25.2-15-45.6-33.6-45.6z"
                                    />
                                    <path
                                        className={styles["sidebar-list__item-svg--stroke"]}
                                        fill="none"
                                        stroke="#606060"
                                        strokeWidth="20"
                                        strokeMiterlimit="10"
                                        d="M295.9 182.3l-81.1-49.7c-6.2-3.8-14 .7-14 7.9v99.3c0 7.3 7.9 11.7 14 7.9l81.1-49.7c5.9-3.5 5.9-12.1 0-15.7z"
                                    />
                                    <g className={styles["sidebar-list__item-svg--stroke"]} fill="none" stroke="#606060" strokeWidth="20" strokeMiterlimit="10">
                                        <path d="M119.5 295.1h33.2M179.4 295.1h169.9M119.5 328.2h166.7M316.1 328.2h33.2" />
                                    </g>
                                    <path
                                        className={styles["sidebar-list__item-svg--stroke"]}
                                        fill="none"
                                        stroke="#606060"
                                        strokeWidth="20"
                                        strokeMiterlimit="10"
                                        d="M9.9 68.4v354.9M-.1 424.7h350.9"
                                    />
                                </svg>
                                <span>Playlists</span>
                            </NavLink>
                        </li>
                        {createPortal(
                            <CSSTransition
                                in={toggleNavOverlay}
                                classNames={{
                                    enter: overlayStyles["fy-nav-overlay-enter"],
                                    enterActive: overlayStyles["fy-nav-overlay-enter-active"],
                                    exit: overlayStyles["fy-nav-overlay-exit"],
                                    exitActive: overlayStyles["fy-nav-overlay-exit-active"]
                                }}
                                nodeRef={mainRef}
                                timeout={800}
                                appear={toggleNavOverlay}
                                mountOnEnter
                                unmountOnExit
                            >
                                <div ref={mainRef} className={overlayStyles["fy-nav-overlay"]}>
                                    {toggleNavOverlay && (
                                        <NavOverlay
                                            toggleNavOverlay={toggleNavOverlay}
                                            setToggleNavOverlay={setToggleNavOverlay}
                                            title={("title" in (profileData as Schema$Profile) && (profileData as Schema$Profile).title) || ""}
                                            id={("id" in (profileData as Schema$Profile) && (profileData as Schema$Profile).id) || ""}
                                        />
                                    )}
                                </div>
                            </CSSTransition>,
                            document.getElementById("overlay-root") as HTMLElement
                        )}

                        <li id={styles["list__item--foryou"]} className={styles["sidebar-list__item"]} onClick={() => setToggleNavOverlay(true)}>
                            <div className={styles.item__link}>
                                <ForYouBrand />
                                <span>ForYou</span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles["fy-sidebar__bottom-nav-drawer"]}>
                <hr className={styles["fy-nav-divider"]} />
                <nav className={styles["bottom-nav-drawer__nav"]}>
                    <ul className={styles["nav__sidebar-list"]}>
                        {/* TODO: Make list item a component */}
                        <li className={styles["sidebar-list__item"]}>
                            <a href="https://youtube.com" className={styles.item__link}>
                                <img src={ytLogo as string} alt="" />
                                {activeUI.isSideNavActive && <span>Youtube</span>}
                            </a>
                        </li>
                        <li className={styles["sidebar-list__item"]}>
                            <a href="https://github.com/almoratalla/foryou" className={styles.item__link}>
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
                                {activeUI.isSideNavActive && <span>Github</span>}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SideNav;
