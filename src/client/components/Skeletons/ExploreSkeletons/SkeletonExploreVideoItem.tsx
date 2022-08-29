import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";

const SkeletonExploreVideoItem = () => {
    return (
        <div className={styles["skeleton-video-item-renderer"]}>
            <SkeletonElement type="card" spec={styles["skeleton-video-item-renderer__thumbnail"]} />
            <div className={styles["skeleton-video-item-renderer__details"]}>
                <div className={styles["skeleton-video-item-renderer__details-meta-data"]}>
                    <SkeletonElement type="text" spec={styles["skeleton-video-item-renderer__details-meta-data-views"]} />
                    <SkeletonElement type="text" />
                </div>
                <SkeletonElement type="" />
                <div className={styles["skeleton-video-item-renderer__details-meta-video"]}>
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" style={{ width: "80%" }} />
                </div>
                <SkeletonElement type="text" spec={styles["skeleton-video-item-renderer__details-meta-channel"]} style={{ width: "50%", margin: "0.2rem 0", padding: "5px", height: "0.8rem" }} />
            </div>
        </div>
    );
};

export default SkeletonExploreVideoItem;
