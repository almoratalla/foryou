import styles from "@/styles/components/modules/Skeleton.module.scss";

const Shimmer = () => {
    return (
        <div className={styles["shimmer-wrapper"]}>
            <div className={styles.shimmer}></div>
        </div>
    );
};

export default Shimmer;
