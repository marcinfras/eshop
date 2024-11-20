import { useEffect, useRef, useState } from "react";

export const useIntersectionObserverImage = (imgUrl: string) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(imgRef.current);
  }, [imgUrl]);

  return { imgRef, isVisible };
};
