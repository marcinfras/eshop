import { useEffect, useRef } from "react";

export const useIntersectionObserverImage = (imgUrl: string) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        entry.target.setAttribute("srcset", imgUrl);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(imgRef.current);
  }, [imgUrl]);

  return imgRef;
};
