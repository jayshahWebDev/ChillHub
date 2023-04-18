import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleShowComment } from "../../utils/appSlice";
import { YOUTUBE_API_URL } from "../../utils/constatnt";
import CommentCard from "./CommentCard";

const CommentModel = ({ videoId }) => {
  const [comments, setComments] = useState(null);
  const dispatch = useDispatch();

  const getCommentDetails = async () => {
    try {
      let options = {
        part: "snippet,replies",
        maxResults: 20,
        videoId,
        order: "relevance",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };
      const data = await fetch(
        `${YOUTUBE_API_URL}/commentThreads?` + new URLSearchParams(options)
      );
      const jsonData = await data.json();
      setComments(jsonData?.items);
    } catch (error) {}
  };

  useEffect(() => {
    getCommentDetails();
  }, [videoId]);

  if (!comments) return;

  return (
    <div className="w-full font-Roboto h-full overflow-auto laptop:overflow-hidden">
      <div className="laptop:hidden sticky top-0 bg-white">
        <div className="flex justify-between items-center mx-[2%] pt-[5px]">
          <p className="font-medium text-[18px]">Comments</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            className="h-[25px]"
            onClick={() => dispatch(toggleShowComment())}
          >
            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
          </svg>
        </div>
        <hr className="border w-full mt-[5px]" />
      </div>
      {comments?.map((comment) => (
        <CommentCard key={comment?.id} commentDetail={comment} />
      ))}
    </div>
  );
};

export default CommentModel;
