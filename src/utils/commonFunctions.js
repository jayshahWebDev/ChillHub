import moment from "moment";

export const viewSubCount = (countValue) => {
  let viewCount;
  if (countValue >= 1000000000) {
    viewCount =
      new Intl.NumberFormat().format((countValue / 1000000000).toFixed(2)) +
      "B";
  } else if (countValue >= 1000000) {
    viewCount =
      new Intl.NumberFormat().format((countValue / 1000000).toFixed(2)) + "M";
  } else if (countValue >= 1000) {
    viewCount =
      new Intl.NumberFormat().format((countValue / 1000).toFixed(2)) + "K";
  } else {
    viewCount = countValue;
  }

  return viewCount;
};

export const convertDurationInHMS = (duration) => {
  const videoduration = moment.duration(duration);
  let videoLength;
  if (videoduration?.hours() > 0) {
    let minutes =
      videoduration.minutes() >= 10
        ? videoduration.minutes()
        : `0${videoduration.minutes()}`;
    let seconds =
      videoduration.seconds() >= 10
        ? videoduration.seconds()
        : `0${videoduration.seconds()}`;
    videoLength = `${videoduration?.hours()}:${minutes}:${seconds}`;
  } else {
    let seconds =
      videoduration.seconds() >= 10
        ? videoduration.seconds()
        : `0${videoduration.seconds()}`;

    videoLength =
      videoduration.minutes() > 0
        ? `${videoduration.minutes()}:${seconds}`
        : `0:${seconds}`;
  }
  return videoLength;
};

export const createVideoDetailObject = (videoDetail) => {
  let videoData = {
    id: videoDetail?.id,
    thumbnail: videoDetail?.snippet?.thumbnails?.high?.url,
    duration: videoDetail?.contentDetails?.duration,
    title: videoDetail?.snippet?.title,
    channelName: videoDetail?.snippet?.channelTitle,
    view: videoDetail?.statistics?.viewCount,
    description: videoDetail?.snippet?.description,
  };
  return videoData;
};
