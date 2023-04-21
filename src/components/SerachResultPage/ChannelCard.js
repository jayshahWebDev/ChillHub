import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import { viewSubCount } from "../../utils/commonFunctions";
import { Link } from "react-router-dom";
import ImgLazyLoad from "../ImgLazyLoad";
import ErrorPage from "../../ErrorPage";

const ChannelCard = ({ channelInfo }) => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [error, setError] = useState(false);

  const getChannelDetails = async () => {
    try {
      let options = {
        part: "snippet,statistics",
        id: channelInfo?.id?.channelId,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      let data = await fetch(
        `${YOUTUBE_API_URL}/channels?` + new URLSearchParams(options)
      );
      let jsonData = await data.json();
      setChannelDetails(jsonData?.items?.[0]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getChannelDetails();
  }, []);

  if (error) return <ErrorPage />;
  if (!channelDetails) return;

  const subscriberCount = viewSubCount(
    channelDetails?.statistics?.subscriberCount
  );

  return (
    <>
      <Link
        to={`/channel/${channelInfo?.id?.channelId}/home`}
        className="font-Roboto w-full flex justify-center items-center gap-x-[25px]"
      >
        <div className="tablet:w-[20%]">
          <ImgLazyLoad
            src={channelInfo?.snippet?.thumbnails?.high?.url}
            style="h-[70px] w-[70px] tablet:h-[100px] tablet:w-[100px] object-cover rounded-full"
          />
        </div>
        <div className="tablet:w-[80%]">
          <p className="font-medium">{channelInfo?.snippet?.title}</p>
          <div className="text-[13px] tablet:flex tablet:gap-x-[10px]">
            <p>{channelDetails?.snippet?.customUrl}</p>
            <p>{`${subscriberCount} subscribers`}</p>
          </div>
          <p className="hidden tablet:block text-[13px]">
            {channelInfo?.snippet?.description}
          </p>
        </div>
      </Link>

      <hr className="h-[3px]  w-full" />
    </>
  );
};

export default ChannelCard;
