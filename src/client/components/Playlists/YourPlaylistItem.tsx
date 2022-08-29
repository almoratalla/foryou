import { FC } from "react";

import styles from "@/styles/components/modules/PlaylistsContent.module.scss";

const ns = "fy-playlists";

const YourPlaylistItem: FC<{ data: Schema$PlaylistListItem }> = ({ data }) => {
    return (
        <div className={styles[`${ns}__main-grid-playlist-item`]}>
            <a className={styles["media-thumbnail-container"]} href={`https://www.youtube.com/playlist?list=${data.id}`}>
                <div className={styles["media-overlay"]}>
                    <span>{data.contentDetails.itemCount || 0}</span>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <g>
                            <path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"></path>
                        </g>
                    </svg>
                </div>
                <img src={data.snippet.thumbnails.maxres?.url || data.snippet.thumbnails.default?.url || data.snippet.thumbnails.high?.url || ""} alt="" />
            </a>
            <div className={styles[`${ns}__main-grid-playlist-item-details`]}>
                <a href={`https://www.youtube.com/playlist?list=${data.id}`}>
                    <span>{data.snippet.title}</span>
                </a>
            </div>
        </div>
    );
};

export default YourPlaylistItem;
