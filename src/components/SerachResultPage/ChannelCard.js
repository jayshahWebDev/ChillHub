import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import { viewSubCount } from "../../utils/commonFunctions";
import { Link } from "react-router-dom";

const ChannelCard = ({ channelInfo }) => {
  const [channelDetails, setChannelDetails] = useState(null);

  const getChannelDetails = async () => {
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
  };

  useEffect(() => {
    getChannelDetails();
  }, []);

  if (!channelDetails) return;

  const subscriberCount = viewSubCount(
    channelDetails?.statistics?.subscriberCount
  );

  return (
    <>
      <Link
        to={`/channel/${channelInfo?.id?.channelId}`}
        className="font-Roboto w-full flex justify-center items-center gap-x-[25px]"
      >
        <div className="tablet:w-[20%]">
          <img
            className="h-[70px] w-[70px] tablet:h-[100px] tablet:w-[100px] object-cover rounded-full"
            src={channelInfo?.snippet?.thumbnails?.high?.url}
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
