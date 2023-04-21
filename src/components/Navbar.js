import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  selectCategory,
  setVideoCategory,
  toggleMenu,
  toggleMobileSearchBar,
} from "../utils/appSlice";
import { caching } from "../utils/searchSlice";
import logo from "../../assets/logo.png";
import ErrorPage from "../ErrorPage";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionSearch, setSuggestionSearch] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [error, setError] = useState(false);
  const [search] = useSearchParams();

  const isMobileSearchOpen = useSelector((store) => {
    return store.app.isMobileSearchBarOpen;
  });

  const dispatch = useDispatch();

  const searchCache = useSelector((store) => store.search);

  const toggleSideBar = () => {
    dispatch(toggleMenu());
  };

  const getSuggestionOfSearch = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "youtube-v38.p.rapidapi.com",
        },
      };

      let data = await fetch(
        `https://youtube-v38.p.rapidapi.com/auto-complete/?q=${searchQuery}&hl=en&gl=US`,
        options
      );
      let jsonData = await data.json();
      const filterArray = jsonData?.results?.slice(0, 11);
      setSuggestionSearch(filterArray);
      dispatch(caching({ [searchQuery]: filterArray }));
    } catch (error) {
      setError(true);
    }
  };

  if (error) return <ErrorPage />;

  useEffect(() => {
    if (search.get("q")) setSearchQuery(search.get("q"));
  }, []);

  useEffect(() => {
    if (!showSuggestion) return;
    const timer = setTimeout(() => {
      searchCache[searchQuery]
        ? setSuggestionSearch(searchCache[searchQuery])
        : getSuggestionOfSearch();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="sticky top-0 bg-white z-50 shadow-md">
      <div className="flex justify-between items-center mx-[2%] h-[60px]">
        <div className="flex gap-x-[10px] items-center">
          <svg
            onClick={() => {
              toggleSideBar();
            }}
            viewBox="0 0 24 24"
            className="h-[30px] cursor-pointer"
          >
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
          </svg>
          <Link
            to="/"
            onClick={() => {
              dispatch(selectCategory("Home"));
              dispatch(setVideoCategory(0));
            }}
          >
            <div className="flex gap-x-[5px] justify-center items-center cursor-pointer">
              <img src={logo} className="h-[35px]" />
              <p className="font-Roboto font-semibold tracking-tight text-[20px]">
                ChillHub
              </p>
            </div>
          </Link>
        </div>

        {/* ONLY FOR MOBILE */}
        {isMobileSearchOpen && (
          <div className="laptop:hidden absolute w-[96%] mx-0 h-[50px] bg-white mt-[2%] tablet:mt-[1%]">
            <div className="relative flex justify-center">
              <input
                type="text"
                placeholder="Search"
                className="px-[10px] py-[5px] w-[80%] rounded-l-full outline-none focus:border-blue-400 border-[1px]"
                value={searchQuery}
                onChange={(e) => {
                  setShowSuggestion(true);
                  setSearchQuery(e.target.value);
                }}
              />

              {suggestionSearch && suggestionSearch.length > 0 && (
                <div className="absolute w-[80%] left-[5%] tablet:left-[7%] flex flex-col bg-white py-2 border shadow-md top-9 rounded-md">
                  {suggestionSearch.map((query, index) => (
                    <Link
                      to={`search?q=${query}`}
                      key={index}
                      onClick={(e) => {
                        setSearchQuery(query);
                        setShowSuggestion(false);
                        dispatch(toggleMobileSearchBar());
                      }}
                    >
                      <div className="hover:bg-gray-200 py-1 px-3 cursor-context-menu">
                        {query}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to={`search?q=${searchQuery}`}
                className="border-[1px] flex justify-center items-center px-[10px] rounded-r-full bg-serchButtonBg"
              >
                <svg viewBox="0 0 24 24" className="h-[25px]">
                  <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
                </svg>
              </Link>
            </div>
          </div>
        )}

        <div className="hidden relative laptop:flex">
          <input
            type="text"
            placeholder="Search"
            className="px-[10px] py-[5px] outline-none focus:border-blue-400 border-[1px] w-[350px] rounded-l-full desktop:w-[450px]"
            value={searchQuery}
            onChange={(e) => {
              if (!showSuggestion) {
                setShowSuggestion(true);
              }
              setSearchQuery(e.target.value);
            }}
          />
          <Link
            to={`search?q=${searchQuery}`}
            onClick={() => {
              setSuggestionSearch(null);
            }}
            className="border-[1px] flex justify-center items-center px-[10px] rounded-r-full bg-serchButtonBg cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="h-[25px]">
              <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
            </svg>
          </Link>

          {/* <div className="absolute w-[350px] desktop:w-[450px] flex justify-center items-center top-9 rounded-[10px]">
          <div className="bg-white shadow-lg w-[340px] desktop:w-[440px] border-[1px] h-[50px] rounded-[10px]"></div>
          </div> */}
          {suggestionSearch && suggestionSearch.length > 0 && (
            <div className="absolute top-9 bg-white w-[350px] desktop:w-[450px] py-2 border rounded-md shadow-md">
              {suggestionSearch.map((query, index) => (
                <Link
                  to={`search?q=${query}`}
                  key={index}
                  onClick={() => {
                    setSearchQuery(query);
                    setShowSuggestion(false);
                    setSuggestionSearch(null);
                  }}
                >
                  <div className="hover:bg-gray-200 py-1 px-3 cursor-context-menu">
                    {query}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-x-[10px] items-center">
          <svg
            viewBox="0 0 24 24"
            className="h-[30px] laptop:hidden cursor-pointer"
            onClick={() => {
              dispatch(toggleMobileSearchBar());
            }}
          >
            <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
          </svg>

          <svg
            viewBox="0 0 24 24"
            className="hidden laptop:block h-[30px] cursor-pointer"
          >
            <path d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z"></path>
          </svg>

          <svg
            viewBox="0 0 24 24"
            className="hidden laptop:block h-[30px] cursor-pointer"
          >
            <path d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"></path>
          </svg>

          <div className="h-[35px] w-[35px] rounded-full bg-lightGray flex justify-center items-center cursor-pointer">
            <p className="font-Roboto font-semibold text-[20px] text-white">
              J
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
