import { Link } from "react-router-dom";
import notFound from "../assets/notFound.jpg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center font-Roboto">
      <div>
        <img className="h-[200px] laptop:h-[400px]" src={notFound} />
      </div>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[25px]">Please Check Your URL</h1>
        <h2 className="my-[15px] text-[20px]">OR</h2>
        <Link
          to={"/"}
          className="text-[20px] bg-[#ff4f5a] text-white px-[10px] py-[4px] rounded-md"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
