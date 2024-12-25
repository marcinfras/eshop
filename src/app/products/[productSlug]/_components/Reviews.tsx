import { getReviewsBySlug } from "../../../../../lib/graphql";
import { Review } from "./Review";
import { AddReview } from "./AddReview";

export const Reviews = async ({ slug }: { slug: string }) => {
  const reviews = await getReviewsBySlug(slug);

  return (
    <div className="grid gap-4 text-sm leading-loose">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-lg">Customer Reviews</h2>
        <AddReview />
      </div>

      {!reviews || reviews.length === 0 ? (
        <p>This product has no reviews yet.</p>
      ) : (
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </div>
  );
};
