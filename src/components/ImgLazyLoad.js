import { useEffect, useRef, useState } from "react";

const registerObserver = (ref, setShowImg) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.map((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowImg(true);
      observer.disconnect();
    });
  });
  observer.observe(ref);
};

const ImgLazyLoad = ({ src, style }) => {
  const [showImg, setShowImg] = useState(false);
  const imageRef = useRef(null);

    useEffect(() => {
      registerObserver(imageRef.current, setShowImg);
    }, []);

  return showImg ? (
    <img src={src} className={style} />
  ) : (
    <div ref={imageRef} className={`${style} bg-shimmerColor`} />
  );
};

export default ImgLazyLoad;
