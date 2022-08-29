import styles from "@/styles/components/modules/Skeleton.module.scss";
import SkeletonElement from "@components/Skeletons/SkeletonElement";

const SkeletonPlaylistsItem = () => {
    return (
        <div className={styles["skeleton-playlists-item"]}>
            <SkeletonElement type="card" />
            <div className={styles["skeleton-playlists-item-details"]}>
                <SkeletonElement type="text" style={{ height: "2rem" }} />
            </div>
        </div>
    );
};

export default SkeletonPlaylistsItem;
