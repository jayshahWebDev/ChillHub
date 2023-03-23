import sadEmoji from "../assets/sadEmojiIcon.png";

const ErrorPage = () => {
  return (
    <div className="absolute font-Roboto border shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white">
      <div className="h-[180px] bg-red-400 flex flex-col justify-center items-center gap-y-[10px]">
        <img className="h-[90px]" src={sadEmoji} />
        <p className="text-[19px] text-white">API limit has been exceeded</p>
      </div>
      <div className="px-[10px] py-[10px]">
        <p className="font-medium text-[17px] text-center">
          Sorry for the inconvenience, Youtube data API limit has been exceeded
          so please visit the site tomorrow.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
