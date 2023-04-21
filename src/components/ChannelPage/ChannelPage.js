import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import ChannelDetailCard from "./ChannelDetailCard";
import ChannelSection from "./ChannelSection";
import ErrorPage from "../../ErrorPage";

const ChannelPage = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [error, setError] = useState(false);

  const getChanneDetails = async () => {
    try {
      const options = {
        part: "snippet,contentDetails,statistics,brandingSettings",
        id,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      const data = await fetch(
        `${YOUTUBE_API_URL}/channels?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      setChannelDetail(jsonData);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getChanneDetails();
  }, []);

  if (error) return <ErrorPage />;

  return (
    <div className="mx-[2%] mt-[2%] w-full">
      <ChannelDetailCard channelInfo={channelDetail} />
      <ChannelSection
        trailerDetail={
          channelDetail?.items?.[0]?.brandingSettings?.channel
            ?.unsubscribedTrailer
        }
      />
    </div>
  );
};

export default ChannelPage;
