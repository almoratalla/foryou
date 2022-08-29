import { FC } from "react";

import styles from "@/styles/components/modules/MobileScroller.module.scss";

const NoContent = () => {
    return (
        <div className={styles["content-list__videos--no-data"]}>
            <p className={styles["no-media-message"]}>No videos found for this playlist.</p>
        </div>
    );
};

const MobileScroller: FC<{ media: Schema$ProfileLists; type: string }> = ({ media, type }) => {
    return (
        <div className={styles["media-scroller--mobile"]}>
            {([...media.items].length &&
                [...media.items].chunk(3).map((chunkMap, chunkMapIdx) => (
                    <div className={styles["media-group"]} key={`chunk-${chunkMapIdx}`}>
                        {chunkMap.map((mediaChunkElement, mediaChunkElementIdx) => {
                            return (
                                <div key={`media-element-${mediaChunkElementIdx}-${mediaChunkElement.id}`} className={[styles["videos__media-container"], styles["media-element"]].join(" ")}>
                                    <div className={styles["media-thumbnail-container"]}>
                                        {type === "playlist" && (
                                            <div className={styles["media-overlay"]}>
                                                <span>{mediaChunkElement.itemCount || 0}</span>
                                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                    <g>
                                                        <path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        )}
                                        <img src={mediaChunkElement?.thumbnail || ""} loading="lazy" alt="Img" />
                                    </div>
                                    <div className={styles["media-metadata-container"]}>
                                        <a href={`https://www.youtube.com/watch?v=${mediaChunkElement.videoId || ""}`} target="_blank" rel="noopener noreferrer">
                                            <h5>{mediaChunkElement.title}</h5>
                                        </a>
                                        <p>{mediaChunkElement.ownerTitle}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))) || <NoContent />}
        </div>
    );
};

export default MobileScroller;
