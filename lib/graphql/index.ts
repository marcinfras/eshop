import { getEnv } from "@/app/utils/utils";
import {
  AddToCartDocument,
  ConnectAccountWithCartDocument,
  // ConnectAccountWithCartDocument,
  CreateAccountDocument,
  CreateCartDocument,
  CreateOrderDocument,
  DeleteCartDocument,
  GetAccountByEmailDocument,
  GetCartByEmailDocument,
  GetCartDocument,
  GetOrderByIdDocument,
  GetOrderByStripeCheckoutIdDocument,
  GetOrdersByEmailDocument,
  GetProductBySlugDocument,
  GetProductsDocument,
  OrderOrderByInput,
  OrderStatus,
  RemoveFromCartDocument,
  TypedDocumentString,
  UpdateCartDocument,
  UpdateNameDocument,
  UpdatePasswordDocument,
} from "../hygraph/generated/graphql";
import { mapperProduct } from "./mappers";

type GraphQlError = {
  message: string;
};
type GraphQlErrorResponse<T> =
  | { data: T }
  | { errors: readonly GraphQlError[] };

export async function fetcher<Result, Variables>({
  query,
  variables,
  headers,
  cache = "force-cache",
  next,
}: {
  query: TypedDocumentString<Result, Variables>;
  variables?: Variables;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}): Promise<Result> {
  const endpoint = getEnv(process.env.NEXT_PUBLIC_API_URL);

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query: query.toString(),
      ...(variables && { variables }),
    }),
    cache,
    next,
  });

  const body = (await result.json()) as GraphQlErrorResponse<Result>;

  if ("errors" in body) {
    throw body.errors[0];
  }

  return body.data;
}

export const getProducts = async () => {
  const data = await fetcher({
    query: GetProductsDocument,
    cache: "no-store",
  });

  if (!data.products) throw Error("Failed to get products");

  return data.products;
};

export const getProductBySlug = async (slug: string) => {
  const data = await fetcher({
    query: GetProductBySlugDocument,
    cache: "no-store",
    variables: {
      slug,
    },
  });

  if (!data.product) {
    throw Error(`Failed to get ${slug}`);
  }

  return mapperProduct(data.product);
};

export const createAccount = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const data = await fetcher({
      query: CreateAccountDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        name,
        email,
        password,
      },
    });

    if (!data.createAccount) {
      throw Error(`Failed to create account`);
    }

    return data.createAccount;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const getAccountByEmail = async (email: string) => {
  const data = await fetcher({
    query: GetAccountByEmailDocument,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
    },
    variables: {
      email,
    },
  });

  if (!data.account) {
    throw Error(`Failed to find account`);
  }

  return data.account;
};

export const getCartByEmail = async (email: string) => {
  const data = await fetcher({
    query: GetCartByEmailDocument,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
    },
    variables: {
      email,
    },
  });

  // if (!data.account?.cart) {
  //   throw Error(`Failed to get cart`);
  // }

  return data?.account?.cart;
};

export const connectAccountWithCartHygraph = async ({
  email,
  cartId,
}: {
  email: string;
  cartId: string;
}) => {
  const data = await fetcher({
    query: ConnectAccountWithCartDocument,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
    },
    variables: {
      email,
      cartId,
    },
  });

  // if (!data.account?.cart) {
  //   throw Error(`Failed to get cart`);
  // }

  return data.updateAccount;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCartByIdHygraph = async (id: string) => {
  // await delay(3000);

  const data = await fetcher({
    query: GetCartDocument,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
    },
    variables: {
      id,
    },
    next: {
      tags: ["cart"],
    },
  });

  if (!data.cart) return { error: "Failed to get cart" };

  return data.cart;
};

export const createCartHygraph = async (
  product: {
    slug: string;
    quantity: number;
  },
  email: string | undefined | null
) => {
  try {
    const data = await fetcher({
      query: CreateCartDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        cart: {
          cartProduct: {
            create: [
              {
                quantity: product.quantity,
                product: { connect: { slug: product.slug } },
              },
            ],
          },
          ...(email ? { account: { connect: { email } } } : {}),
        },
      },
    });

    if (!data.createCart) {
      console.error(`Failed to create cart`);
      return { error: "Failed to create cart" };
    }

    return data.createCart;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to create cart" };
  }
};

