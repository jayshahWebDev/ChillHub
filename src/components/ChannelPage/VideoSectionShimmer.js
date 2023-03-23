const VideoSectionShimmer = () => {
  return (
    <div className="flex mt-[2%] justify-center items-center flex-wrap gap-x-[20px] gap-y-[20px]">
      {Array(10)
        .fill("")
        .map((v, i) => (
          <div key={i}>
            <div className="flex flex-col gap-y-[10px]">
              <div className="relative">
                <div className="h-[180px] w-[300px] rounded-[10px] bg-shimmerColor" />
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <div className="w-[200px] h-[10px] bg-shimmerColor"></div>
                <div className="w-[150px] h-[10px] bg-shimmerColor"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VideoSectionShimmer;
