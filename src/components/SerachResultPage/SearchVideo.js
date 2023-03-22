import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchVideo = () => {
  const [searchQuery] = useSearchParams();

  return (
    <div>
      <h1>SearchVideo::{searchQuery.get("q")}</h1>
    </div>
  );
};

export default SearchVideo;