export const updateCartHygraph = async ({
  cartId,
  prodId,
  quantity,
}: {
  cartId: string;
  prodId: string;
  quantity: number;
}) => {
  try {
    const data = await fetcher({
      query: UpdateCartDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        cartId,
        prodId,
        quantity,
      },
    });

    if (!data.updateCart?.updatedProduct[0].id) {
      console.error(`Failed to update cart`);
      return { error: "Failed to update cart" };
    }

    return data.updateCart;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to update cart" };
  }
};

export const addToCartHygraph = async ({
  cartId,
  slug,
  quantity,
}: {
  cartId: string;
  slug: string;
  quantity: number;
}) => {
  try {
    const data = await fetcher({
      query: AddToCartDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        cartId,
        slug,
        quantity,
      },
    });

    if (!data.updateCart) {
      console.error(`Failed to add to cart`);
      return { error: "Failed to add to cart" };
    }

    return data.updateCart;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to add to cart" };
  }
};

export const removeFromCartHygraph = async ({
  cartId,
  prodId,
}: {
  cartId: string;
  prodId: string;
}) => {
  try {
    const data = await fetcher({
      query: RemoveFromCartDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        cartId,
        prodId,
      },
    });

    if (!data.updateCart) {
      console.error(`Failed to remove item from cart`);
      return { error: "Failed to remove item from cart" };
    }

    return data.updateCart;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to remove item from cart" };
  }
};

export const deleteCartHygraph = async (cartId: string) => {
  try {
    const data = await fetcher({
      query: DeleteCartDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        cartId,
      },
    });

    if (!data.deleteCart) {
      console.error("Failed to delete cart");
      return { error: "Failed to delete cart" };
    }

    return { id: data.deleteCart.id };
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to delete cart" };
  }
};

export const updateNameHygraph = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    const data = await fetcher({
      query: UpdateNameDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        name,
        email,
      },
    });

    if (!data.updateAccount) {
      return { error: "Failed to update your name" };
    }

    return data.updateAccount;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to update your name" };
  }
};

export const updatePasswordHygraph = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  try {
    const data = await fetcher({
      query: UpdatePasswordDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        password,
        email,
      },
    });

    if (!data.updateAccount) {
      return { error: "Failed to update your password" };
    }

    return data.updateAccount;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to update your password" };
  }
};

export const createOrderHygraph = async (orderData: {
  email: string;
  total: number;
  orderItems: {
    quantity: number;
    total: number;
    slug: string;
  }[];
  stripeCheckoutId: string;
  currentStatus: OrderStatus;
}) => {
  const { email, total, orderItems, stripeCheckoutId, currentStatus } =
    orderData;
  try {
    const data = await fetcher({
      query: CreateOrderDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        data: {
          email,
          total,
          stripeCheckoutId,
          currentStatus,
          orderItems: {
            create: orderItems.map((item) => ({
              quantity: item.quantity,
              total: item.total,
              product: {
                connect: { slug: item.slug },
              },
            })),
          },
        },
      },
    });

    if (!data.createOrder?.id) {
      return { error: "Failed to create order" };
    }

    return data.createOrder.id;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to create order" };
  }
};

export const getOrderByStripeCheckoutIdHygraph = async (
  stripeCheckoutId: string
) => {
  try {
    const data = await fetcher({
      query: GetOrderByStripeCheckoutIdDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        stripeCheckoutId,
      },
    });

    console.log(data);

    if (!data.order) {
      return { error: "Failed to get order" };
    }

    return data.order;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to get order" };
  }
};

export const getOrderByIdHygraph = async (orderId: string) => {
  try {
    const data = await fetcher({
      query: GetOrderByIdDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        orderId,
      },
      next: {
        tags: [orderId],
      },
    });

    console.log(data);

    if (!data.order) {
      return { error: "Failed to get order" };
    }

    return data.order;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to get order" };
  }
};

export const getOrdersByEmailHygraph = async ({
  where,
  orderBy,
}: {
  where:
    | {
        email: string;
      }
    | { email: string; currentStatus: OrderStatus };
  orderBy: OrderOrderByInput;
}) => {
  try {
    const data = await fetcher({
      query: GetOrdersByEmailDocument,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${getEnv(process.env.AUTH_TOKEN)}`,
      },
      variables: {
        where,
        orderBy,
      },
      next: {
        tags: ["orders"],
      },
    });

    console.log(data);

    if (!data.orders) {
      return [];
    }

    return data.orders;
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to get orders" };
  }
};
