type Product = {
  id: number;
  imageSrc: string;
  title: string;
  price: string;
  discount: number;
  seller: string;
  deadline: string;
  category: string;
  description: string;
  progress: number;
  goal: number;
};

type RequestPostProductDto = Omit<Product, "id" | "progress">;
type Cart = {
  id: number;
  product: Product;
  checked: boolean;
  quantity: number;
};

type RequestPostCartDto = Pick<Cart, "product">;

type PaymentStates = "beforeRequest" | "preparation" | "pending" | "completed";

type categoryType =
  | undefined
  | "fruit"
  | "vegetable"
  | "dairy"
  | "meat"
  | "beverage";

export {
  RequestPostProductDto,
  RequestPostCartDto,
  Product,
  Cart,
  RequestPostCartDto,
  PaymentStates,
  categoryType,
};
