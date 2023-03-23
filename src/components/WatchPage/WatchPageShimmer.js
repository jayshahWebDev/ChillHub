const WatchPageShimmer = () => {
  return (
    <div className="laptop:w-[25%]">
      {Array(15)
        .fill("")
        .map((v, i) => (
          <div
            key={i}
            className="mt-[10px] font-Roboto desktop:flex gap-x-[5px]"
          >
            <div className="w-full desktop:w-[40%]">
              <div className="bg-shimmerColor w-full h-[200px] tablet:h-[350px] laptop:h-[150px] desktop:h-[100px] object-cover rounded-[10px]" />
            </div>
            <div className="desktop:w-[60%]">
              <p className="h-[15px] w-[98%] mt-[10px] bg-shimmerColor"></p>
              <div className="flex laptop:flex-col gap-x-[8px] laptop:gap-x-0 items-center laptop:items-start">
                <p className="w-[60%] h-[15px] mt-[15px] bg-shimmerColor"></p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WatchPageShimmer;
