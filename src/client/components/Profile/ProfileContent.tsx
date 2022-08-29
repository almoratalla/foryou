import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "@/styles/components/modules/ProfileContent.module.scss";
import SkeletonElement from "@/components/Skeletons/SkeletonElement";
import SkeletonChannelMetaDetails from "@/components/Skeletons/ChannelSkeletons/SkeletonChannelMetaDetails";
import SkeletonChannelDescription from "@/components/Skeletons/ChannelSkeletons/SkeletonChannelDescription";
import SkeletonChannelTags from "@/components/Skeletons/ChannelSkeletons/SkeletonChannelTags";
import SkeletonChannelVideosContainer from "@/components/Skeletons/ChannelSkeletons/SkeletonChannelVideosContainer";
import ForYouAvatarDemo from "@resources/assets/ForYou.png";
import ForYouBannerDemo from "@resources/assets/ForYouDemoBanner.png";

import MediaScroller from "./MediaScroller";
import MobileScroller from "./MobileScroller";
import VerticalScroller from "./VerticalScroller";

type items = {
    id: string;
    videoId?: string;
    title: string;
    thumbnail: string;
    ownerTitle: string;
    itemCount?: number;
};

type Schema$Profile = {
    id?: string;
    title: string;
    description?: string;
    thumbnail?: string;
    banner?: string;
    meta?: {
        id: string;
        publishedAt: string | number | Date;
        country: string;
        status: {
            privacyStatus: string;
            longUploadsStatus: string;
            madeForKids: string | boolean;
            isLinked: string | boolean;
        };
    };
    tags?: {
        topics: string[] | never[];
        keywords: string[] | never[];
    };
    statistics?: {
        subscribers: number | string;
        views: number | string;
        likes: number | string;
        playlists: number | string;
        videos: number | string;
        lastUpload: Date | string;
    };
    uploads: {
        totalResults: number;
        items: items[] | never[];
    };
    likes: {
        totalResults: number;
        items: items[] | never[];
    };
    playlist: {
        totalResults: number;
        items: items[] | never[];
    };
    error?: {
        code: number;
        errors: {
            message: string;
            domain: string;
            reason: string;
            location: string;
            locationType: string;
        }[];
        message: string;
        status: string;
    };
};

const LogoutSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.971 384.971">
            <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
            <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
        </svg>
    );
};

