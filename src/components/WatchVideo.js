import RelatedVideo from "./RelatedVideo";
import VideoDetails from "./VideoDetails";

const WatchVideo = () => {
  return (
    <div className="mx-[2%] mt-[2%] tablet:mt-[1%] flex flex-col laptop:flex-row border-[1px] w-full">
      <VideoDetails />
      <RelatedVideo />
    </div>
  );
};

export default WatchVideo;
