import { CSSProperties, FC } from "react";

import styles from "@/styles/components/modules/Skeleton.module.scss";

const SkeletonElement: FC<{ type: string; spec?: string; style?: CSSProperties }> = ({ type, spec, children, style }) => {
    return (
        <div className={[styles.skeleton, styles[type], styles[spec || ""]].join(" ")} style={style}>
            {children}
        </div>
    );
};

export default SkeletonElement;
