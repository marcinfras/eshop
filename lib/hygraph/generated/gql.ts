/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateAccount($name: String!, $email: String!, $password: String!) {\n  createAccount(data: {name: $name, email: $email, password: $password}) {\n    id\n    email\n    name\n  }\n}": types.CreateAccountDocument,
    "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n    name\n  }\n}\n\nquery GetCartByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    cart {\n      id\n      cartProduct {\n        id\n        product {\n          id\n          slug\n          name\n          price\n          images {\n            url\n          }\n        }\n        quantity\n      }\n    }\n  }\n}": types.GetAccountByEmailDocument,
    "mutation CreateCart($quantity: Int!, $slug: String!, $email: String!) {\n  createCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}, account: {connect: {email: $email}}}\n  ) {\n    id\n    cartProduct {\n      id\n    }\n  }\n}\n\nmutation UpdateCart($cartId: ID!, $prodId: ID!, $quantity: Int!) {\n  updateCart(\n    where: {id: $cartId}\n    data: {cartProduct: {update: {where: {id: $prodId}, data: {quantity: $quantity}}}}\n  ) {\n    id\n  }\n}\n\nmutation AddToCart($cartId: ID!, $slug: String!, $quantity: Int!) {\n  updateCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n    where: {id: $cartId}\n  ) {\n    cartProduct {\n      id\n    }\n  }\n}\n\nmutation RemoveFromCart($cartId: ID!, $prodId: ID!) {\n  updateCart(data: {cartProduct: {delete: {id: $prodId}}}, where: {id: $cartId}) {\n    id\n  }\n}": types.CreateCartDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        size\n        id\n      }\n    }\n  }\n}": types.GetProductBySlugDocument,
    "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}\n\nquery GetProductsBySlugs($slug: [String!]!) {\n  products(where: {slug_in: $slug}) {\n    price\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAccount($name: String!, $email: String!, $password: String!) {\n  createAccount(data: {name: $name, email: $email, password: $password}) {\n    id\n    email\n    name\n  }\n}"): typeof import('./graphql').CreateAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n    name\n  }\n}\n\nquery GetCartByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    cart {\n      id\n      cartProduct {\n        id\n        product {\n          id\n          slug\n          name\n          price\n          images {\n            url\n          }\n        }\n        quantity\n      }\n    }\n  }\n}"): typeof import('./graphql').GetAccountByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCart($quantity: Int!, $slug: String!, $email: String!) {\n  createCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}, account: {connect: {email: $email}}}\n  ) {\n    id\n    cartProduct {\n      id\n    }\n  }\n}\n\nmutation UpdateCart($cartId: ID!, $prodId: ID!, $quantity: Int!) {\n  updateCart(\n    where: {id: $cartId}\n    data: {cartProduct: {update: {where: {id: $prodId}, data: {quantity: $quantity}}}}\n  ) {\n    id\n  }\n}\n\nmutation AddToCart($cartId: ID!, $slug: String!, $quantity: Int!) {\n  updateCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n    where: {id: $cartId}\n  ) {\n    cartProduct {\n      id\n    }\n  }\n}\n\nmutation RemoveFromCart($cartId: ID!, $prodId: ID!) {\n  updateCart(data: {cartProduct: {delete: {id: $prodId}}}, where: {id: $cartId}) {\n    id\n  }\n}"): typeof import('./graphql').CreateCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        size\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}\n\nquery GetProductsBySlugs($slug: [String!]!) {\n  products(where: {slug_in: $slug}) {\n    price\n  }\n}"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
