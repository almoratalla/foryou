import { Link } from "react-router-dom";

import styles from "@/styles/components/modules/NotFound.module.scss";
import NotFound404 from "@resources/assets/ForYouMissing.png";
import ExploreSVG from "@resources/assets/explore.svg";

const ns = "fy-notfound";

const NotFound = () => {
    document.title = "ForYou: Not Found";

    return (
        <div className={styles[`${ns}-container`]}>
            <section className={styles[`${ns}__section`]}>
                <div id={styles[`${ns}-page`]}>
                    <div id={styles[`${ns}-page-content`]}>
                        <img src={NotFound404 as string} alt="Page not found" />
                        <h1>Oh no! We couldn&#39;t find that page.</h1>
                        <span>Maybe what you are looking for is not ForYou!</span>
                        <span>Let&#39;s try again one more time.</span>

                        <Link to={"/"}>
                            <ExploreSVG viewBox="0 0 54 54" height="20" width="20" />
                            <span>Explore</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
