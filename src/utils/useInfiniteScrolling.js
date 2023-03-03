import { useEffect, useState } from "react";

const useInfiniteScrolling = (cb) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    cb();
  }, [isFetching]);

  function isScrolling() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setIsFetching(true);
    }
  }
  return [isFetching, setIsFetching];
};

export default useInfiniteScrolling;
