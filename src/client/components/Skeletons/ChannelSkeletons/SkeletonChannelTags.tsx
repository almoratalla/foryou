import { FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";
import Shimmer from "@components/Skeletons/Shimmer";

const SkeletonChannelTags: FC<{ theme?: string; spec?: string; tags?: string | number }> = ({ theme, spec, tags = 4 }) => {
    const themeClass = theme || "light";

    return (
        <div className={[styles["skeleton-wrapper"], styles[themeClass], styles[spec || ""]].join(" ")}>
            <div className={styles["skeleton-article"]}>
                <SkeletonElement type="title" style={{ width: "10rem", height: "1rem" }} />
                <div className={styles["skeleton-tags-container"]}>
                    {Array(Number(tags))
                        .fill("L")
                        .map((l: string, i) => (
                            <SkeletonElement type="tags" key={`${l}-${i}`} />
                        ))}
                </div>
                <SkeletonElement type="title" style={{ width: "10rem", height: "1rem" }} />
                <div className={styles["skeleton-tags-container"]}>
                    {Array(Number(tags))
                        .fill("L")
                        .map((l: string, i) => (
                            <SkeletonElement type="tags" key={`${l}-${i}`} />
                        ))}
                </div>
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonChannelTags;
