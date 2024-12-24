import { StarIcon } from "@/app/_components/StarIcon";
import { Separator } from "@/app/_components/ui/separator";
import { formatDate } from "@/helpers/helpers";
import StarRating from "./StarRating";

export const Review = ({
  review,
}: {
  review: {
    content: string;
    name: string;
    rating: number;
    headline: string;
    createdAt: string;
    id: string;
  };
}) => {
  const { name, content, rating, headline, createdAt } = review;
  return (
    <>
      <div className="flex gap-4">
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">{name}</h3>
              <time className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-0.5 ml-auto">
              <StarRating rating={rating} />
            </div>
          </div>
          <div className="text-sm leading-loose ">
            <h3 className="font-semibold">{headline}</h3>
            <p className="text-muted-foreground">{content}</p>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};
