import { useSearchParams } from "react-router-dom";

const VideoDetails = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="w-[75%]">
      <iframe
        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-[100%] h-[250px] tablet:h-[400px] laptop:w-[95%]"
      ></iframe>
    </div>
  );
};

export default VideoDetails;
