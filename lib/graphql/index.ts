import { getEnv } from "@/app/utils/utils";
import {
  CreateAccountDocument,
  GetAccountByEmailDocument,
  GetProductBySlugDocument,
  GetProductsDocument,
  TypedDocumentString,
} from "../hygraph/generated/graphql";

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

  return data.product;
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
