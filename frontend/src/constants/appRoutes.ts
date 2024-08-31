export const PATHS = {
  home: "/",
  myPage: "/users/:userId/mypage", // /users/[userId]/mypage
  shoppingCart: "/users/:userId/carts", // /users/[userId]/carts
  payment: "/users/:userId/payments", // /users/[userId]/payments
  productDetail: "/products/:productId/detail", // /products/[productId]/detail
};

export const replaceUserId = (path: string, userId: string): string => {
  return path.replace(":userId", userId);
};
