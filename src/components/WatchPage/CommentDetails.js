import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  viewSubCount,
  createVideoDetailObject,
} from "../../utils/commonFunctions";
import moment from "moment";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import likeIcon from "../../../assets/likeIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowMore, toggleShowComment } from "../../utils/appSlice";
import {
  addVideoInHistory,
  addVideoInWatchLater,
  removeVideoFromWatchLater,
} from "../../utils/videoSlice";
import DescriptionDetail from "./DescriptionDetail";
import CommentModel from "./CommentModel";
import ImgLazyLoad from "../ImgLazyLoad";

const CommentDetails = () => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const getChannelAndVideoDetails = async () => {
    let videoOptions = {
      part: "snippet,contentDetails,statistics",
      id: searchParams.get("v"),
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const videoData = await fetch(
      `${YOUTUBE_API_URL}/videos?` + new URLSearchParams(videoOptions)
    );
    const videoJson = await videoData.json();
    setVideoInfo(videoJson);
    dispatch(addVideoInHistory(createVideoDetailObject(videoJson?.items?.[0])));

    const channelOptions = {
      part: "snippet,contentDetails,statistics",
      id: videoJson?.items?.[0]?.snippet?.channelId,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const channelData = await fetch(
      `${YOUTUBE_API_URL}/channels?` + new URLSearchParams(channelOptions)
    );
    const channelJson = await channelData.json();
    setChannelInfo(channelJson);
  };

  useEffect(() => {
    getChannelAndVideoDetails();
  }, [searchParams.get("v")]);

  if (!channelInfo && !videoInfo) return;

  return (
    <div className="laptop:w-[95%]">
      <ChannelDetail
        channelDetail={channelInfo?.items?.[0]}
        videoDetail={videoInfo?.items?.[0]}
      />
    </div>
  );
};

const ChannelDetail = ({ channelDetail, videoDetail }) => {
  const dispatch = useDispatch();

  const savedVideo = useSelector((store) => store.video.watchLaterVideo);
  const videoWatchLater =
    savedVideo.findIndex((video) => video?.id == videoDetail?.id) > -1;
  const showMoreForMobile = useSelector((store) => store.app.showMore);
  const showcommentForMobile = useSelector((store) => store.app.showComment);
  const videoPublishDate = moment(videoDetail?.snippet?.publishedAt).fromNow();
  const viewCount = viewSubCount(videoDetail?.statistics?.viewCount);
  const subCount = viewSubCount(channelDetail?.statistics?.subscriberCount);
  const likeCount = viewSubCount(videoDetail?.statistics?.likeCount);

  const handleWatchLater = () => {
    videoWatchLater
      ? dispatch(removeVideoFromWatchLater(videoDetail?.id))
      : dispatch(addVideoInWatchLater(createVideoDetailObject(videoDetail)));
  };

  return (
    <div className="font-Roboto mt-[10px] relative">
      <div>
        <p className="font-medium text-[20px]">{videoDetail?.snippet?.title}</p>
        <div className="laptop:hidden flex gap-x-[5px] text-[13px]">
          <p>{viewCount + " views"}</p>
          <p>{videoPublishDate}</p>
          <p
            onClick={() => {
              dispatch(toggleShowMore());
            }}
          >
            ...more
          </p>
        </div>
      </div>

      <div className="mt-[10px] laptop::flex laptop:flex-col">
        <div className="tablet:flex justify-between items-center">
          <div className=" flex justify-between items-center tablet:gap-x-[35px]">
            <div className="flex items-center gap-x-[10px]">
              <div>
                <ImgLazyLoad
                  src={channelDetail?.snippet?.thumbnails?.high?.url}
                  style="h-[40px] w-[40px] rounded-full object-cover"
                />
              </div>
              <div className="flex tablet:flex-col tablet:items-start gap-x-[5px] items-center">
                <p className="text-[14px] font-medium">
                  {channelDetail?.snippet?.title}
                </p>
                <p className="text-[13px]">{subCount}</p>
              </div>
            </div>
            <div className="cursor-pointer bg-black px-[8px] py-[2px] rounded-3xl text-white text-[17px] tablet:px-[10px] tablet:py-[6px]">
              Subscribe
            </div>
          </div>

          <div className="flex gap-x-[15px] mt-[10px] tablet:mt-0 py-[2px]">
            <div className="cursor-pointer bg-lightWhite flex gap-x-[5px] items-center px-[10px] py-[6px] rounded-3xl">
              <img className="h-[25px]" src={likeIcon} />
              <p className="text-[17px]">{likeCount}</p>
            </div>
            <div
              onClick={() => {
                handleWatchLater();
              }}
              className="cursor-pointer bg-lightWhite flex gap-x-[5px] items-center px-[10px] py-[6px] rounded-3xl"
            >
              {videoWatchLater ? (
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  viewBox="-6 -6 72.00 72.00"
                  stroke="#000000"
                  strokeWidth="1.2"
                  className="h-[25px]"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.12"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>{" "}
                      <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>{" "}
                    </g>
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-[25px]">
                  <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>
                </svg>
              )}

              <p className="text-[17px]">Watch Later</p>
            </div>
          </div>
        </div>

        <div
          className="laptop:hidden mt-[10px] border-t border-b"
          onClick={() => {
            dispatch(toggleShowComment());
          }}
        >
          <p className="font-medium text-[17px]">Comments</p>
        </div>

        <div className="hidden laptop:block bg-lightWhite mt-[20px] py-[5px] rounded-md cursor-pointer">
          <DescriptionDetail desc={videoDetail?.snippet?.description} />
        </div>
        <div className="hidden laptop:block">
          <CommentModel videoId={videoDetail?.id} />
        </div>
      </div>
      {showMoreForMobile && (
        <div className="laptop:hidden absolute top-0 bottom-0 bg-white h-[430px] w-full border shadow-lg rounded-md">
          <DescriptionDetail desc={videoDetail?.snippet?.description} />
        </div>
      )}

      {showcommentForMobile && (
        <div className="laptop:hidden absolute top-0 bottom-0 bg-white h-[430px] w-full border shadow-lg rounded-md">
          <CommentModel videoId={videoDetail?.id} />
        </div>
      )}
    </div>
  );
};

export default CommentDetails;
