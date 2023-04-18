import { Link, Outlet, useParams } from "react-router-dom";

const ChannelSection = ({ trailerDetail }) => {
  const { id } = useParams();

  return (
    <div className="mt-[10px]">
      <div className="flex gap-x-[20px] font-Roboto">
        <Link to={`/channel/${id}/home`}>
          <p
            className={`${
              window.location.href.includes("home")
                ? "bg-lightWhite text-black"
                : "text-gray-600"
            } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black font-medium`}
          >
            HOME
          </p>
        </Link>
        <Link to={`/channel/${id}/videos`}>
          <p
            className={`${
              window.location.href.includes("videos")
                ? "bg-lightWhite text-black"
                : "text-gray-600"
            } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black  font-medium`}
          >
            VIDEOS
          </p>
        </Link>
        <Link to={`/channel/${id}/channels`}>
          <p
            className={`${
              window.location.href.includes("channels")
                ? "bg-lightWhite text-black"
                : "text-gray-600"
            } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black font-medium`}
          >
            CHANNELS
          </p>
        </Link>
      </div>
      <hr className="mt-[10px]" />
      <Outlet context={[trailerDetail]} />
    </div>
  );
};

export default ChannelSection;
