import { FC, useEffect, useState, useRef, MutableRefObject } from "react";
import "@/utils/extensions";

import styles from "@/styles/components/modules/MediaScroller.module.scss";

const SCROLLERGAP = 4;

const NoContent = () => {
    return (
        <div className={styles["content-list__videos--no-data"]}>
            <p className={styles["no-media-message"]}>No videos found for this playlist.</p>
        </div>
    );
};

const MediaScroller: FC<{ media: Schema$ProfileLists; type: string }> = ({ media, type }) => {
    const [mediaGroup, setMediaGroup] = useState<{ active: number; group: Schema$ProfileItems[][] }>({ active: 1, group: [...media.items].chunk(5) });
    const scrollerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
    const [matchesAbove768, setMatchesAbove768] = useState(window.matchMedia("(min-width: 768px)").matches);
    const [matchesAbove1000, setMatchesAbove1000] = useState(window.matchMedia("(min-width: 1000px)").matches);

    useEffect(() => {
        const coll = [...media.items].slice(0, !matchesAbove768 ? 9 : matchesAbove1000 ? 15 : 12).chunk(!matchesAbove768 ? 3 : matchesAbove1000 ? 5 : 4);
        setMediaGroup((prevMediaGroupState) => ({ ...prevMediaGroupState, group: coll }));
        scrollEffect(mediaGroup.active);

        window.matchMedia("(min-width: 1000px)").addEventListener("change", (e) => setMatchesAbove1000(e.matches));
        window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => setMatchesAbove768(e.matches));
    }, [media.items, mediaGroup.active, matchesAbove768, matchesAbove1000]);

    const scrollEffect = (active: number) => {
        const activeOffset = Number(scrollerRef.current.offsetWidth * (active - 1));
        const gapOffset = Number(SCROLLERGAP * (active - 1));
        scrollerRef.current.scrollTo(activeOffset + gapOffset, 0);
    };

    const slideHandler = (direction: string) => {
        setMediaGroup((prevMediaGroupState) => ({ ...prevMediaGroupState, active: direction === "next" ? prevMediaGroupState.active + 1 : prevMediaGroupState.active - 1 }));
    };

    return (
        <div className={styles["content-list__renderer"]}>
            {mediaGroup.group.length > 0 && mediaGroup.active !== 1 && (
                <div className={styles["content-list__renderer-slider--left"]} onClick={() => slideHandler("prev")}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{ pointerEvents: "none", display: "block", width: "100%", height: "100%" }}>
                        <g mirror-in-rtl="">
                            <path d="M14.6,18.4L8.3,12l6.4-6.4l0.7,0.7L9.7,12l5.6,5.6L14.6,18.4z"></path>
                        </g>
                    </svg>
                </div>
            )}
            <div className={[styles["content-list__videos"], styles["media-scroller"]].join(" ")} data-content-type={type} ref={scrollerRef}>
                {(mediaGroup.group.length &&
                    mediaGroup.group.map((chunk, chunkIndex) => {
                        return (
                            <div className={styles["media-group"]} key={chunkIndex}>
                                {chunk.map((item) => {
                                    return (
                                        <div key={item.id} className={[styles["videos__media-container"], styles["media-element"]].join(" ")}>
                                            <div className={styles["media-thumbnail-container"]}>
                                                {type === "playlist" && (
                                                    <div className={styles["media-overlay"]}>
                                                        <span>{item.itemCount || 0}</span>
                                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                            <g>
                                                                <path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                )}
                                                <img src={item?.thumbnail || ""} loading="lazy" alt="Img" />
                                            </div>
                                            <div className={styles["media-metadata-container"]}>
                                                <a href={`https://www.youtube.com/watch?v=${item.videoId || ""}`} target="_blank" rel="noopener noreferrer">
                                                    <h5>{item.title}</h5>
                                                </a>
                                                <p>{item.ownerTitle}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })) || <NoContent />}
            </div>
            {mediaGroup.group.length > 0 && mediaGroup.active !== mediaGroup.group.length && (
                <div className={styles["content-list__renderer-slider--right"]} onClick={() => slideHandler("next")}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{ pointerEvents: "none", display: "block", width: "100%", height: "100%" }}>
                        <g mirror-in-rtl="">
                            <path d="M9.4,18.4l-0.7-0.7l5.6-5.6L8.6,6.4l0.7-0.7l6.4,6.4L9.4,18.4z"></path>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default MediaScroller;
