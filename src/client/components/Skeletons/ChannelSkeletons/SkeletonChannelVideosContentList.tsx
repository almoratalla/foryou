import { FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";

const SkeletonChannelVideosContentList: FC<{ theme?: string; spec?: string; cards?: string | number }> = ({ theme, spec, cards = 5 }) => {
    const themeClass = theme || "light";

    return (
        <div className={[styles["skeleton-videos-container__content-list"], styles[themeClass], styles[spec || ""]].join(" ")}>
            <SkeletonElement type="title" style={{ width: "10rem", height: "1rem" }} />
            <div className={styles["skeleton-content-list__videos"]}>
                {Array(Number(cards))
                    .fill("L")
                    .map((l: string, i) => (
                        <SkeletonElement type="card" key={`${l}-${i}`} />
                    ))}
            </div>
        </div>
    );
};

export default SkeletonChannelVideosContentList;
