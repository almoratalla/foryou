import { FC } from "react";

import SkeletonElement from "@components/Skeletons/SkeletonElement";
import Shimmer from "@components/Skeletons/Shimmer";
import styles from "@/styles/components/modules/Skeleton.module.scss";

const SkeletonChannelDescription: FC<{ theme?: string; spec?: string; lines?: string | number }> = ({ theme, spec, lines = 3 }) => {
    const themeClass = theme || "light";

    return (
        <div className={[styles["skeleton-wrapper"], styles[themeClass], styles[spec || ""]].join(" ")}>
            <div className={styles["skeleton-article"]}>
                <SkeletonElement type="title" style={{ width: "10rem", height: "1rem" }} />
                {Array(Number(lines))
                    .fill("L")
                    .map((l: string, i) => (
                        <SkeletonElement type="text" key={`${l}-${i}`} style={Number(lines) - 1 === Number(i) ? { width: "80%" } : { width: "100%" }} />
                    ))}
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonChannelDescription;
