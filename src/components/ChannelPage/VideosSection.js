import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  convertDurationInHMS,
  viewSubCount,
} from "../../utils/commonFunctions";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import moment from "moment";
import VideoSectionShimmer from "./VideoSectionShimmer";
import ImgLazyLoad from "../ImgLazyLoad";

const VideosSection = () => {
  const [videoSort, setVideoSort] = useState("date");
  const [channelVideos, setChannelVideos] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const getChannelVideos = async () => {
    try {
      const options = {
        part: "snippet",
        channelId: id,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        maxResults: 20,
        type: "video",
        order: videoSort,
      };
      const data = await fetch(
        `${YOUTUBE_API_URL}/search?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      setChannelVideos(jsonData);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getChannelVideos();
  }, [videoSort]);

  if (error) return <ErrorPage />;

  return (
    <div className="mt-[2%] laptop:mt-[1%]">
      <div className="flex gap-x-[20px]">
        <button
          onClick={() => {
            setChannelVideos(null);
            setVideoSort("date");
          }}
          className={`${
            videoSort === "date"
              ? "bg-black text-white"
              : "bg-lightWhite hover:bg-slate-200"
          } px-[10px] py-[4px] rounded-md`}
        >
          Recently uploaded
        </button>

        <button
          onClick={() => {
            setChannelVideos(null);
            setVideoSort("viewCount");
          }}
          className={`${
            videoSort === "viewCount"
              ? "bg-black text-white"
              : "bg-lightWhite hover:bg-slate-200"
          } px-[10px] py-[4px] rounded-md`}
        >
          Popular
        </button>
      </div>
      {!channelVideos ? (
        <VideoSectionShimmer />
      ) : (
        <div className="flex mt-[2%] justify-center items-center flex-wrap gap-x-[20px] gap-y-[20px]">
          {channelVideos?.items?.map((videoInfo) => (
            <VideoSectionCard key={videoInfo?.id?.videoId} info={videoInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

const VideoSectionCard = ({ info }) => {
  const [videoStatics, setVideoStatics] = useState(null);

  const getVideoStatics = async () => {
    const options = {
      part: "contentDetails,statistics",
      type: "video",
      id: info?.id?.videoId,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const data = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const jsonData = await data.json();
    setVideoStatics(jsonData);
  };

  useEffect(() => {
    getVideoStatics();
  }, []);

  const videoLength = convertDurationInHMS(
    videoStatics?.items?.[0]?.contentDetails?.duration
  );

  const videoPublishDate = moment(info?.snippet?.publishedAt).fromNow();
  const viewCount = viewSubCount(
    videoStatics?.items?.[0]?.statistics?.viewCount
  );

  return (
    <div>
      <Link to={`/watch?v=${info?.id?.videoId}`}>
        <div className="flex flex-col gap-y-[10px] font-Roboto cursor-pointer">
          <div className="relative">
            <ImgLazyLoad
              src={info?.snippet?.thumbnails?.high?.url}
              style="h-[180px] w-[300px] rounded-[10px] object-cover"
            />

            <div className="bg-black absolute right-1 bottom-2 rounded-[5px] px-[6px] py-[2px]">
              <p className="text-[12px] font-medium text-white">
                {videoLength}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="line-clamp-2 w-[240px] text-[15px] font-medium">
              {info?.snippet?.title}
            </p>

            <div className="flex gap-x-[10px] text-[13px]">
              <p>{viewCount}</p>
              <p>{videoPublishDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideosSection;
