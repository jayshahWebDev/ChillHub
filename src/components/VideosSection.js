import React, { useState } from "react";

const VideosSection = () => {
  const [videoSort, setVideoSort] = useState("date");

  return (
    <div className="mt-[2%] laptop:mt-[1%]">
      <div className="flex gap-x-[20px]">
        <button
          onClick={() => setVideoSort("date")}
          className={`bg-lightWhite hover:bg-slate-200 px-[10px] py-[4px] rounded-md`}
        >
          Recently uploaded
        </button>

        <button
          onClick={() => setVideoSort("viewCount")}
          className={`bg-lightWhite hover:bg-slate-200 px-[10px] py-[4px] rounded-md`}
        >
          Popular
        </button>
      </div>
    </div>
  );
};

export default VideosSection;
