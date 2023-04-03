import { viewSubCount } from "../../utils/commonFunctions";
import ImgLazyLoad from "../ImgLazyLoad";

const ChannelDetailCard = ({ channelInfo }) => {
  const getSubCount = viewSubCount(
    channelInfo?.items?.[0]?.statistics?.subscriberCount
  );
  return (
    <div className="font-Roboto">
      <div>
        <ImgLazyLoad
          src={
            channelInfo?.items?.[0]?.brandingSettings?.image?.bannerExternalUrl
          }
          style="h-[60px] tablet:h-[80px] laptop:h-[120px] desktop:h-[190px] w-full object-cover"
        />
      </div>
      <div className="flex flex-col tablet:flex-row gap-y-[8px] justify-center tablet:justify-between items-center">
        <div className="mt-[10px] flex flex-col tablet:flex-row tablet:gap-x-[10px] justify-center items-center ">
          <div>
            <ImgLazyLoad
              src={channelInfo?.items?.[0]?.snippet?.thumbnails?.high?.url}
              style="h-[60px] w-[60px] tablet:h-[80px] tablet:w-[80px] rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-center tablet:text-start font-bold text-base">
              {channelInfo?.items?.[0]?.snippet?.title}
            </p>
            <div className="flex tablet:flex-col gap-x-[10px] tablet:gap-x-0 text-sm">
              <p>{getSubCount + " subscribers"}</p>
              <p>
                {channelInfo?.items?.[0]?.statistics?.videoCount + " videos"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className="bg-black py-[4px] px-[10px] text-base rounded-[10px] text-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailCard;
