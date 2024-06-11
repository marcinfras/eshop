import { getEnv } from "@/app/utils/utils";
import {
  GetProductBySlugDocument,
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

export const getProductBySlug = async (slug: string) => {
  const data = await fetcher({
    query: GetProductBySlugDocument,
    cache: "no-store",
    variables: {
      slug,
    },
  });

  if (!data) {
    throw Error("Failed to get product");
  }

  return data;
};
