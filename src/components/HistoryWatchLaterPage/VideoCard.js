import { useDispatch } from "react-redux";
import {
  convertDurationInHMS,
  viewSubCount,
} from "../../utils/commonFunctions";
import { removeVideoFromWatchLater } from "../../utils/videoSlice";
import ImgLazyLoad from "../ImgLazyLoad";

const VideoCard = ({ videoDetail }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-x-[10px] font-Roboto w-fit">
      <div className="relative">
        <ImgLazyLoad
          src={videoDetail?.thumbnail}
          style="h-[100px] w-[250px] tablet:h-[140px] tablet:w-[220px] rounded-[10px] object-cover"
        />
        <p className="absolute bottom-1 text-white right-1 text-[12px] font-medium rounded-[5px] px-[6px] py-[2px] bg-black">
          {convertDurationInHMS(videoDetail?.duration)}
        </p>
      </div>
      <div>
        <p className="text-[15px] tablet:text-[18px] line-clamp-3 tablet:line-clamp-2 w-[200px] tablet:w-[500px]">
          {videoDetail?.title}
        </p>
        <div className="flex justify-between tablet:justify-start items-center gap-x-[10px]">
          <div className="tablet:flex tablet:gap-x-[10px]">
            <p className="text-[14px]">{videoDetail?.channelName}</p>
            <p className="text-[14px]">{viewSubCount(videoDetail?.view)}</p>
          </div>
          {window.location.href.includes("watchLater") && (
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                fill="#ffffff"
                className="h-[25px] rounded-md bg-black px-[4px] py-[4px]"
                onClick={() =>
                  dispatch(removeVideoFromWatchLater(videoDetail?.id))
                }
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
            </div>
          )}
        </div>
        <p className="hidden tablet:block tablet:w-[500px] text-[14px] max-h-[40px] overflow-hidden mt-[5px]">
          {videoDetail?.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
