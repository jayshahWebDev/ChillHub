import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import useInfiniteScrolling from "../../utils/useInfiniteScrolling";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [isFetching, setIsFetching] = useInfiniteScrolling(moreData);

  const ismenuOpen = useSelector((store) => store.app.ismenuOpen);
  const videoCategory = useSelector((store) => store.app.videoCategory);

  let options = {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: 20,
    regionCode: "IN",
    videoCategoryId: videoCategory,
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  };

  async function moreData() {
    if (!pageToken) {
      setIsFetching(false);
      return;
    }
    options = { ...options, pageToken };
    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    setVideos(videoJson);
    setVideoInfo((prev) => [...prev, ...videoJson?.items]);
    setPageToken(videoJson?.nextPageToken);
    setIsFetching(false);
  }

  const getVideoData = async () => {
    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    setVideos(videoJson);
    setVideoInfo(videoJson?.items);
    setPageToken(videoJson?.nextPageToken);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getVideoData();
  }, [videoCategory]);

  return !videoInfo && !videos ? (
    <h1>Loading</h1>
  ) : (
    <div
      className={`mx-[2%] ${
        ismenuOpen
          ? "w-full desktop:w-[85%] pointer-events-none desktop:pointer-events-auto"
          : "w-full"
      } mt-[2%] flex flex-wrap justify-center gap-x-[20px] gap-y-[20px]`}
    >
      {videoInfo?.map((videoInfo) => (
        <VideoCard key={videoInfo.id} info={videoInfo} />
      ))}
    </div>
  );
};

export default VideoContainer;
