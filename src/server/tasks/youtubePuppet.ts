import { CronJob } from "cron";
import NodeCache from "node-cache";

import YoutubeData from "@server/service/youtubeData";

export type YT_DATA_CONTENTS = {
    title: string | undefined;
    label: string | null | undefined;
    link: string | undefined;
    index: number;
    id: string;
    duration: { label: string; timeDuration: string };
    details: {
        channel: {
            title: string | undefined;
            avatar: string | undefined;
            link: string | undefined;
        };
        views: string;
        upload: string;
        isVerified: string | boolean;
    };
    thumbnail: { url: string; alt: string; formats: string[] };
    date?: Date;
    timestamp?: number;
}[];

export type OtherRichContents = { type: string; contents: YT_DATA_CONTENTS }[];
export const YTDATA_CACHE = new NodeCache();

const youtubePuppetTask = () => {
    const youtubeData = new YoutubeData();
    const YTDATA_EXPLORE_CONTENTS = "YTDATA_EXPLORE_CONTENTS";
    const YTDATA_EXPLORE_RICHCONTENTS_SHORTS = "YTDATA_EXPLORE_RICHCONTENTS_SHORTS";
    const YTDATA_EXPLORE_RICHCONTENTS_TRENDING = "YTDATA_EXPLORE_RICHCONTENTS_TRENDING";
    const YTDATA_EXPLORE_RICHCONTENTS_OTHERS = "YTDATA_EXPLORE_RICHCONTENTS_OTHERS";

    youtubeData
        .getYoutubeExploreData()
        .then((initialExploreData) => {
            const d = new Date();
            const ec = initialExploreData.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() }));
            const ercs = initialExploreData.richContents.find((f) => f.type === "shorts" || f.type.includes("shorts"))?.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })) || [];
            const erct = initialExploreData.richContents.find((f) => f.type === "trending" || f.type.includes("trending"))?.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })) || [];
            const erco: OtherRichContents =
                initialExploreData.richContents.filter((f) => f.type !== "shorts" && !f.type.includes("shorts") && f.type !== "trending" && !f.type.includes("trending")) || [];
            YTDATA_CACHE.mset([
                { key: YTDATA_EXPLORE_CONTENTS, val: ec },
                { key: YTDATA_EXPLORE_RICHCONTENTS_SHORTS, val: ercs },
                { key: YTDATA_EXPLORE_RICHCONTENTS_TRENDING, val: erct }
                // { key: YTDATA_EXPLORE_RICHCONTENTS_OTHERS, val: erco }
            ]);
            YTDATA_CACHE.set(YTDATA_EXPLORE_RICHCONTENTS_OTHERS, erco);
        })
        .catch((err) => console.log(err));

    const job = new CronJob("*/1 * * * *", () => {
        const d = new Date();
        let ytdeContents = YTDATA_CACHE.get(YTDATA_EXPLORE_CONTENTS) as YT_DATA_CONTENTS;
        let ytdeRichContentsShorts = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_SHORTS) as YT_DATA_CONTENTS;
        let ytdeRichContentsTrending = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_TRENDING) as YT_DATA_CONTENTS;
        let ytdeRichContentsOthers = YTDATA_CACHE.get(YTDATA_EXPLORE_RICHCONTENTS_OTHERS) as OtherRichContents;
        if (ytdeContents === undefined || ytdeRichContentsShorts === undefined || ytdeRichContentsTrending === undefined) {
            YTDATA_CACHE.mset([
                { key: YTDATA_EXPLORE_CONTENTS, val: [] },
                { key: YTDATA_EXPLORE_RICHCONTENTS_SHORTS, val: [] },
                { key: YTDATA_EXPLORE_RICHCONTENTS_TRENDING, val: [] }
            ]);
            ytdeContents = [];
            ytdeRichContentsShorts = [];
            ytdeRichContentsTrending = [];
            ytdeRichContentsOthers = [];
        }
        youtubeData
            .getYoutubeExploreData()
            .then((exploreData) => {
                const c = ytdeContents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() }));
                const ec = exploreData.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() }));
                const ccon = c.concat(ec);
                const sortLimitedUniqueContentsToCache = ccon
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                    .slice(0, 40);

                const c_shorts = ytdeRichContentsShorts.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() }));
                const c_trending = ytdeRichContentsTrending.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() }));
                const rc_shorts = exploreData.richContents.find((f) => f.type === "shorts" || f.type.includes("shorts"))?.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })) || [];
                const rc_trending =
                    exploreData.richContents.find((f) => f.type === "trending" || f.type.includes("trending"))?.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })) || [];
                const cscon = c_shorts.concat(rc_shorts);
                const ctcon = c_trending.concat(rc_trending);

                const rc_others = exploreData.richContents.filter((f) => f.type !== "shorts" && !f.type.includes("shorts") && f.type !== "trending" && !f.type.includes("trending")) || [];
                const rc_others_wdate = rc_others.map((t) => ({ type: t.type, content: t.contents.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })) }));
                const tryCocon = ytdeRichContentsOthers?.map((t) => ({
                    type: t.type,
                    content: t.contents?.map((obj) => ({ ...obj, date: d, timestamp: d.valueOf() })).concat(rc_others_wdate.find((f) => f.type === t.type)?.content || [])
                }));
                const cocon = ytdeRichContentsOthers?.length > 0 ? tryCocon : rc_others_wdate;

                const sortLimitedUniqueRichContentsShortsToCache = cscon
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                    .slice(0, 40);
                const sortLimitedUniqueRichContentsTrendingToCache = ctcon
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                    .slice(0, 40);
                const sortLimitedUniqueRichContentsOthersToCache = cocon?.map((m) => ({
                    type: m.type,
                    content: m.content
                        ?.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                        .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                        .slice(0, 40)
                }));
                YTDATA_CACHE.mset([
                    { key: YTDATA_EXPLORE_CONTENTS, val: sortLimitedUniqueContentsToCache },
                    { key: YTDATA_EXPLORE_RICHCONTENTS_SHORTS, val: sortLimitedUniqueRichContentsShortsToCache },
                    { key: YTDATA_EXPLORE_RICHCONTENTS_TRENDING, val: sortLimitedUniqueRichContentsTrendingToCache }
                ]);
                YTDATA_CACHE.set(YTDATA_EXPLORE_RICHCONTENTS_OTHERS, sortLimitedUniqueRichContentsOthersToCache);
            })
            .catch((err) => console.log(err));
    });
    job.start();
};

export default youtubePuppetTask;
