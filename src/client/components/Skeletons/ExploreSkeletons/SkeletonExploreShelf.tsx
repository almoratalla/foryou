import { FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonExploreVideoItem from "@components/Skeletons/ExploreSkeletons/SkeletonExploreVideoItem";

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

const SkeletonExploreShelf: FC<{ theme?: string; spec?: string; items: number }> = ({ items, spec }) => {
    return (
        <div className={[styles["skeleton-shelf"], styles[spec || ""]].join(" ")}>
            <a href="https://www.youtube.com/" className={styles["skeleton-shelf-title"]}>
                <h2>
                    <TrendingSVG />
                    <span>Explore</span>
                </h2>
            </a>
            <main>
                {Array(Number(items))
                    .fill("L")
                    .map((l: string, i) => (
                        <SkeletonExploreVideoItem key={`${l}-${i}`} />
                    ))}
            </main>
        </div>
    );
};

export default SkeletonExploreShelf;
