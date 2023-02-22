import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPageToken } from "../utils/appSlice";
import { YOUTUBE_API_URL } from "../utils/constatnt";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [pageToken, setPageToken] = useState(null);

  const ismenuOpen = useSelector((store) => store.app.ismenuOpen);
  const videoCategory = useSelector((store) => store.app.videoCategory);

  const dispatch = useDispatch();

  const getVideoData = async () => {
    let options = {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      maxResults: 20,
      regionCode: "IN",
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };

    options = pageToken ? { ...options, pageToken } : options;

    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    setVideos(videoJson);
    setVideoInfo((prev) =>
      prev ? [...prev, ...videoJson?.items] : videoJson?.items
    );
    dispatch(setNextPageToken(videoJson?.nextPageToken));
  };

  const nextPageToken = useSelector((store) => store.app.pageToken);

  useEffect(() => {
    getVideoData();
  }, [pageToken]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      if (nextPageToken) setPageToken(nextPageToken);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken]);

  return (
    <div
      className={`mx-[2%] ${
        ismenuOpen ? "w-full desktop:w-[85%]" : "w-full"
      } mt-[2%] flex flex-wrap justify-center gap-x-[20px] gap-y-[20px]`}
    >
      {videoInfo?.map((videoInfo) => (
        <VideoCard key={videoInfo.id} info={videoInfo} />
      ))}
    </div>
  );
};

export default VideoContainer;
