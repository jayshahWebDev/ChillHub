import { useSearchParams } from "react-router-dom";
import CommentDetails from "./CommentDetails";

const VideoDetails = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="laptop:w-[75%]">
      <iframe
        src={
          "https://www.youtube.com/embed/" +
          searchParams.get("v") +
          "?autoplay=1"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-[100%] h-[250px] tablet:h-[400px] desktop:h-[600px] laptop:w-[95%]"
      ></iframe>
      <CommentDetails />
    </div>
  );
};

export default VideoDetails;
