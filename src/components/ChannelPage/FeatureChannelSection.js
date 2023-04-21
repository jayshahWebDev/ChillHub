import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import { viewSubCount } from "../../utils/commonFunctions";
import ImgLazyLoad from "../ImgLazyLoad";
import ErrorPage from "../../ErrorPage";

const FeatureChannelSection = () => {
  const [featureChannel, setFeatureChannel] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const getFeatureChannelData = async () => {
    try {
      const options = {
        part: "contentDetails,snippet",
        channelId: id,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };

      const data = await fetch(
        `${YOUTUBE_API_URL}/channelSections?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      const filterChannels = jsonData?.items?.filter((data) => {
        if (data?.snippet?.type === "multiplechannels") {
          return data?.contentDetails?.channels;
        }
      });
      setFeatureChannel(filterChannels);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getFeatureChannelData();
  }, []);

  if (error) return <ErrorPage />;
  if (!featureChannel) return;

  return (
    <div className="mt-[2%] laptop:mt-[1%] tablet:flex tablet:flex-wrap tablet:gap-x-[25px]">
      {featureChannel && featureChannel.length > 0 ? (
        featureChannel?.[0]?.contentDetails?.channels?.map((id) => (
          <ChannelCard key={id} id={id} />
        ))
      ) : (
        <div className="font-Roboto flex justify-center items-center w-full">
          <p>This channel doesn't feature any other channels.</p>
        </div>
      )}
    </div>
  );
};

export const ChannelCard = ({ id }) => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [error, setError] = useState(false);

  const getChannelDetails = async () => {
    try {
      const options = {
        part: "snippet,statistics",
        id,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };

      const data = await fetch(
        `${YOUTUBE_API_URL}/channels?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      setChannelDetail(jsonData?.items?.[0]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getChannelDetails();
  }, []);

  if (error) return <ErrorPage />;

  const getSubCount = viewSubCount(channelDetail?.statistics?.subscriberCount);

  return (
    <div className="flex gap-x-[15%] items-center mt-[20px] tablet:flex-col">
      <div>
        <ImgLazyLoad
          src={channelDetail?.snippet?.thumbnails?.high?.url}
          style="w-[60px] h-[60px] tablet:w-[100px] tablet:h-[100px] rounded-full"
        />
      </div>
      <div className="font-Roboto">
        <p className="text-[15px] tablet:text-center">
          {channelDetail?.snippet?.title}
        </p>
        <p className="text-[12px] tablet:text-center text-gray-500">{`${getSubCount} subscribers`}</p>
        <p className="text-[15px] tablet:text-center uppercase text-red-700 font-medium tablet:mt-[10px]">
          Subscribe
        </p>
      </div>
    </div>
  );
};

export default FeatureChannelSection;
