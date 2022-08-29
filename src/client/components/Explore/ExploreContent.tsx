import { FC } from "react";

import styles from "@/styles/components/modules/ExploreContent.module.scss";
import { API$ExploreSuggestions } from "@utils/customTypings/API$ExploreSuggestions";
import SkeletonExploreShelf from "@/components/Skeletons/ExploreSkeletons/SkeletonExploreShelf";

import ExploreShelf from "./ExploreShelf";

const ns = "fy-explore";

const Explore: FC<{ data: API$ExploreSuggestions; isLoading: boolean }> = ({ data, isLoading }) => {
    return (
        <div className={styles[`${ns}-container`]}>
            <section className={styles[`${ns}__section`]}>
                {isLoading && <SkeletonExploreShelf items={15} />}
                {!isLoading && <ExploreShelf data={data.contents || []} />}
                {!isLoading &&
                    data.richContents
                        ?.sort((a, b) => {
                            if (a.type === "shorts" && b.type === "trending") {
                                return 1;
                            } else if (a.type === "trending" && b.type === "shorts") {
                                return -1;
                            } else {
                                return 0;
                            }
                        })
                        .filter((f) => f.contents?.length > 0)
                        .map((richContent, idx) => {
                            return <ExploreShelf key={`${richContent.type}-${idx}`} data={richContent.contents} type={richContent.type} />;
                        })}
            </section>
        </div>
    );
};

export default Explore;
