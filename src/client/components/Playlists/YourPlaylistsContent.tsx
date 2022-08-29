import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "@/styles/components/modules/PlaylistsContent.module.scss";
import SkeletonPlaylistsItem from "@/components/Skeletons/PlaylistsSkeletons/SkeletonPlaylistsItem";

import YourPlaylistItem from "./YourPlaylistItem";

const ns = "fy-playlists";

const fillSkeleton = (count = 5) => {
    return Array(Number(count))
        .fill("L")
        .map((l: string, i) => <SkeletonPlaylistsItem key={`sk-playlist-${l}-${i}`} />);
};

const LogoutSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.971 384.971">
            <path d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z" />
            <path d="M381.481 184.088l-83.009-84.2a11.942 11.942 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0017.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z" />
        </svg>
    );
};

const YourPlaylistsContent: FC<{ data: Schema$PlaylistListItems; isLoading: boolean; isDemo?: boolean }> = ({ data, isLoading, isDemo }) => {
    return (
        <div className={styles[`${ns}-container`]}>
            <section className={styles[`${ns}__section`]}>
                <header className={styles[`${ns}__section-header`]}>
                    <div className={styles[`${ns}__section-heading-container`]}>
                        <h3 className={styles[`${ns}__heading`]}>Your Playlists</h3>
                        {isDemo && (
                            <Link to={"/playlists"}>
                                <LogoutSVG />
                                <span>Quit demo</span>
                            </Link>
                        )}
                    </div>
                </header>
                <main className={styles[`${ns}__main`]}>
                    <div className={styles[`${ns}__main-grid`]}>
                        {isLoading ? fillSkeleton(10) : data?.map((playlist, idx) => <YourPlaylistItem key={`${playlist.id}-${idx}`} data={playlist} />) || fillSkeleton(10)}
                    </div>
                </main>
            </section>
        </div>
    );
};

export default YourPlaylistsContent;
