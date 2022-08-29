import { FC } from "react";

import styles from "@/styles/components/modules/MediaScroller.module.scss";

const NoContent = () => {
    return (
        <div className={styles["content-list__videos--no-data"]}>
            <p className={styles["no-media-message"]}>No videos found for this playlist.</p>
        </div>
    );
};

const VerticalScroller: FC<{ media: Schema$ProfileLists; type: string }> = ({ media, type }) => {
    return (
        <div className={styles["content-list__renderer"]}>
            <div className={[styles["content-list__videos"], styles["media-scroller"]].join(" ")} data-content-type={type}>
                {([...media.items].length &&
                    [...media.items].chunk(3).map((chunk, chunkIndex) => {
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
        </div>
    );
};

export default VerticalScroller;
