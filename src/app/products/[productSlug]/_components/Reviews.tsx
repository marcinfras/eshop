import { getReviewsBySlug } from "../../../../../lib/graphql";
import { Review } from "./Review";
import { AddReview } from "./AddReview";
import { reviewsPerPage } from "@/helpers/helpers";
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
    first: reviewsPerPage,
    skip:
      reviewsParams === null || reviewsParams === "1"
        ? 0
        : (Number(reviewsParams) - 1) * reviewsPerPage,
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
      {allReviews > reviewsPerPage && (
        <Pagination
          allItems={allReviews}
          itemsPerPage={reviewsPerPage}
          queryParam="reviewsPage"
        />
      )}
    </div>
  );
};
