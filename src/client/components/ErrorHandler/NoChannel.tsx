import { FC } from "react";

import styles from "@/styles/components/modules/ErrorHandler.module.scss";

const NoChannel: FC<{ error?: Error$OAuthError; type?: string }> = ({ error, type }) => {
    return (
        <div className={styles["fy-error-handle-container"]}>
            <section className={styles["fy-error-handle__section"]}>
                <h3>{error?.message || error?.error.message}</h3>
                {type === "playlists" ? <span>It seems there is no channel to find your playlists.</span> : <span>It seems there is no channel created for this account.</span>}

                <div className={styles["fy-error-handle__hero"]}>
                    <span>To create a Youtube channel.</span>
                    <a href="https://youtube.com" className={styles["fy-error-handle__hero--cta"]}>
                        Login to Youtube
                    </a>
                    <a href="https://support.google.com/youtube/answer/1646861" className={styles["fy-error-handle__hero--info"]}>
                        Learn More.
                    </a>
                </div>
            </section>
        </div>
    );
};

export default NoChannel;
