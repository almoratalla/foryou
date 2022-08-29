import { FC, Fragment } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";

const SkeletonSubscriptionsCards: FC<{ theme?: string; spec?: string; cards?: number }> = ({ cards }) => {
    return (
        <Fragment>
            {Array(Number(cards))
                .fill("L")
                .map((l: string, i) => {
                    return (
                        <div key={`${l}--${i}`} className={styles["skeleton-sub-card-container"]}>
                            <SkeletonElement type="avatar" />
                            <SkeletonElement type="text" />
                        </div>
                    );
                })}
        </Fragment>
    );
};

export default SkeletonSubscriptionsCards;
