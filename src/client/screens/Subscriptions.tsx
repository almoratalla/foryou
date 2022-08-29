import { FC, useEffect, useState } from "react";

import Main from "@components/Subscriptions/YourSubscriptionsContent";
import { fetchSubscriptions } from "@/utils/youtube";
import subscriptionsDemo from "@/utils/demo/subscriptions.json";
import subscriptionsByRelevanceDemo from "@/utils/demo/subscriptionsByRelevance.json";
import subscriptionsByNameDemo from "@/utils/demo/subscriptionsByName.json";
import subscriptionsByActivitiesDemo from "@/utils/demo/subscriptionsByActivities.json";

const Subscriptions: FC<{ isDemo?: boolean }> = ({ isDemo }) => {
    const [yourSubscriptionsData, setYourSubscriptionsData] = useState<API$SubscriptionListItems | never[]>([]);
    const [filteredSubsData, setFilteredSubsData] = useState<API$SubscriptionListItems | never[]>([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [topics, setTopics] = useState<{ id: string; link: string }[] | never[]>([]);
    const [sortBy, setSortBy] = useState<string>("relevance");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [matchesLargeMobile480, setMatchesLargeMobile480] = useState(window.matchMedia("screen and (max-width: 480px) and (min-width: 401px)").matches);
    const [matchesSmallMobile400, setMatchesSmallMobile400] = useState(window.matchMedia("(max-width: 400px)").matches);

    const sortByHandler = (sort: string) => {
        setSortBy(sort);
    };

    useEffect(() => {
        setIsLoading(true);
        if (isDemo) {
            setYourSubscriptionsData(
                sortBy === "alphabetical" ? subscriptionsByNameDemo.subscriptions : sortBy === "unread" ? subscriptionsByActivitiesDemo.subscriptions : subscriptionsByRelevanceDemo.subscriptions
            );
            setFilteredSubsData(
                sortBy === "alphabetical" ? subscriptionsByNameDemo.subscriptions : sortBy === "unread" ? subscriptionsByActivitiesDemo.subscriptions : subscriptionsByRelevanceDemo.subscriptions
            );
            setTopics(subscriptionsDemo.topics);
            setIsLoading(false);
        } else {
            void fetchSubscriptions(sortBy)
                .then((fetchData) => {
                    if (fetchData instanceof Error) throw fetchData;
                    setYourSubscriptionsData(fetchData.subscriptions);
                    setFilteredSubsData(fetchData.subscriptions);
                    setTopics(fetchData.topics);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }

        window.matchMedia("screen and (max-width: 480px) and (min-width: 401px)").addEventListener("change", (e) => setMatchesLargeMobile480(e.matches));
        window.matchMedia("(max-width: 400px)").addEventListener("change", (e) => setMatchesSmallMobile400(e.matches));

        return () => {
            setIsLoading(true);
        };
    }, [sortBy, isDemo]);

    return (
        <Main
            data={yourSubscriptionsData}
            onSort={sortByHandler}
            isLoadingData={isLoading}
            setFilteredData={setFilteredSubsData}
            filteredData={filteredSubsData}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            topics={topics}
            isMediaSmallMobile={matchesSmallMobile400}
            isMediaLargeMobile={matchesLargeMobile480}
            isDemo={isDemo || false}
        />
    );
};

export default Subscriptions;
