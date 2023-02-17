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
  }

  return viewCount;
};
