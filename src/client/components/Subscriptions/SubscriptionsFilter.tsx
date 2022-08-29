import { FC, useEffect, useRef } from "react";

import styles from "@/styles/components/modules/SubscriptionsFilter.module.scss";

const WIKI_REGEX = /(^(https?):\/\/([\w.]+|[en]).wikipedia.org\/wiki\/)/g;

const SubscriptionsFilter: FC<{
    data: API$SubscriptionListItems;
    setFilteredData: React.Dispatch<React.SetStateAction<API$SubscriptionListItems | never[]>>;
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
    topics: { id: string; link: string }[];
    showFilters: boolean;
    isMediaSmallMobile?: boolean;
    isMediaLargeMobile?: boolean;
}> = ({ setFilteredData, data, activeFilter, topics, setActiveFilter }) => {
    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((subs) => {
                return subs.channel.topicDetails?.topicIds?.includes(activeFilter);
            });
            setFilteredData(filtered);
        }
    }, [activeFilter, data, setFilteredData]);
    const mainNodeRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles[`fy-subs-filters-container`]} ref={mainNodeRef}>
            <button className={styles[`fy-subs-filter${activeFilter === "all" ? "--active" : ""}`]} onClick={() => setActiveFilter("all")}>
                <span>All</span>
            </button>
            {topics
                .sort((tA, tB) => {
                    if (tA.link.replace(WIKI_REGEX, "").replace(/_/g, " ") < tB.link.replace(WIKI_REGEX, "").replace(/_/g, " ")) {
                        return -1;
                    } else if (tA.link.replace(WIKI_REGEX, "").replace(/_/g, " ") > tB.link.replace(WIKI_REGEX, "").replace(/_/g, " ")) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map((topic, topicIdx) => {
                    return (
                        <button className={styles[`fy-subs-filter${activeFilter === topic.id ? "--active" : ""}`]} key={`${topic.id}--${topicIdx}`} onClick={() => setActiveFilter(topic.id)}>
                            <span>{topic.link.replace(WIKI_REGEX, "").replace(/_/g, " ")}</span>
                        </button>
                    );
                })}
        </div>
    );
};

export default SubscriptionsFilter;
