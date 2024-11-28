export const ProductDetails = ({ description }: { description: string }) => {
  return (
    <div className="grid gap-4 text-sm leading-loose">
      <h2 className="font-bold text-lg">Product Details</h2>

      <p>{description}</p>
    </div>
  );
};
