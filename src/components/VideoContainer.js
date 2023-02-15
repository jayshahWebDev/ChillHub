import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YOUTUBE_API_URL } from "../utils/constatnt";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [pageToken, setPageToken] = useState(null);

  console.log("videos::", videos?.nextPageToken);

  const ismenuOpen = useSelector((store) => store.app.ismenuOpen);

  const getVideoData = async () => {
    console.log("getVideoDatagetVideoDatagetVideoData");
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
    console.log("videoJson::", videoJson);
    setVideos(videoJson);
    setVideoInfo((prev) =>
      prev ? [...prev, ...videoJson?.items] : videoJson?.items
    );
  };

  useEffect(() => {
    getVideoData();
  }, [pageToken]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + document.documentElement.scrollTop >= 2745) {
        console.log("videos?.nextPageToken:::", videos);
        setPageToken(videos?.nextPageToken);
      }
    });

    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`mx-[2%] ${
        ismenuOpen ? "w-full desktop:w-[85%]" : "w-full"
      } mt-[2%] flex flex-wrap justify-center gap-x-[20px] gap-y-[20px]`}
    >
      {videoInfo?.map((videoInfo) => (
        <VideoCard info={videoInfo} />
      ))}

      {/* <VideoCard info={videos?.items?.[0]} /> */}
    </div>
  );
};

export default VideoContainer;
