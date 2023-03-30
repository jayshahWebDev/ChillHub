import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const WatchLater = () => {
  const watchLaterVideos = useSelector((store) => store.video.watchLaterVideo);

  return watchLaterVideos.length <= 0 ? (
    <div className="text-[25px] mt-[40px] w-full text-center">
      No video available
    </div>
  ) : (
    <div className="mx-[4%] mt-[2%] laptop:mt-[1%] w-full flex flex-col gap-y-[20px]">
      {watchLaterVideos?.map((video) => (
        <VideoCard key={video?.id} videoDetail={video} />
      ))}
    </div>
  );
};

export default WatchLater;
