import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPageToken } from "../../utils/appSlice";
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

  const dispatch = useDispatch();

  let options = {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: 20,
    regionCode: "IN",
    videoCategoryId: videoCategory,
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  };

  async function moreData() {
    console.log("inside moreData function:::", videos?.nextPageToken);

    // setPageToken(videos?.nextPageToken);
    if (!videos?.nextPageToken) return;
    options = { ...options, pageToken: videos?.nextPageToken };
    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    console.log("videoJaon:::", videoJson);
    setVideos(videoJson);
    setVideoInfo((prev) => [...prev, ...videoJson?.items]);
    setIsFetching(false);
  }

  const getVideoData = async () => {
    // const options = {
    //   part: "snippet,contentDetails,statistics",
    //   chart: "mostPopular",
    //   maxResults: 20,
    //   regionCode: "IN",
    //   videoCategoryId: videoCategory,
    //   key: process.env.REACT_APP_YOUTUBE_API_KEY,
    // };

    // options = pageToken ? { ...options, pageToken } : options;

    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const videoJson = await videoData.json();
    setVideos(videoJson);
    // setVideoInfo((prev) =>
    //   prev ? [...prev, ...videoJson?.items] : videoJson?.items
    // );
    setVideoInfo(videoJson?.items);
    // dispatch(setNextPageToken(videoJson?.nextPageToken));
  };

  // const nextPageToken = useSelector((store) => store.app.pageToken);

  useEffect(() => {
    console.log("inside useeffect videoContainer");
    getVideoData();
  }, []);

  // console.log("videos?.nextPageToken::",videos?.nextPageToken);
  // const tokenFromHook = useInfiniteScrolling();
  // console.log("tokenFromHook:", tokenFromHook);
  // tokenFromHook ? setPageToken(videos?.nextPageToken) : null;

  // console.log("after code");
  // if (tokenFromHook) setPageToken(tokenFromHook);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     if (nextPageToken) setPageToken(nextPageToken);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [nextPageToken]);

  return !videoInfo && !videos ? (
    <h1>Loading</h1>
  ) : (
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
