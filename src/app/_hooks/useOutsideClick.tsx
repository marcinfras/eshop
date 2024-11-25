import { useEffect } from "react";
import type { MutableRefObject } from "react";

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  fn: () => void
) => {
  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") fn();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fn();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeClick);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeClick);
    };
  }, [ref, fn]);
};
