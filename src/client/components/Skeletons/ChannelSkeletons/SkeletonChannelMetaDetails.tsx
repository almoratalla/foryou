import { FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";
import Shimmer from "@components/Skeletons/Shimmer";

const SkeletonChannelMetaDetails: FC<{ theme?: string; spec?: string; lines?: string | number }> = ({ theme, spec, lines = 3 }) => {
    const themeClass = theme || "light";

    return (
        <div className={[styles["skeleton-wrapper"], styles[themeClass], styles[spec || ""]].join(" ")}>
            <div className={styles["skeleton-article"]}>
                {Array(Number(lines))
                    .fill("L")
                    .map((l: string, i) => (
                        <SkeletonElement type="text" key={`${l}-${i}`} />
                    ))}
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonChannelMetaDetails;
