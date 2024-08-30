import { formatCurrency } from "@/helpers/helpers";
import Image from "next/image";

export const OrderDetailItem = ({
  item,
}: {
  item: {
    quantity: number;
    total: number;
    product?:
      | {
          name: string;
          price: number;
          images: {
            url: string;
          }[];
        }
      | null
      | undefined;
  };
}) => {
  return (
    <tr>
      <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <Image
          src={item.product?.images[0].url as string}
          alt="Product Image"
          width={64}
          height={64}
          className="rounded-md object-cover"
          style={{ aspectRatio: "64/64", objectFit: "cover" }}
        />
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.product?.name}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-500">
        {item.quantity}
      </td>
      <td className="px-3 py-4 hidden sm:table-cell whitespace-nowrap text-right text-sm text-gray-500">
        {formatCurrency(item.product?.price as number)}
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-500">
        {formatCurrency(item.total)}
      </td>
    </tr>
  );
};
