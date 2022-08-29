import { FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import Shimmer from "@components/Skeletons/Shimmer";
import SkeletonChannelVideosContentList from "@components/Skeletons/ChannelSkeletons/SkeletonChannelVideosContentList";

const SkeletonChannelVideosContainer: FC<{ theme?: string; spec?: string; lines?: string | number }> = ({ theme, spec, lines = 3 }) => {
    const themeClass = theme || "light";

    return (
        <div className={[styles["skeleton-channel-videos-container"], styles["skeleton-wrapper"], styles[themeClass], styles[spec || ""]].join(" ")}>
            {Array(Number(lines))
                .fill("L")
                .map((_: string, i) => (
                    <SkeletonChannelVideosContentList spec="skeleton-videos-container__content-list" key={i} />
                ))}
            <Shimmer />
        </div>
    );
};

export default SkeletonChannelVideosContainer;
