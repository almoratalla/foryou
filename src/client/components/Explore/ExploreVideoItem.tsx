import { FC } from "react";

import styles from "@/styles/components/modules/ExploreVideoItem.module.scss";

const ns = "fy-explore";

const ViewsSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
            <path d="M217.1 67.9C121.6 68 35.7 126.2.8 214.8c46.9 119 181.8 177.5 301.3 130.8 60.2-23.5 107.8-70.9 131.5-130.8-35-88.6-120.9-146.8-216.5-146.9zm0 244.8c-54.3 0-98.4-43.8-98.4-97.9 0-54.1 44-97.9 98.4-97.9 54.3 0 98.4 43.8 98.4 97.9 0 54-44 97.8-98.4 97.9z" />
            <g>
                <path d="M276.3 214.7l-96.2-46.1c10.1-8.2 23-13 37-13h.2c32.6 0 59 26.5 59 59.1zM276.3 214.7c0 32.8-26.5 59.3-59.2 59.3S158 247.5 158 214.8c0-18.6 8.6-35.2 22-46.1v92.1l96.3-46.1zM180.1 168.6s-.1 0-.1.1v-.1h.1z" />
            </g>
        </svg>
    );
};

const LIVEElement = () => {
    return (
        <div className={styles[`${ns}-video-item-renderer__details-meta-data--live`]}>
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                <g>
                    <path d="M14,12c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,10.9,14,12z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12 s0.68,3.17,1.77,4.25l0.71-0.71C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12 s-0.57,2.64-1.48,3.55l0.71,0.71C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12 s1.13,5.27,2.95,7.08l0.71-0.71C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12 s-1.02,4.74-2.65,6.37l0.71,0.71C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z"></path>
                </g>
            </svg>
            <span className={styles[`${ns}-video-item-renderer__details-meta-data--live-meta`]}>LIVE</span>
        </div>
    );
};

const ExploreVideoItem: FC<{ EVISrc: string; EVITitle: string; EVIChannel: string; EVIVideoLink: string; EVIViews: string; EVIUpload: string; type: string }> = ({
    EVISrc,
    EVITitle,
    EVIChannel,
    EVIVideoLink,
    EVIViews,
    EVIUpload,
    type
}) => {
    return (
        <div className={styles[`${ns}-video-item-renderer`]}>
            <a className={styles[`${ns}-video-item-renderer__thumbnail`]} href={EVIVideoLink}>
                <img src={EVISrc} alt="" loading="lazy" className={styles[`${ns}-video-item-renderer__thumbnail-img${type === "shorts" ? "--shorts" : ""}`]} />
            </a>
            <div className={styles[`${ns}-video-item-renderer__details`]}>
                <div className={styles[`${ns}-video-item-renderer__details-meta-data`]}>
                    <div className={styles[`${ns}-video-item-renderer__details-meta-data-views`]}>
                        <ViewsSvg />
                        <span>{EVIViews}</span>
                    </div>
                    {EVIUpload === "live" ? <LIVEElement /> : <span>{EVIUpload}</span>}
                </div>
                <a className={styles[`${ns}-video-item-renderer__details-meta-video`]} href={EVIVideoLink}>
                    <h3>{EVITitle}</h3>
                </a>
                <a className={styles[`${ns}-video-item-renderer__details-meta-channel`]} href={EVIVideoLink}>
                    <span>{EVIChannel}</span>
                </a>
            </div>
        </div>
    );
};

export default ExploreVideoItem;
