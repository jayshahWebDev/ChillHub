const VideoContainerShimmer = () => {
  return (
    <div
      className={`mx-[2%] w-full mt-[2%] flex flex-wrap justify-center gap-x-[20px] gap-y-[20px]`}
    >
      {Array(20)
        .fill("")
        .map((v, i) => (
          <div key={i} className="flex flex-col gap-y-[10px]">
            <div className="h-[180px] w-[300px] rounded-[10px] bg-shimmerColor"></div>

            <div className="flex gap-x-[10px] items-center">
              <div>
                <div className="h-[40px] w-[40px] rounded-full border-[1px] bg-shimmerColor"></div>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="w-[200px] h-[10px] bg-shimmerColor"></div>
                <div className="w-[150px] h-[10px] bg-shimmerColor"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VideoContainerShimmer;
