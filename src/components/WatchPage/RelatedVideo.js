import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import RelatedVideoCard from "./RelatedVideoCard";
import WatchPageShimmer from "./WatchPageShimmer";
import ErrorPage from "../../ErrorPage";

const RelatedVideo = () => {
  const [searchParams] = useSearchParams();
  const [relatedVideo, setRelatedVideo] = useState(null);
  const [error, setError] = useState(false);

  const showMoreForMobile = useSelector((store) => store.app.showMore);
  const showcommentForMobile = useSelector((store) => store.app.showComment);

  const getRelatedVideos = async () => {
    try {
      const options = {
        part: "snippet",
        maxResults: 20,
        order: "viewCount",
        regionCode: "IN",
        relatedToVideoId: searchParams?.get("v"),
        type: "video",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      const data = await fetch(
        `${YOUTUBE_API_URL}/search?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      setRelatedVideo(jsonData?.items);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getRelatedVideos();
  }, [searchParams]);

  if (error) return <ErrorPage />;

  return !relatedVideo ? (
    <WatchPageShimmer />
  ) : (
    <div
      className={`laptop:w-[25%] ${
        showMoreForMobile || showcommentForMobile ? "overflow-hidden h-0" : ""
      } laptop:overflow-auto laptop:h-fit`}
    >
      {relatedVideo?.map((videoInfo) => (
        <RelatedVideoCard key={videoInfo?.id?.videoId} info={videoInfo} />
      ))}
    </div>
  );
};

export default RelatedVideo;
