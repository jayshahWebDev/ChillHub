import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import ChannelCard from "./ChannelCard";
import SearchPageShimmer from "./SearchPageShimmer";
import VideoCard from "./VideoCard";
import ErrorPage from "../../ErrorPage";

const SearchVideo = () => {
  const [searchQuery] = useSearchParams();
  const [searchData, setSerachData] = useState(null);
  const [error, setError] = useState(false);

  const getSearchResult = async () => {
    try {
      let options = {
        part: "snippet",
        maxResults: 20,
        q: searchQuery.get("q"),
        type: "channel,video",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      let data = await fetch(
        `${YOUTUBE_API_URL}/search?` + new URLSearchParams(options)
      );
      let jsonData = await data.json();
      setSerachData(jsonData);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [searchQuery.get("q")]);

  if (error) return <ErrorPage />;

  return !searchData ? (
    <SearchPageShimmer />
  ) : (
    <div className="mx-[4%] mt-[2%] laptop:mt-[1%] w-full flex flex-col justify-center items-center">
      <div className="w-full gap-y-[10px] laptop:w-[80%] flex flex-col justify-center items-center tablet:items-start tablet:gap-y-[20px]">
        {searchData?.items?.map((details) =>
          details?.id?.kind?.includes("channel") ? (
            <ChannelCard key={details?.id?.channelId} channelInfo={details} />
          ) : (
            <VideoCard key={details?.id?.videoId} videoInfo={details} />
          )
        )}
      </div>
    </div>
  );
};

export default SearchVideo;
