import { useEffect, useRef } from "react";

export const useArrowNavigation = () => {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      if (!ref.current) return;

      const focusableItems = Array.from(
        ref.current.querySelectorAll<HTMLElement>(
          'a[href], [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableItems.length === 0) return;

      const currentIndex = focusableItems.findIndex(
        (item) => item === document.activeElement
      );

      let newIndex = currentIndex;

      if (event.key === "ArrowDown") {
        newIndex =
          currentIndex === -1 || currentIndex === focusableItems.length - 1
            ? 0
            : currentIndex + 1;
      } else if (event.key === "ArrowUp") {
        newIndex =
          currentIndex === -1 || currentIndex === 0
            ? focusableItems.length - 1
            : currentIndex - 1;
      }

      focusableItems[newIndex].focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return ref;
};
