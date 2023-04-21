import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import { viewSubCount } from "../../utils/commonFunctions";
import moment from "moment";
import ErrorPage from "../../ErrorPage";

const HomeSection = () => {
  const [trailerDetail] = useOutletContext();
  const [trailerVideoDetail, setTrailerVideoDetail] = useState(null);
  const [error, setError] = useState(false);
  const getTrailerVideoDetail = async () => {
    try {
      let options = {
        part: "snippet,statistics",
        type: "video",
        id: trailerDetail,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      let data = await fetch(
        `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(options)
      );
      let jsonData = await data.json();
      setTrailerVideoDetail(jsonData?.items?.[0]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getTrailerVideoDetail();
  }, [trailerDetail]);

  if (error) return <ErrorPage />;
  if (!trailerVideoDetail) return;

  const videoPublishDate = moment(
    trailerVideoDetail?.snippet?.publishedAt
  ).fromNow();

  const viewCount = viewSubCount(trailerVideoDetail?.statistics?.viewCount);
  return (
    <div className="mt-[20px] laptop:flex laptop:gap-x-[10px]">
      <div className="laptop:w-[50%] desktop:w-[30%]">
        <iframe
          src={"https://www.youtube.com/embed/" + trailerDetail + "?autoplay=1"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-[100%] h-[250px] rounded-[10px]"
        ></iframe>
      </div>
      <div className="mt-[10px] mb-[10px] font-Roboto laptop:w-[50%] desktop:w-[40%]">
        <p className="font-medium">{trailerVideoDetail?.snippet?.title}</p>
        <div className="flex items-center gap-x-[20px] mt-[5px]">
          <p>{viewCount}</p>
          <p>{videoPublishDate}</p>
        </div>
        <p className="mt-[5px] line-clamp-6">
          {trailerVideoDetail?.snippet?.description}
        </p>
      </div>
    </div>
  );
};

export default HomeSection;
