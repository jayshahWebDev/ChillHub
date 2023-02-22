import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YOUTUBE_API_URL } from "../utils/constatnt";
import ChannelDetailCard from "./ChannelDetailCard";
import ChannelSection from "./ChannelSection";

const ChannelPage = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);

  const getChanneDetails = async () => {
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
  };

  useEffect(() => {
    getChanneDetails();
  }, []);

  return (
    <div className="mx-[2%] mt-[2%] w-full">
      <ChannelDetailCard channelInfo={channelDetail} />
      <ChannelSection />
    </div>
  );
};

export default ChannelPage;
