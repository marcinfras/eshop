"use client";

import { StarIcon } from "@/app/_components/StarIcon";
import { useState } from "react";

interface StarRatingProps {
  rating?: number;
  onChange?: (rating: number) => void;
  className?: string;
  readOnly?: boolean;
}

export const StarRating = ({
  rating = 0,
  onChange,
  className = "",
  readOnly = true,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (star: number) => {
    if (!readOnly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const handleClick = (star: number) => {
    if (!readOnly && onChange) {
      onChange(star);
    }
  };

  return (
    <div
      className={`flex items-center space-x-0.5 ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(
          0,
          Math.min(1, (hoverRating || rating) - star + 1)
        );
        return (
          <div
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onClick={() => handleClick(star)}
            role={readOnly ? "img" : "button"}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            tabIndex={readOnly ? -1 : 0}
          >
            <StarIcon fill={fill} />
          </div>
        );
      })}
    </div>
  );
};
