import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import { viewSubCount } from "../../utils/commonFunctions";
import moment from "moment";
import { Link } from "react-router-dom";
import ImgLazyLoad from "../ImgLazyLoad";
import ErrorPage from "../../ErrorPage";

const VideoCard = ({ videoInfo }) => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [error, setError] = useState(false);

  const getVideoDetails = async () => {
    try {
      let options = {
        part: "snippet,contentDetails,statistics",
        id: videoInfo?.id?.videoId,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      let data = await fetch(
        `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
      );
      let jsonData = await data.json();
      setVideoDetail(jsonData?.items?.[0]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  if (error) return <ErrorPage />;
  if (!videoDetail) return;

  const viewCount = viewSubCount(videoDetail?.statistics?.viewCount);
  const videoPublishDate = moment(videoDetail?.snippet?.publishedAt).fromNow();

  return (
    <Link
      to={`/watch?v=${videoInfo?.id?.videoId}`}
      className="font-Roboto tablet:flex tablet:w-full"
    >
      <div className="tablet:w-[44%] laptop:w-[41%] desktop:w-[30%]">
        <ImgLazyLoad
          src={videoDetail?.snippet?.thumbnails?.standard?.url}
          style="h-[200px] w-[350px] tablet:h-[180px] tablet:w-[300px] rounded-[10px] object-cover"
        />
      </div>
      <div className="tablet:w-[56%] laptop:w-[59%] desktop:w-[70%]">
        <p className="w-[350px] text-[15px] laptop:text-[18px] font-medium tablet:w-full tablet:mt-[30px]">
          {videoDetail?.snippet?.title}
        </p>
        <div className="w-[260px] text-[13px] flex justify-between tablet:w-[170px]">
          <p className="tablet:hidden">{videoDetail?.snippet?.channelTitle}</p>
          <p>{`${viewCount} views`}</p>
          <p>{videoPublishDate}</p>
        </div>
        <p className="hidden tablet:block mt-[10px] text-[15px]">
          {videoDetail?.snippet?.channelTitle}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;
