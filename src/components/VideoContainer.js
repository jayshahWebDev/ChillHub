import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YOUTUBE_API_URL } from "../utils/constatnt";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState(null);

  const ismenuOpen = useSelector((store) => store.app.ismenuOpen);

  const getVideoData = async () => {
    const options = {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      maxResults: 20,
      regionCode: "IN",
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    // console.log("videos::", videoJson);
    setVideos(videoJson);
  };

  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <div
      className={`mx-[2%] ${
        ismenuOpen ? "w-full desktop:w-[85%]" : "w-full"
      } mt-[2%] flex flex-wrap justify-center gap-x-[20px] gap-y-[20px]`}
    >
      {videos?.items?.map((videoInfo) => (
        <VideoCard info={videoInfo} />
      ))}

      {/* <VideoCard info={videos?.items?.[0]} /> */}
    </div>
  );
};

export default VideoContainer;
