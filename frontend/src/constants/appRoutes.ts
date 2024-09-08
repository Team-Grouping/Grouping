export const PATHS = {
  home: "/products",
  myPage: "/users/:userId/mypage", // /users/[userId]/mypage
  shoppingCart: "/users/:userId/carts", // /users/[userId]/carts
  payment: "/users/:userId/payments", // /users/[userId]/payments
  productDetail: "/products/:productId/detail", // /products/[productId]/detail
  productNew: "/products/new",
  search: "/products/search",
};

export const replaceId = (path: string, id: string): string => {
  if (path !== PATHS.productDetail) {
    return path.replace(":userId", id);
  } else return path.replace(":productId", id);
};
