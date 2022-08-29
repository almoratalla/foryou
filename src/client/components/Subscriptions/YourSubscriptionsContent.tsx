import { FC, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CSSTransition } from "react-transition-group";

import styles from "@/styles/components/modules/SubscriptionsContent.module.scss";
import SkeletonSubscriptionsCards from "@components/Skeletons/SubscriptionsSkeletons/SkeletonSubscriptionsCards";
import FilterByTopics from "@resources/assets/icons/FilterByTopics.min.svg";
import SortByRelevance from "@resources/assets/icons/SortByRelevance.min.svg";
import SortByActivities from "@resources/assets/icons/SortByActivities.min.svg";
import SortByName from "@resources/assets/icons/SortByName.min.svg";

import SubscriptionsFilter from "./SubscriptionsFilter";

const ns = "fy-subscriptions";

const CaretSVG = () => {
    return (
        <svg viewBox="0 0 320 512">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" className=""></path>
        </svg>
    );
};

const LogoutSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.971 384.971">
            <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
            <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
        </svg>
    );
};

const YourSubscriptionsContent: FC<{
    data: API$SubscriptionListItems;
    onSort: (sort: string) => void;
    isLoadingData: boolean;
    setFilteredData: React.Dispatch<React.SetStateAction<API$SubscriptionListItems | never[]>>;
    filteredData: API$SubscriptionListItems;
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
    topics: { id: string; link: string }[];
    isMediaSmallMobile?: boolean;
    isMediaLargeMobile?: boolean;
    isDemo?: boolean;
}> = ({ data, onSort, isLoadingData, setFilteredData, activeFilter, setActiveFilter, filteredData, topics, isMediaLargeMobile, isMediaSmallMobile, isDemo }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const mainNodeRef = useRef<HTMLDivElement>(null);

    const searchSort = searchParams.get("sort") || "";

    const sortHandler = (sort: string) => {
        onSort(sort);
        if (sort === "unread") {
            setSearchParams(isDemo ? { sort: "activity", demo: "true" } : { sort: "activity" });
        } else {
            setSearchParams(isDemo ? { sort, demo: "true" } : { sort });
        }
    };

    return (
        <div className={styles[`${ns}-container`]}>
            <section className={styles[`${ns}__section`]}>
                <header className={styles[`${ns}__section-header`]}>
                    <div className={styles[`${ns}__section-heading-container`]}>
                        <h3 className={styles[`${ns}__heading`]}>Subscriptions</h3>
                        {isDemo && (
                            <Link to={"/subscriptions"}>
                                <LogoutSVG />
                                <span>Quit demo</span>
                            </Link>
                        )}
                    </div>
                    <div className={styles[`${ns}__options`]}>
                        <nav className={styles[`${ns}__options-nav`]}>
                            {isMediaSmallMobile ? (
                                <SortByRelevance
                                    className={
                                        styles[
                                            `${ns}__options-nav-opt${
                                                searchSort === "relevance" || !searchSort || (searchSort !== "alphabetical" && searchSort !== "unread" && searchSort !== "activity") ? "--active" : ""
                                            }`
                                        ]
                                    }
                                    onClick={() => sortHandler("relevance")}
                                />
                            ) : (
                                <span
                                    className={
                                        styles[
                                            `${ns}__options-nav-opt${
                                                searchSort === "relevance" || !searchSort || (searchSort !== "alphabetical" && searchSort !== "unread" && searchSort !== "activity") ? "--active" : ""
                                            }`
                                        ]
                                    }
                                    onClick={() => sortHandler("relevance")}
                                >
                                    {isMediaLargeMobile || isMediaSmallMobile ? "Relevance" : "By Relevance"}
                                </span>
                            )}
                            {isMediaSmallMobile ? (
                                <SortByName className={styles[`${ns}__options-nav-opt${searchSort === "alphabetical" ? "--active" : ""}`]} onClick={() => sortHandler("alphabetical")} />
                            ) : (
                                <span className={styles[`${ns}__options-nav-opt${searchSort === "alphabetical" ? "--active" : ""}`]} onClick={() => sortHandler("alphabetical")}>
                                    {isMediaLargeMobile || isMediaSmallMobile ? "Name" : "By Name"}
                                </span>
                            )}
                            {isMediaSmallMobile ? (
                                <SortByActivities
                                    className={styles[`${ns}__options-nav-opt${searchSort === "unread" || searchSort === "activity" ? "--active" : ""}`]}
                                    onClick={() => sortHandler("unread")}
                                />
                            ) : (
                                <span className={styles[`${ns}__options-nav-opt${searchSort === "unread" || searchSort === "activity" ? "--active" : ""}`]} onClick={() => sortHandler("unread")}>
                                    {isMediaLargeMobile || isMediaSmallMobile ? "Activities" : "By Activities"}
                                </span>
                            )}
                            <div className={styles[`${ns}__options-nav-opt--filter`]} onClick={() => setShowFilters(!showFilters)}>
                                {isMediaSmallMobile ? <FilterByTopics /> : <span style={{ fontWeight: "600" }}>{isMediaLargeMobile ? "Topics" : "Filter By Topics"}</span>}
                                {!isMediaSmallMobile && <CaretSVG />}
                            </div>
                        </nav>
                    </div>
                    <CSSTransition
                        in={showFilters}
                        timeout={800}
                        classNames={{
                            enter: styles["fy-subs-content-filters-enter"],
                            enterActive: styles["fy-subs-content-filters-enter-active"],
                            exit: styles["fy-subs-content-filters-exit"],
                            exitActive: styles["fy-subs-content-filters-exit-active"]
                        }}
                        nodeRef={mainNodeRef}
                        appear={showFilters}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div ref={mainNodeRef} className={styles["fy-subs-content-filters"]}>
                            {showFilters && (
                                <SubscriptionsFilter
                                    setFilteredData={setFilteredData}
                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                    data={data}
                                    topics={topics}
                                    showFilters={showFilters}
                                    isMediaLargeMobile={isMediaLargeMobile}
                                    isMediaSmallMobile={isMediaSmallMobile}
                                />
                            )}
                        </div>
                    </CSSTransition>
                </header>
                <main className={styles[`${ns}__main`]}>
                    <div className={styles[`${ns}__main-grid`]}>
                        {isLoadingData ? (
                            <SkeletonSubscriptionsCards cards={10} />
                        ) : (
                            <AnimatePresence>
                                {filteredData.length > 0 &&
                                    filteredData?.map((yourSubs: Schema$SubscriptionListItem, yourSubsIdx) => {
                                        return (
                                            <motion.div
                                                animate={{ opacity: 1, scale: 1 }}
                                                initial={{ opacity: 0, scale: 0 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                transition={{ duration: 0.3 }}
                                                layout
                                                key={`${yourSubs.id}-${yourSubsIdx}`}
                                                className={styles[`${ns}__main-grid-card`]}
                                            >
                                                <img
                                                    className={styles[`${ns}__subs-img`]}
                                                    src={yourSubs?.snippet?.thumbnails?.high?.url || yourSubs?.snippet?.thumbnails?.medium?.url || ""}
                                                    alt={yourSubs.snippet.title}
                                                />
                                                <a href={`https://youtube.com/channel/${yourSubs?.snippet?.resourceId?.channelId || ""}`} target="_blank" rel="noopener noreferrer">
                                                    {yourSubs.snippet.title}
                                                    {(searchSort === "unread" || searchSort === "activity") && yourSubs.contentDetails.newItemCount !== 0 && (
                                                        <span className={styles[`${ns}__subs--notif`]}>{yourSubs.contentDetails.newItemCount}</span>
                                                    )}
                                                </a>
                                            </motion.div>
                                        );
                                    })}
                                {(!filteredData.length || filteredData.length === 0) && (
                                    <span className={styles[`${ns}__main-grid--no-sub`]}>No subscriptions found. Channels you subscribe to will show up here.</span>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </main>
            </section>
        </div>
    );
};

export default YourSubscriptionsContent;
