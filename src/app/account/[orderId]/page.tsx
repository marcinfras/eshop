import { OrderDetail } from "./_components/OrderDetail";

// https://v0.dev/r/m1fFuMxpk1b
const Page = ({ params }: { params: { orderId: string } }) => {
  return (
    <div className="container mx-auto px-3 md:px-6 py-8">
      <OrderDetail orderId={params.orderId} />
    </div>
  );
};

export default Page;
