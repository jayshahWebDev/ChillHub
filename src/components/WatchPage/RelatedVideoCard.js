import React, { useEffect, useState } from "react";
import { viewSubCount } from "../../utils/commonFunctions";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import moment from "moment";
import { Link } from "react-router-dom";
import ImgLazyLoad from "../ImgLazyLoad";

const RelatedVideoCard = ({ info }) => {
  const [statistics, setStatistics] = useState(null);

  const getVideoStatistics = async () => {
    const options = {
      part: "statistics",
      id: info?.id?.videoId,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const data = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
    );
    const jsonData = await data.json();
    setStatistics(jsonData);
  };

  useEffect(() => {
    getVideoStatistics();
  }, []);

  const viewCount = viewSubCount(statistics?.items?.[0]?.statistics?.viewCount);
  const videoPublishDate = moment(info?.snippet?.publishedAt).fromNow();

  return (
    <Link to={`/watch?v=${info?.id?.videoId}`}>
      <div className="mt-[10px] font-Roboto desktop:flex gap-x-[5px]">
        <div className="w-full desktop:w-[40%]">
          <ImgLazyLoad
            src={info?.snippet?.thumbnails?.high?.url}
            style="w-full h-[200px] tablet:h-[350px] laptop:h-[150px] desktop:h-[100px] object-cover rounded-[10px]"
          />
        </div>
        <div className="desktop:w-[60%]">
          <p className="line-clamp-2 w-[98%] font-medium">
            {info?.snippet?.title}
          </p>
          <div className="flex laptop:flex-col gap-x-[8px] laptop:gap-x-0 items-center laptop:items-start">
            <p>{info?.snippet?.channelTitle}</p>
            <div className="flex gap-x-[8px] items-center">
              <p>{viewCount}</p>
              <p>{videoPublishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedVideoCard;
