import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  convertDurationInHMS,
  viewSubCount,
} from "../../utils/commonFunctions";
import { YOUTUBE_API_URL } from "../../utils/constatnt";

const VideoCard = ({ info }) => {
  const [channel, setChannel] = useState(null);
  const navigate = useNavigate();

  const videoLength = convertDurationInHMS(info?.contentDetails?.duration);

  const videoPublishDate = moment(info?.snippet?.publishedAt).fromNow();

  const viewCount = viewSubCount(info?.statistics?.viewCount);

  const getChannelDetail = async () => {
    const options = {
      part: "snippet,contentDetails,statistics",
      id: info?.snippet?.channelId,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const channelDetails = await fetch(
      `${YOUTUBE_API_URL}/channels?` + new URLSearchParams(options)
    );
    const channelDetailsJson = await channelDetails.json();
    setChannel(channelDetailsJson);
  };

  useEffect(() => {
    getChannelDetail();
  }, []);

  return (
    <Link to={`/watch?v=${info?.id}`}>
      <div className="flex flex-col gap-y-[10px] font-Roboto cursor-pointer">
        <div className="relative">
          <img
            src={info?.snippet?.thumbnails?.standard?.url}
            className="h-[180px] w-[300px] rounded-[10px] object-cover"
          />

          <div className="bg-black absolute right-1 bottom-2 rounded-[5px] px-[6px] py-[2px]">
            <p className="text-[12px] font-medium text-white">{videoLength}</p>
          </div>
        </div>
        <div className="flex gap-x-[10px]">
          <div>
            <img
              src={channel?.items?.[0]?.snippet?.thumbnails?.high?.url}
              className="h-[40px] w-[40px] rounded-full border-[1px]"
              onClick={(e) => {
                e.preventDefault();
                navigate(`channel/${info?.snippet?.channelId}/home`);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="line-clamp-2 w-[240px] text-[15px] font-medium">
              {info?.snippet?.title}
            </p>

            <div className="flex flex-col text-[13px]">
              <p className="">{info?.snippet?.channelTitle}</p>
              <div className="flex gap-x-[10px]">
                <p>{viewCount}</p>
                <p>{videoPublishDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
