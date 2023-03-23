const SearchPageShimmer = () => {
  return (
    <div className="mx-[4%] mt-[2%] laptop:mt-[1%] w-full flex flex-col justify-center items-center">
      <div className="w-full gap-y-[10px] laptop:w-[80%] flex flex-col justify-center items-center tablet:items-start tablet:gap-y-[20px]">
        {Array(20)
          .fill("")
          .map((v, i) => (
            <div key={i} className="tablet:flex tablet:w-full">
              <div className="tablet:w-[44%] laptop:w-[41%] desktop:w-[30%]">
                <div className="bg-shimmerColor h-[200px] w-[350px] tablet:h-[180px] tablet:w-[300px] rounded-[10px]"></div>
              </div>
              <div className="tablet:w-[56%] laptop:w-[59%] desktop:w-[70%]">
                <p className="w-[350px] mt-[10px] h-[15px] bg-shimmerColor tablet:w-full tablet:mt-[30px]"></p>
                <div className="w-[260px] h-[15px] mt-[15px] bg-shimmerColor flex justify-between tablet:w-[170px]"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPageShimmer;