const ProfileContent: FC<{
    profileData?: Schema$Profile;
    isLoadingData: boolean;
    isDemo: boolean;
    isMediaLargeMobile?: boolean;
    isMediaSmallMobile?: boolean;
}> = ({ profileData, isLoadingData, isDemo, isMediaLargeMobile, isMediaSmallMobile }) => {
    return (
        <div className={styles["fy-channel-container"]}>
            {!isLoadingData && profileData && profileData.banner && (
                <div className={styles["fy-banner-container"]} role="banner">
                    <img src={isDemo ? (ForYouBannerDemo as string) : profileData && profileData.banner} alt="" />
                </div>
            )}
            <main className={styles["fy-channel-container__main-content"]}>
                <div className={styles["fy-channel-content-container"]}>
                    <div className={styles["fy-channel-avatar-container"]}>
                        {isLoadingData ? <SkeletonElement type="avatar" spec="fy-channel-avatar" /> : <img src={isDemo ? (ForYouAvatarDemo as string) : profileData?.thumbnail || ""} alt="" />}

                        <div className={styles["fy-channel-avatar__title"]}>
                            {isLoadingData ? <SkeletonElement type="title" /> : <h3>{profileData && profileData.title}</h3>}
                            {isLoadingData ? (
                                <SkeletonElement type="text" spec="fy-channel-text" />
                            ) : (
                                <p className={styles["fy-channel-title__sub-title"]}>
                                    <span>
                                        {(profileData && typeof profileData.statistics?.subscribers === "number"
                                            ? profileData.statistics?.subscribers.metrix()
                                            : Number(profileData?.statistics?.subscribers).metrix()) || 0}
                                    </span>{" "}
                                    subscriber{Number(profileData?.statistics?.subscribers) >= 0 && "s"}
                                </p>
                            )}
                            {isDemo && (
                                <Link to={"/"}>
                                    <LogoutSVG />
                                    <span>Quit demo</span>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={styles["fy-channel-meta-status-container"]}>
                        <div className={styles["meta-status-details-container"]}>
                            {isLoadingData ? (
                                <SkeletonChannelMetaDetails lines={4} spec="fy-channel-meta-details" />
                            ) : (
                                <Fragment>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Published at</h4>
                                        <span>{(profileData?.meta && profileData.meta.publishedAt.saneDateFormat()) || "Publish date not found"}</span>
                                    </div>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Channel ID</h4>
                                        <span>{profileData && (profileData?.meta?.id || profileData.id)}</span>
                                    </div>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Country</h4>
                                        <span>{(profileData && profileData?.meta?.country) || "N/A"}</span>
                                    </div>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Long Upload Status</h4>
                                        <span>{(profileData && profileData?.meta?.status?.longUploadsStatus.capitalize()) || "Unspecified"}</span>
                                    </div>
                                </Fragment>
                            )}
                        </div>

                        <div className={styles["meta-branding-details-container"]}>
                            {isLoadingData ? (
                                <SkeletonChannelMetaDetails lines={3} spec="fy-channel-meta-details" />
                            ) : (
                                <Fragment>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Channel Privacy</h4>
                                        <span>{(profileData && profileData?.meta?.status?.privacyStatus.capitalize()) || ""}</span>
                                    </div>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Made for Kids</h4>
                                        <span>{profileData?.meta?.status?.madeForKids ? "Yes" : "No"}</span>
                                    </div>
                                    <div className={styles["fy-channel-meta-status__meta-detail"]}>
                                        <h4>Linked</h4>
                                        <span>{profileData?.meta?.status?.isLinked ? "Yes" : "No"}</span>
                                    </div>{" "}
                                </Fragment>
                            )}
                        </div>
                    </div>

                    <div className={styles["fy-channel-meta-stats-container"]}>
                        <div className={styles["meta-stat-container"]}>
                            <svg className={styles["meta-stat__icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <path d="M217.1 67.9C121.6 68 35.7 126.2.8 214.8c46.9 119 181.8 177.5 301.3 130.8 60.2-23.5 107.8-70.9 131.5-130.8-35-88.6-120.9-146.8-216.5-146.9zm0 244.8c-54.3 0-98.4-43.8-98.4-97.9 0-54.1 44-97.9 98.4-97.9 54.3 0 98.4 43.8 98.4 97.9 0 54-44 97.8-98.4 97.9z" />
                                <g>
                                    <path d="M276.3 214.7l-96.2-46.1c10.1-8.2 23-13 37-13h.2c32.6 0 59 26.5 59 59.1zM276.3 214.7c0 32.8-26.5 59.3-59.2 59.3S158 247.5 158 214.8c0-18.6 8.6-35.2 22-46.1v92.1l96.3-46.1zM180.1 168.6s-.1 0-.1.1v-.1h.1z" />
                                </g>
                            </svg>
                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {(profileData?.statistics?.views?.toLocaleString() && profileData?.statistics?.views?.toLocaleString().length >= 20) || isMediaLargeMobile
                                            ? Number(profileData?.statistics?.views).metrix()
                                            : profileData?.statistics?.views?.toLocaleString() || 0}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Total Views</span>}
                            </div>
                        </div>
                        <div className={styles["meta-stat-container"]}>
                            <svg className={styles["meta-stat__icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <path d="M272.4 12.3L79.5 225.9l51.2-.1v-24.7l13.1-15.2L285.9 30.7c4.8-5.4 12.2-8.4 19.8-8.4 6.6 0 12.7 2.8 16 7.7 1.8 2.6 3.8 6.7 2.3 12l-38.6 126.5-10.1 33-.4 1.2H233l.3 22.8 60-.1L348.5 46c4.4-37.4-50.3-61.6-76.1-33.7z" />
                                <path d="M398.3 201.1H233.1l.3 24.5h137.9c15.8 0 28.6 12.8 28.6 28.7l-23.3 131.4c-2.4 13.8-14.4 23.8-28.3 23.8H190l.2.1-59.5 1.3V201.1H.4V434h368.9c17.7 0 32.8-12.7 35.9-30.1l29.5-166.5c-.1-20.1-16.3-36.3-36.4-36.3zm-293.9 24.8v185.5H26.7V225.9h77.7z" />
                                <path d="M328.7 322.7l-122.1-70.5v141.1z" />
                            </svg>
                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {((profileData?.likes?.totalResults && profileData?.likes?.totalResults.toLocaleString().length >= 20) || isMediaLargeMobile
                                            ? Number(profileData?.likes?.totalResults).metrix()
                                            : profileData?.likes?.totalResults.toLocaleString()) || 0}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Liked Videos</span>}
                            </div>
                        </div>
                        <div className={styles["meta-stat-container"]}>
                            <svg className={styles["meta-stat__icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <g>
                                    <path d="M138.7 197.1h.5c32.6 0 58.9-26.4 58.9-58.9s-26.4-58.9-58.9-58.9-58.9 26.4-58.9 58.9c-.2 32.4 26 58.8 58.4 58.9zm-35.8-65.5c1.3-11.1 7.2-20.9 15.7-27.3l64.4 32.2-64.5 32.2c-8.5-6.4-14.3-16.1-15.6-27.2v-9.9zM295.8 197.1h.5c32.6 0 58.9-26.4 58.9-58.9s-26.4-58.9-58.9-58.9-58.9 26.4-58.9 58.9c-.2 32.4 26 58.8 58.4 58.9zm-37.5-65.5c1.3-11.1 7.2-20.9 15.7-27.3l64.4 32.2-64.5 32.2c-8.5-6.4-14.3-16.1-15.6-27.2v-9.9zM139.2 236.3C93.4 236.3 1.7 259.2 1.7 305v49.1h274.9V305c.1-45.7-91.6-68.7-137.4-68.7zM296.3 236.3c-5.7.1-12.2.5-19.1 1.1 23.4 14.7 37.9 40.1 38.7 67.8v49.1h117.9v-49.2c0-45.8-91.7-68.8-137.5-68.8z" />
                                </g>
                            </svg>

                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {(profileData?.statistics?.subscribers?.toLocaleString() && profileData?.statistics?.subscribers.toLocaleString().length >= 20) || isMediaLargeMobile
                                            ? Number(profileData?.statistics?.subscribers).metrix()
                                            : profileData?.statistics?.subscribers.toLocaleString() || 0}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Subscribers</span>}
                            </div>
                        </div>
                        <div className={styles["meta-stat-container"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <path
                                    fill="none"
                                    className={styles["meta-stat__item-svg--stroke"]}
                                    stroke="#606060"
                                    strokeWidth="20"
                                    strokeMiterlimit="10"
                                    d="M392.1 85.1H194.2c-10.8 0-19.5-10-19.5-22.3V34.3c0-14.4-4.9-26-11-26H63c-6.1 0-11 11.6-11 26V336.5c0 25.2 15 45.6 33.6 45.6h306.5c18.6 0 33.6-20.4 33.6-45.6V130.7c0-25.2-15-45.6-33.6-45.6z"
                                />
                                <path
                                    className={styles["meta-stat__item-svg--stroke"]}
                                    fill="none"
                                    stroke="#606060"
                                    strokeWidth="20"
                                    strokeMiterlimit="10"
                                    d="M295.9 182.3l-81.1-49.7c-6.2-3.8-14 .7-14 7.9v99.3c0 7.3 7.9 11.7 14 7.9l81.1-49.7c5.9-3.5 5.9-12.1 0-15.7z"
                                />
                                <g className={styles["meta-stat__item-svg--stroke"]} fill="none" stroke="#606060" strokeWidth="20" strokeMiterlimit="10">
                                    <path d="M119.5 295.1h33.2M179.4 295.1h169.9M119.5 328.2h166.7M316.1 328.2h33.2" />
                                </g>
                                <path className={styles["meta-stat__item-svg--stroke"]} fill="none" stroke="#606060" strokeWidth="20" strokeMiterlimit="10" d="M9.9 68.4v354.9M-.1 424.7h350.9" />
                            </svg>
                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {(profileData?.playlist?.totalResults.toLocaleString() && profileData?.playlist?.totalResults.toLocaleString().length >= 20) || isMediaLargeMobile
                                            ? Number(profileData?.playlist?.totalResults).metrix()
                                            : profileData?.playlist?.totalResults.toLocaleString() || 0}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Playlists</span>}
                            </div>
                        </div>
                        <div className={styles["meta-stat-container"]}>
                            <svg className={styles["meta-stat__icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <g fill="#606060">
                                    <path d="M312.9 184.1c-1.4-11-11.3-18.9-22.3-17.9H22.8c-11.1-1-20.9 6.9-22.3 17.9v178.6c1.4 11 11.3 18.9 22.3 17.9h267.8c11.1 1 20.9-6.9 22.3-17.9v-62.5l89.3 71.4V175.2l-89.3 71.4v-62.5zM107.6 327.8V221.4l92.3 53.2-92.3 53.2z" />
                                    <path d="M343.2 179.7v-62.5c-1.4-11-11.3-18.9-22.3-17.9H53.1c-11.1-1-20.9 6.9-22.3 17.9V154h265.3c11.1-1 20.9 6.9 22.3 17.9v62.5l89.3-71.4v122l24.8 19.8V108.2l-89.3 71.5z" />
                                </g>
                            </svg>
                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {(profileData?.statistics?.videos.toLocaleString() && profileData?.statistics?.videos.toLocaleString().length >= 20) || isMediaLargeMobile
                                            ? Number(profileData?.statistics?.videos).metrix()
                                            : profileData?.statistics?.videos.toLocaleString() || 0}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Total Videos</span>}
                            </div>
                        </div>
                        <div className={styles["meta-stat-container"]}>
                            <svg className={styles["meta-stat__icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
                                <path
                                    fill="#606060"
                                    d="M361.5 173.4v-51.5c-1.1-9.1-9.2-15.6-18.2-14.7H125.2c-9-.8-17 5.7-18.2 14.7v90.3c42.6 2.7 78.1 32 89.8 71.5h146.5c9 .8 17-5.7 18.2-14.7v-51.5l72.7 58.8V114.6l-72.7 58.8zm-167.3 66.9v-87.6l75.2 43.8-75.2 43.8z"
                                />
                                <path
                                    fill="#606060"
                                    d="M99 228c-49.2 0-89 39.8-89 89s39.8 89 89 89 89-39.8 89-89-39.8-89-89-89zm75 136.8c-1.9 3.2-6 4.3-9.2 2.5l-70.2-40.5c-1.3-.8-2.3-1.9-2.8-3.2-1.3-1.4-2.1-3.2-2.1-5.3v-82.5c0-4.2 3.4-7.6 7.6-7.6h.7c4.2 0 7.6 3.4 7.6 7.6v78.9l67.2 38.8c3.2 1.9 4.3 6 2.5 9.2l-1.3 2.1z"
                                />
                            </svg>
                            <div className={styles["meta-stat__details"]}>
                                {isLoadingData ? (
                                    <SkeletonElement type="title" style={{ width: "3rem" }} />
                                ) : (
                                    <h4>
                                        {(profileData?.statistics?.lastUpload && profileData?.statistics?.lastUpload === "No uploads"
                                            ? profileData?.statistics?.lastUpload
                                            : profileData?.statistics?.lastUpload.saneDateFormat(isMediaLargeMobile ? "m/d/y" : "sane")) || "unknown"}
                                    </h4>
                                )}
                                {isLoadingData ? <SkeletonElement type="text" style={{ width: "7rem", margin: 0 }} /> : <span>Last upload{isMediaLargeMobile && "\n(mm/dd/yy)"}</span>}
                            </div>
                        </div>
                    </div>
                    {isLoadingData ? (
                        <SkeletonChannelDescription spec="fy-channel-description-container" lines={4} />
                    ) : (
                        <div className={styles["fy-channel-description-container"]}>
                            <h4>Description</h4>
                            <p>{profileData && profileData.description}</p>
                        </div>
                    )}

                    {isLoadingData ? (
                        <SkeletonChannelTags spec="fy-channel-tags-container" tags={5} />
                    ) : (
                        <div className={styles["fy-channel-tags-container"]}>
                            <div className={styles["fy-keywords-container"]}>
                                <h4>Keywords</h4>
                                <div className={styles["fy-tags-container"]}>
                                    {(profileData &&
                                        profileData?.tags?.keywords.length &&
                                        profileData?.tags?.keywords.map((tag) => {
                                            return (
                                                <div key={tag} className={`${String(styles["fy-keywords"])} ${String(styles["fy-tags"])}`}>
                                                    <span>{tag.replace(/(^['"])+|['"]$/g, "")}</span>
                                                </div>
                                            );
                                        })) || (
                                        <div className={`${String(styles["fy-keywords"])} ${String(styles["fy-tags"])}`}>
                                            <span>No keyword specified</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles["fy-topics-container"]}>
                                <h4>Topics</h4>
                                <div className={styles["fy-tags-container"]}>
                                    {(profileData &&
                                        profileData?.tags?.topics.length &&
                                        profileData?.tags?.topics.map((topic) => (
                                            <a key={topic} className={`${String(styles["fy-topics"])} ${String(styles["fy-tags"])}`} href={topic} target="_blank" rel="noopener noreferrer">
                                                <span>{topic.replace("https://en.wikipedia.org/wiki/", "")}</span>
                                            </a>
                                        ))) || (
                                        <a
                                            className={`${String(styles["fy-topics"])} ${String(styles["fy-tags"])}`}
                                            href="https://en.wikipedia.org/wiki/Category:YouTube_channels_by_topic"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span>No topic specified</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <hr className={styles["fy-channel-video-content-break"]} />
                <div className={styles["fy-channel-videos-list-container"]}>
                    {isLoadingData ? (
                        <SkeletonChannelVideosContainer spec="fy-channel-videos-container" />
                    ) : (
                        <div className={styles["fy-channel-videos-container"]}>
                            <div className={styles["videos-container__content-list"]}>
                                <h4>Your Uploads</h4>
                                {isMediaLargeMobile ? (
                                    <MobileScroller
                                        media={profileData?.uploads?.items && profileData.uploads?.items.length > 0 ? profileData?.uploads : { items: [], totalResults: 0 }}
                                        type="upload"
                                    />
                                ) : isMediaSmallMobile ? (
                                    <VerticalScroller
                                        media={profileData?.uploads.items && profileData?.uploads?.items.length > 0 ? profileData?.uploads : { items: [], totalResults: 0 }}
                                        type="upload"
                                    />
                                ) : (
                                    <MediaScroller media={profileData?.uploads.items && profileData?.uploads?.items.length > 0 ? profileData?.uploads : { items: [], totalResults: 0 }} type="upload" />
                                )}
                            </div>
                            <div className={styles["videos-container__content-list"]}>
                                <h4>Your Liked Videos</h4>
                                {isMediaLargeMobile ? (
                                    <MobileScroller media={profileData?.likes?.items && profileData.likes?.items.length > 0 ? profileData?.likes : { items: [], totalResults: 0 }} type="like" />
                                ) : isMediaSmallMobile ? (
                                    <VerticalScroller media={profileData?.likes?.items && profileData.likes?.items.length > 0 ? profileData?.likes : { items: [], totalResults: 0 }} type="like" />
                                ) : (
                                    <MediaScroller media={profileData?.likes?.items && profileData.likes?.items.length > 0 ? profileData?.likes : { items: [], totalResults: 0 }} type="like" />
                                )}
                            </div>
                            <div className={styles["videos-container__content-list"]}>
                                <h4>Your Playlists</h4>
                                {isMediaLargeMobile ? (
                                    <MobileScroller
                                        media={profileData?.playlist?.items && profileData.playlist?.items.length > 0 ? profileData?.playlist : { items: [], totalResults: 0 }}
                                        type="playlist"
                                    />
                                ) : isMediaSmallMobile ? (
                                    <VerticalScroller
                                        media={profileData?.playlist?.items && profileData?.playlist?.items.length > 0 ? profileData?.playlist : { items: [], totalResults: 0 }}
                                        type="playlist"
                                    />
                                ) : (
                                    <MediaScroller
                                        media={profileData?.playlist?.items && profileData?.playlist?.items.length > 0 ? profileData?.playlist : { items: [], totalResults: 0 }}
                                        type="playlist"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfileContent;
