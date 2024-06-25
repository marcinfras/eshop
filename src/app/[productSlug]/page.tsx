import { getProductBySlug } from "../../../lib/graphql";

const Page = async ({ params }: { params: { productSlug: string } }) => {
  console.log(params);
  const product = await getProductBySlug(params.productSlug);
  return <pre>{JSON.stringify(product, null, 2)}</pre>;
};

export default Page;
