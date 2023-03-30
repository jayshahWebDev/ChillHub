import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCategory,
  setVideoCategory,
  toggleMenu,
} from "../utils/appSlice";
import { categories } from "../utils/constatnt";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const ismenuOpen = useSelector((store) => {
    return store.app.ismenuOpen;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    dispatch(toggleMenu());
  };

  const selectedCategory = useSelector((store) => store.app.selectedCategory);
  if (!ismenuOpen) return null;

  return (
    <div className="fixed top-[62px] desktop:sticky  h-[calc(100vh-62px)] z-50 bg-white w-[44%] tablet:w-[30%] laptop:w-[25%] desktop:w-[15%]">
      {/* <div className="desktop:hidden">
        <div className=" flex gap-x-[10px] items-center ml-[7%] tablet:ml-[7%] laptop:ml-[8%] h-[60px]">
          <svg
            onClick={() => {
              toggleSideBar();
            }}
            viewBox="0 0 24 24"
            className="h-[30px] cursor-pointer"
          >
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
          </svg>
          <div className="flex gap-x-[5px] justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ff0000"
              className="h-[30px]"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            <p className="font-Poppins font-semibold tracking-tight text-[20px]">
              Youtube
            </p>
          </div>
        </div>
      </div> */}

      <div className="mt-[4%]">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => {
              dispatch(selectCategory(category.name));
              if (category?.videoCategoryId) {
                dispatch(setVideoCategory(category.videoCategoryId));
                navigate("/");
              } else if (category?.name == "History") {
                navigate("/history");
              } else if (category?.name == "Watch Later") {
                navigate("/watchLater");
              }
            }}
          >
            <SidebarItem
              name={category?.name}
              category={selectedCategory}
              path={category?.path}
              selectedPath={category?.selcted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
