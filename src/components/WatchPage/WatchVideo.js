import RelatedVideo from "./RelatedVideo";
import VideoDetails from "./VideoDetails";

const WatchVideo = () => {
  window.scrollTo({ top: 0 });

  return (
    <div className="mx-[2%] mt-[2%] tablet:mt-[1%] flex flex-col laptop:flex-row w-full">
      <VideoDetails />
      <RelatedVideo />
    </div>
  );
};

export default WatchVideo;
