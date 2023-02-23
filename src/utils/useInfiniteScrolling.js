import { useEffect, useState } from "react";

const useInfiniteScrolling = () => {
  console.log("useInfiniteScrolling");
  // console.log("InfiniteScrolling::", token);
  const [fetchApi, setFetchApi] = useState(false);
  //   console.log("InfiniteScrolling   pageToken:::", pageToken);
  const handleScroll = () => {
    console.log("handleScroll")
    if (fetchApi) {
      console.log("inside if fetch")
      setFetchApi(false);
      return
    }
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      // console.log("hit bottom", token);
      // setPageToken(token);

      console.log("inside if fetchApi", fetchApi);
      setFetchApi(true);
    }

    // else if (fetchApi) {
    //   console.log("inside else if fetchApi",fetchApi);
    //   setFetchApi(false);
    // }
  };

  useEffect(() => {
    // console.log("useEffectToken::", token);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return fetchApi;
};

export default useInfiniteScrolling;
