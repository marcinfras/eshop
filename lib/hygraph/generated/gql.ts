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
    "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n  }\n}": types.GetAccountByEmailDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n  }\n}": types.GetProductBySlugDocument,
    "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAccount($name: String!, $email: String!, $password: String!) {\n  createAccount(data: {name: $name, email: $email, password: $password}) {\n    id\n    email\n    name\n  }\n}"): typeof import('./graphql').CreateAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n  }\n}"): typeof import('./graphql').GetAccountByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
