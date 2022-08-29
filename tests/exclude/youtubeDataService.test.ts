import YoutubeData from "../../src/server/service/youtubeData";

const token = "";

describe("My youtube data", () => {
    let myChannelData = { items: [{ contentDetails: { relatedPlaylists: { uploads: "1", likes: "1" } } }] };
    const fetchData = async () => {
        const youtubeData = new YoutubeData();
        myChannelData = await youtubeData.getMyChannelData(token);
        return myChannelData;
    }


    it("Should return my youtube data", async () => {
        console.log(myChannelData);
        myChannelData = await fetchData();
        expect(myChannelData).toEqual(expect.objectContaining({
            pageInfo: expect.any(Object),
            kind: expect.any(String),
            etag: expect.any(String),
            items: expect.arrayContaining([{
                contentOwnerDetails: expect.any(Object),
                contentDetails: expect.objectContaining({
                    relatedPlaylists: expect.objectContaining({
                        likes: expect.stringContaining('LL'),
                        uploads: expect.any(String)
                    })
                }),
                statistics: expect.any(Object),
                id: expect.any(String),
                etag: expect.any(String),
                kind: expect.any(String),
                snippet: expect.objectContaining({
                    country: expect.any(String),
                    description: expect.any(String),
                    localized: expect.any(Object),
                    publishedAt: expect.any(String),
                    title: expect.any(String),
                    thumbnails: expect.objectContaining({
                        default: expect.objectContaining({
                            url: expect.any(String),
                            height: expect.any(Number),
                            width: expect.any(Number)
                        }),
                        high: expect.objectContaining({
                            url: expect.any(String),
                            height: expect.any(Number),
                            width: expect.any(Number)
                        }),
                        medium: expect.objectContaining({
                            url: expect.any(String),
                            height: expect.any(Number),
                            width: expect.any(Number)
                        }),
                    })
                })
            }])
        }))

    });

    it("Should return my uploads playlists", async () => {
        myChannelData = await fetchData();
        const youtube = new YoutubeData();
        if (myChannelData instanceof Object && Object.keys(myChannelData).includes("items")) {
            console.log(myChannelData.items[0]!.contentDetails.relatedPlaylists);
            const ytUploadPlaylistData = await youtube.getMyPlaylistsData(token, myChannelData.items[0]!.contentDetails.relatedPlaylists!.uploads!.toString())
            const ytLikedPlaylistData = await youtube.getMyPlaylistsData(token, myChannelData.items[0]!.contentDetails.relatedPlaylists!.likes!.toString())
            expect(ytUploadPlaylistData).toEqual(expect.any(Object))
            expect(ytLikedPlaylistData).toEqual(expect.any(Object))
        }
    })
});

console.log(YoutubeData);
