import { useState } from "react";
import FeatureChannelSection from "./FeatureChannelSection";
import HomeSection from "./HomeSection";
import VideosSection from "./VideosSection";

const ChannelSection = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  const renderComponents = () => {
    switch (selectedSection) {
      case 0:
        return <HomeSection />;

      case 1:
        return <VideosSection />;

      case 2:
        return <FeatureChannelSection />;

      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="mt-[10px]">
      <div className="flex gap-x-[20px] font-Poppins">
        <p
          onClick={() => setSelectedSection(0)}
          className={`${
            selectedSection == 0 ? "bg-lightWhite text-black" : "text-gray-600"
          } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black font-medium`}
        >
          HOME
        </p>
        <p
          onClick={() => setSelectedSection(1)}
          className={`${
            selectedSection == 1 ? "bg-lightWhite text-black" : "text-gray-600"
          } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black  font-medium`}
        >
          VIDEOS
        </p>
        <p
          onClick={() => setSelectedSection(2)}
          className={`${
            selectedSection == 2 ? "bg-lightWhite text-black" : "text-gray-600"
          } hover:bg-lightWhite px-[10px] py-[4px] rounded-md cursor-pointer hover:text-black font-medium`}
        >
          CHANNELS
        </p>
      </div>
      <hr className="mt-[10px]" />
      <div>{renderComponents()}</div>
    </div>
  );
};

export default ChannelSection;
