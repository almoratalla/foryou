import { FC } from "react";

import SomethingWentWrongImg from "@resources/assets/ForYouError.png";
import styles from "@/styles/components/modules/ErrorHandler.module.scss";

const SomethingWentWrong: FC<{ error?: Error$OAuthError }> = ({ error }) => {
    return (
        <div className={styles["fy-error-handle-container"]}>
            <section className={styles["fy-error-handle__section"]}>
                <img src={SomethingWentWrongImg as string} alt="Something Went Wrong!" />
                <h3>Something Went Wrong!</h3>
                <span style={{ fontWeight: "500" }}>
                    {error?.error.status === "UNAUTHENTICATED" &&
                    (error?.message?.includes("Request had invalid authentication credentials") || error?.error?.message?.includes("Request had invalid authentication credentials"))
                        ? "Access may have expired. Please refresh the page."
                        : error?.message || error?.error.message}
                </span>
                <br />
                <br />
                <span>But don&#39;t be stressed. Take a deep breath and smile while we get this error fixed.</span>
                <br />
                <span>You may also try to refresh the page or try again later.</span>

                <div className={styles["fy-error-handle__hero"]}>
                    <span>If error still persists, you may also try to reach us out.</span>
                    <a href="https://github.com/almoratalla/foryou" className={styles["fy-error-handle__hero--gh-cta"]}>
                        ForYou Github Repository
                    </a>
                </div>
            </section>
        </div>
    );
};

export default SomethingWentWrong;
