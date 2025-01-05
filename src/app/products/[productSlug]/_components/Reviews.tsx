import { getReviewsBySlug } from "../../../../../lib/graphql";
import { Review } from "./Review";
import { AddReview } from "./AddReview";
import { REVIEWS_PER_PAGE } from "@/helpers/helpers";
import { Pagination } from "../../_components/Pagination";

export const Reviews = async ({
  slug,
  reviewsParams,
}: {
  slug: string;
  reviewsParams: string | string[] | null;
}) => {
  const res = await getReviewsBySlug({
    slug,
    first: REVIEWS_PER_PAGE,
    skip:
      reviewsParams === null || reviewsParams === "1"
        ? 0
        : (Number(reviewsParams) - 1) * REVIEWS_PER_PAGE,
  });

  if (!res) return null;

  const { reviews, allReviews } = res;

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
      {allReviews > REVIEWS_PER_PAGE && (
        <Pagination
          allItems={allReviews}
          itemsPerPage={REVIEWS_PER_PAGE}
          queryParam="reviewsPage"
        />
      )}
    </div>
  );
};
