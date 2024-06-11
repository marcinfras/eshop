import { getProductBySlug } from "../../../lib/graphql";

export const Page = async ({ params }: { params: { productSlug: string } }) => {
  console.log(params);
  const {
    products: [product],
  } = await getProductBySlug(params.productSlug);
  return <pre>{JSON.stringify(product)}</pre>;
};

export default Page;
