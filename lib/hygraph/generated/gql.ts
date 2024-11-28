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
    "mutation CreateAccount($name: String!, $email: String!, $password: String!) {\n  createAccount(data: {name: $name, email: $email, password: $password}) {\n    id\n    email\n    name\n  }\n}\n\nmutation UpdateName($email: String!, $name: String!) {\n  updateAccount(data: {name: $name}, where: {email: $email}) {\n    name\n  }\n}\n\nmutation UpdatePassword($email: String!, $password: String!) {\n  updateAccount(data: {password: $password}, where: {email: $email}) {\n    id\n  }\n}\n\nmutation ConnectAccountWithCart($email: String!, $cartId: ID!) {\n  updateAccount(data: {cart: {connect: {id: $cartId}}}, where: {email: $email}) {\n    id\n  }\n}": types.CreateAccountDocument,
    "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n    name\n    cart {\n      id\n    }\n  }\n}\n\nquery GetCartByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    cart {\n      id\n      cartProduct {\n        id\n        product {\n          id\n          slug\n          name\n          price\n          images {\n            url\n          }\n        }\n        quantity\n      }\n    }\n  }\n}": types.GetAccountByEmailDocument,
    "mutation CreateCart($cart: CartCreateInput!) {\n  createCart(data: $cart) {\n    id\n  }\n}\n\nmutation UpdateCart($cartId: ID!, $prodId: ID!, $quantity: Int!) {\n  updateCart(\n    where: {id: $cartId}\n    data: {cartProduct: {update: {where: {id: $prodId}, data: {quantity: $quantity}}}}\n  ) {\n    updatedProduct: cartProduct(where: {id: $prodId}) {\n      id\n    }\n  }\n}\n\nmutation AddToCart($cartId: ID!, $slug: String!, $quantity: Int!) {\n  updateCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n    where: {id: $cartId}\n  ) {\n    id\n  }\n}\n\nmutation RemoveFromCart($cartId: ID!, $prodId: ID!) {\n  updateCart(data: {cartProduct: {delete: {id: $prodId}}}, where: {id: $cartId}) {\n    id\n  }\n}\n\nmutation DeleteCart($cartId: ID!) {\n  deleteCart(where: {id: $cartId}) {\n    id\n  }\n}": types.CreateCartDocument,
    "query GetCart($id: ID!) {\n  cart(where: {id: $id}, stage: DRAFT) {\n    id\n    cartProduct {\n      id\n      product {\n        id\n        slug\n        name\n        price\n        images {\n          url\n        }\n      }\n      quantity\n    }\n  }\n}\n\nquery IsProductInCart($cartId: ID, $slug: String!) {\n  cart(where: {id: $cartId}, stage: DRAFT) {\n    cartProduct(where: {product: {slug: $slug}}) {\n      id\n      quantity\n    }\n  }\n}": types.GetCartDocument,
    "mutation CreateOrder($data: OrderCreateInput!) {\n  createOrder(data: $data) {\n    id\n  }\n}": types.CreateOrderDocument,
    "query GetOrderByStripeCheckoutId($stripeCheckoutId: String!) {\n  order(where: {stripeCheckoutId: $stripeCheckoutId}, stage: DRAFT) {\n    total\n    orderItems {\n      quantity\n      total\n      product {\n        name\n      }\n    }\n  }\n}\n\nquery GetOrderById($orderId: ID!) {\n  order(where: {id: $orderId}, stage: DRAFT) {\n    id\n    email\n    currentStatus\n    createdAt\n    total\n    orderItems {\n      quantity\n      total\n      product {\n        images {\n          url\n        }\n        name\n        price\n      }\n    }\n  }\n}\n\nquery GetOrdersByEmail($orderBy: OrderOrderByInput!, $where: OrderWhereInput!) {\n  orders(where: $where, orderBy: $orderBy, stage: DRAFT) {\n    id\n    total\n    createdAt\n    currentStatus\n  }\n}": types.GetOrderByStripeCheckoutIdDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        size\n        id\n      }\n    }\n  }\n}": types.GetProductBySlugDocument,
    "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}\n\nquery GetProductsBySlugs($slug: [String!]!) {\n  products(where: {slug_in: $slug}) {\n    price\n    id\n    name\n    images {\n      url\n    }\n    slug\n  }\n}\n\nquery GetProductsByCollection($collection: String!) {\n  products(where: {collections_every: {name: $collection}}) {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAccount($name: String!, $email: String!, $password: String!) {\n  createAccount(data: {name: $name, email: $email, password: $password}) {\n    id\n    email\n    name\n  }\n}\n\nmutation UpdateName($email: String!, $name: String!) {\n  updateAccount(data: {name: $name}, where: {email: $email}) {\n    name\n  }\n}\n\nmutation UpdatePassword($email: String!, $password: String!) {\n  updateAccount(data: {password: $password}, where: {email: $email}) {\n    id\n  }\n}\n\nmutation ConnectAccountWithCart($email: String!, $cartId: ID!) {\n  updateAccount(data: {cart: {connect: {id: $cartId}}}, where: {email: $email}) {\n    id\n  }\n}"): typeof import('./graphql').CreateAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccountByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    id\n    password\n    email\n    name\n    cart {\n      id\n    }\n  }\n}\n\nquery GetCartByEmail($email: String!) {\n  account(where: {email: $email}, stage: DRAFT) {\n    cart {\n      id\n      cartProduct {\n        id\n        product {\n          id\n          slug\n          name\n          price\n          images {\n            url\n          }\n        }\n        quantity\n      }\n    }\n  }\n}"): typeof import('./graphql').GetAccountByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCart($cart: CartCreateInput!) {\n  createCart(data: $cart) {\n    id\n  }\n}\n\nmutation UpdateCart($cartId: ID!, $prodId: ID!, $quantity: Int!) {\n  updateCart(\n    where: {id: $cartId}\n    data: {cartProduct: {update: {where: {id: $prodId}, data: {quantity: $quantity}}}}\n  ) {\n    updatedProduct: cartProduct(where: {id: $prodId}) {\n      id\n    }\n  }\n}\n\nmutation AddToCart($cartId: ID!, $slug: String!, $quantity: Int!) {\n  updateCart(\n    data: {cartProduct: {create: {quantity: $quantity, product: {connect: {slug: $slug}}}}}\n    where: {id: $cartId}\n  ) {\n    id\n  }\n}\n\nmutation RemoveFromCart($cartId: ID!, $prodId: ID!) {\n  updateCart(data: {cartProduct: {delete: {id: $prodId}}}, where: {id: $cartId}) {\n    id\n  }\n}\n\nmutation DeleteCart($cartId: ID!) {\n  deleteCart(where: {id: $cartId}) {\n    id\n  }\n}"): typeof import('./graphql').CreateCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCart($id: ID!) {\n  cart(where: {id: $id}, stage: DRAFT) {\n    id\n    cartProduct {\n      id\n      product {\n        id\n        slug\n        name\n        price\n        images {\n          url\n        }\n      }\n      quantity\n    }\n  }\n}\n\nquery IsProductInCart($cartId: ID, $slug: String!) {\n  cart(where: {id: $cartId}, stage: DRAFT) {\n    cartProduct(where: {product: {slug: $slug}}) {\n      id\n      quantity\n    }\n  }\n}"): typeof import('./graphql').GetCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($data: OrderCreateInput!) {\n  createOrder(data: $data) {\n    id\n  }\n}"): typeof import('./graphql').CreateOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrderByStripeCheckoutId($stripeCheckoutId: String!) {\n  order(where: {stripeCheckoutId: $stripeCheckoutId}, stage: DRAFT) {\n    total\n    orderItems {\n      quantity\n      total\n      product {\n        name\n      }\n    }\n  }\n}\n\nquery GetOrderById($orderId: ID!) {\n  order(where: {id: $orderId}, stage: DRAFT) {\n    id\n    email\n    currentStatus\n    createdAt\n    total\n    orderItems {\n      quantity\n      total\n      product {\n        images {\n          url\n        }\n        name\n        price\n      }\n    }\n  }\n}\n\nquery GetOrdersByEmail($orderBy: OrderOrderByInput!, $where: OrderWhereInput!) {\n  orders(where: $where, orderBy: $orderBy, stage: DRAFT) {\n    id\n    total\n    createdAt\n    currentStatus\n  }\n}"): typeof import('./graphql').GetOrderByStripeCheckoutIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    price\n    id\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        size\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  products {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}\n\nquery GetProductsBySlugs($slug: [String!]!) {\n  products(where: {slug_in: $slug}) {\n    price\n    id\n    name\n    images {\n      url\n    }\n    slug\n  }\n}\n\nquery GetProductsByCollection($collection: String!) {\n  products(where: {collections_every: {name: $collection}}) {\n    images {\n      url\n    }\n    name\n    price\n    id\n    slug\n  }\n}"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
