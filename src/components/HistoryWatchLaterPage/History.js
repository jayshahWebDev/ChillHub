import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const History = () => {
  const videoList = useSelector((store) => store.video.videoHistory);

  return videoList.length <= 0 ? (
    <div className="text-[25px] mt-[40px] w-full text-center">
      No video available
    </div>
  ) : (
    <div className="mx-[4%] mt-[2%] laptop:mt-[1%] w-full flex flex-col gap-y-[20px]">
      {videoList?.map((video) => (
        <VideoCard key={video?.id} videoDetail={video} />
      ))}
    </div>
  );
};

export default History;
