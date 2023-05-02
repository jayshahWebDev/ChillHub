import moment from "moment";
import likeIcon from "../../../assets/likeIcon.png";
import ImgLazyLoad from "../ImgLazyLoad";

const CommentCard = ({ commentDetail }) => {
  const {
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    textDisplay,
    likeCount,
  } = commentDetail?.snippet?.topLevelComment?.snippet;
  const videoPublishDate = moment(publishedAt).fromNow();
  return (
    <div className="flex mx-[2%] mt-[10px] font-Roboto">
      <div className="w-[10%] tablet:w-[5%] desktop:w-[4%]">
        <ImgLazyLoad
          src={authorProfileImageUrl}
          style="h-[30px] w-[30px] rounded-full"
        />
      </div>
      <div className="w-[90%] tablet:w-[95%] desktop:w-[96%]">
        <div className="flex items-center gap-x-[10px]">
          <p className="text-[13px] font-medium">{authorDisplayName}</p>
          <p className="text-[13px]">{videoPublishDate}</p>
        </div>
        <p
          className="text-[15px] line-clamp-4"
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        ></p>
        <div className="flex gap-x-[5px] mt-[5px]">
          <img src={likeIcon} className="h-[20px]" />
          <p className="text-[15px]">{likeCount > 0 ? likeCount : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
