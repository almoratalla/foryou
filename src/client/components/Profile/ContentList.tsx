import { FC, useMemo, useState } from "react";

import styles from "@/styles/components/modules/ProfileContent.module.scss";

type items = {
    id: string;
    videoId?: string;
    title: string;
    thumbnail: string;
    ownerTitle: string;
    itemCount?: number;
};

type Schema$ProfileItems = {
    totalResults: number;
    items: items[] | never[];
};

const NoContent = () => {
    return (
        <div className={styles["content-list__videos--no-data"]}>
            <p className={styles["no-media-message"]}>No videos found for this playlist.</p>
        </div>
    );
};

const contentPerList = 5;

const ContentList: FC<{ content: Schema$ProfileItems; type: string }> = ({ content, type }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const contentItems = useMemo(() => content.items, [content.items]);
    const lastContentInListIndex = currentPage * contentPerList;
    const firstContentInListIndex = lastContentInListIndex - contentPerList;
    const currentList = contentItems.slice(firstContentInListIndex, lastContentInListIndex);

    const isUpperLimit = lastContentInListIndex + 1 > contentItems.length;
    const isLowerLimit = currentPage - 1 <= 0;

    const renderHandler = (direction: string) => {
        if (direction === "next") {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles["content-list__renderer"]}>
            {contentItems.length > 0 && !isLowerLimit && (
                <div className={styles["content-list__renderer-slider--left"]} onClick={() => renderHandler("prev")}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{ pointerEvents: "none", display: "block", width: "100%", height: "100%" }}>
                        <g mirror-in-rtl="">
                            <path d="M14.6,18.4L8.3,12l6.4-6.4l0.7,0.7L9.7,12l5.6,5.6L14.6,18.4z"></path>
                        </g>
                    </svg>
                </div>
            )}
            <div className={styles["content-list__videos"]}>
                {(contentItems.length > 0 &&
                    currentList.map((item) => {
                        return (
                            <div key={item.id} className={styles["videos__media-container"]}>
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
                                    <img src={item?.thumbnail || ""} alt="Img" />
                                </div>
                                <div className={styles["media-metadata-container"]}>
                                    <a href={`https://www.youtube.com/watch?v=${item.videoId || ""}`} target="_blank" rel="noopener noreferrer">
                                        <h5>{item.title}</h5>
                                    </a>
                                    <p>{item.ownerTitle}</p>
                                </div>
                            </div>
                        );
                    })) || <NoContent />}
            </div>
            {contentItems.length > 0 && !isUpperLimit && (
                <div className={styles["content-list__renderer-slider--right"]} onClick={() => renderHandler("next")}>
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

export default ContentList;
