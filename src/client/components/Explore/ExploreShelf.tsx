import { FC } from "react";

import styles from "@/styles/components/modules/ExploreContent.module.scss";

import ExploreVideoItem from "./ExploreVideoItem";

const ns = "fy-explore";

const TrendingSVG = () => {
    return (
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
            <path
                d="M317.42 65.27s1.78 32.94-23.28 65.42a117 117 0 01-10.23 11.64 117.87 117.87 0 00.14-16.74c-1.63-31.52-14.62-98.84-93.39-124.53 5.1 55.49-19.94 95-49.72 128.41-28.42 31.89-61.16 58.19-76 87.41a158.73 158.73 0 00-8.08 32.64 161.13 161.13 0 00304.4 92.88c47.66-70.59-12.56-263.72-43.84-277.13zm18 219.77a118.7 118.7 0 01-13.72 43.9l-.09.15A119.81 119.81 0 0198.7 249.52a118.2 118.2 0 0113.3-36.39c9.79-12.8 23.67-26.8 38.38-41.23 20.55-20.18 42.7-41.21 57.47-60.95 11.35-15.18 18.35-29.61 16.9-42.33 0 0 12.59 14.2 19.88 44.57a191.94 191.94 0 015 43.54 272.42 272.42 0 01-6 57.09s28.7-13.08 52.72-31.11c11.17-8.38 21.33-17.82 27.14-27.52.07 0 21.58 67.92 11.96 129.81z"
                fill="#bb1e23"
            />
            <path d="M242.39 291.21l-6.37-54-40.19 31.22a30.62 30.62 0 1046.56 22.77z" fill="#fc0d1b" />
        </svg>
    );
};

const ExploreSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
            <circle fill="none" stroke="#606060" strokeWidth="40" strokeMiterlimit="10" cx="217.18" cy="217" r="206.94" />
            <path
                fill="#ff0000"
                stroke="#ff0000"
                strokeWidth="30"
                strokeMiterlimit="10"
                d="M279.6 295.26l-176.29 35.43 35.43-176.29c1.59-7.9 7.76-14.08 15.67-15.67L330.7 103.3l-35.44 176.3a19.968 19.968 0 01-15.66 15.66z"
            />
            <path fill="white" d="M235.53 210.2l-28.5-17.17c-5.29-3.19-12.03.62-12.03 6.8v34.33c0 6.18 6.74 9.99 12.03 6.8l28.5-17.17c5.12-3.08 5.12-10.5 0-13.59z" />
        </svg>
    );
};

const ShortsSVG = () => {
    return (
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 434">
            <path
                d="M324.39 182.93l17.41-7.66a91.5 91.5 0 10-73.72-167.5l-163.64 72a91.47 91.47 0 0010.28 171.28l-17.4 7.66A91.5 91.5 0 10171 426.23l163.62-72a91.48 91.48 0 00-10.27-171.28zM313.88 339l-140 61.63a69.21 69.21 0 11-55.76-126.69l39.18-17.25a20.2 20.2 0 01-1.18-6.81v-22.39A69.2 69.2 0 01125.24 95l140-61.63A69.21 69.21 0 11321 160.06l-25.43 11.2-2.4 1.05v35.55l5.64-.21A69.2 69.2 0 01313.88 339z"
                fill="#bb1e23"
            />
            <path d="M254.24 195.78l-53.31-28.06A17.24 17.24 0 00175.66 183v56.11a17.24 17.24 0 0025.27 15.25l53.31-28.05a17.23 17.23 0 000-30.53z" fill="#bb1e23" />
            <path fill="#1d1d1b" d="M295.58 171.26l-2.4 1.05v-1.05h2.4z" />
        </svg>
    );
};

const ExploreShelf: FC<{ data: API$ExploreSuggestionsContents; type?: string }> = ({ data, type }) => {
    return (
        <section className={styles[`${ns}__section-shelf`]}>
            <a
                href={type === "trending" ? "https://www.youtube.com/feed/trending" : type === "shorts" ? `https://www.youtube.com/shorts/${data[0]?.id || ""}` : "https://www.youtube.com/"}
                className={styles[`${ns}__section-shelf-title`]}
            >
                <h2>
                    {type === "trending" ? <TrendingSVG /> : type === "shorts" ? <ShortsSVG /> : <ExploreSVG />}

                    <span>{!type ? "Explore" : type.capitalize()}</span>
                </h2>
            </a>
            <main>
                {data
                    ?.slice(0, data.length - (data.length % 5))
                    .slice(0, type === "trending" ? 20 : type === "shorts" ? 10 : 40)
                    .map((exploreContentSuggestion) => {
                        return (
                            <ExploreVideoItem
                                key={`${exploreContentSuggestion.id}-${exploreContentSuggestion?.index}`}
                                EVISrc={exploreContentSuggestion.thumbnail.url || exploreContentSuggestion.thumbnail.alt}
                                EVITitle={exploreContentSuggestion.title || ""}
                                EVIChannel={exploreContentSuggestion.details?.channel.title || ""}
                                EVIVideoLink={exploreContentSuggestion.link || ""}
                                EVIUpload={exploreContentSuggestion.details.upload || ""}
                                EVIViews={exploreContentSuggestion.details.views || ""}
                                type={type || ""}
                            />
                        );
                    })}
            </main>
        </section>
    );
};

export default ExploreShelf;
