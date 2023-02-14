import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    dispatch(toggleMenu());
  };
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

      {/* ONLY FOR MOBILE */}
      {/* <div className="laptop:hidden absolute w-[96%] mx-0 h-[50px] bg-white mt-[2%] tablet:mt-[1%]">
        <div className="relative flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="px-[10px] py-[5px] border-[1px] w-[80%] rounded-l-full"
          />

          <div className="absolute w-[80%] left-[5%] tablet:left-[7%] flex justify-center items-center top-9 rounded-[10px]">
            <div className="bg-white shadow-lg w-full border-[1px] h-[50px] rounded-[10px]"></div>
          </div>

          <div className="border-[1px] flex justify-center items-center px-[10px] rounded-r-full bg-serchButtonBg">
            <svg viewBox="0 0 24 24" className="h-[25px]">
              <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
            </svg>
          </div>
        </div>
      </div> */}

      <div className="hidden relative laptop:flex">
        <input
          type="text"
          placeholder="Search"
          className="px-[10px] py-[5px] border-[1px] w-[350px] rounded-l-full desktop:w-[450px]"
        />

        {/* <div className="absolute w-[350px] desktop:w-[450px] flex justify-center items-center top-9 rounded-[10px]">
          <div className="bg-white shadow-lg w-[340px] desktop:w-[440px] border-[1px] h-[50px] rounded-[10px]"></div>
        </div> */}

        <div className="border-[1px] flex justify-center items-center px-[10px] rounded-r-full bg-serchButtonBg cursor-pointer">
          <svg viewBox="0 0 24 24" className="h-[25px]">
            <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
          </svg>
        </div>
      </div>

      <div className="flex gap-x-[10px] items-center">
        <svg
          viewBox="0 0 24 24"
          className="h-[30px] laptop:hidden cursor-pointer"
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
          <p className="font-Poppins font-semibold text-[20px] text-white">J</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
