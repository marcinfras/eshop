import { StarIcon } from "@/app/_components/StarIcon";

export default function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, rating - star + 1));
        return (
          <div key={star} aria-hidden="true">
            <StarIcon fill={fill} />
          </div>
        );
      })}
    </div>
  );
}
