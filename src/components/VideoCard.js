import moment from "moment/moment";
import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../utils/constatnt";

const VideoCard = ({ info }) => {
  console.log("info::", info);
  const [channel, setChannel] = useState(null);

  const videoLength = info?.contentDetails?.duration
    ?.replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "");

  const videoPublishDate = moment(info?.snippet?.publishedAt).fromNow();

  let viewCount;
  if (info?.statistics?.viewCount >= 1000000000) {
    viewCount =
      new Intl.NumberFormat().format(
        (info?.statistics?.viewCount / 1000000000).toFixed(2)
      ) + "B";
  } else if (info?.statistics?.viewCount >= 1000000) {
    viewCount =
      new Intl.NumberFormat().format(
        (info?.statistics?.viewCount / 1000000).toFixed(2)
      ) + "M";
  } else if (info?.statistics?.viewCount >= 1000) {
    viewCount =
      new Intl.NumberFormat().format(
        (info?.statistics?.viewCount / 1000).toFixed(2)
      ) + "K";
  }
  console.log("viewCount::", viewCount);

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
    // console.log("channelDetailsJson::", channelDetailsJson);
    setChannel(channelDetailsJson);
  };

  console.log("channel:::", channel);

  useEffect(() => {
    getChannelDetail();
  }, []);

  return (
    <div className="flex flex-col gap-y-[10px] font-Poppins cursor-pointer">
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
  );
};

export default VideoCard;
