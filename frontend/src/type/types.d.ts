type Product = {
  id: number;
  imageSrc: string;
  title: string;
  price: string;
  discount: string;
  seller: string;
  deadline: string;
  category: string;
  description: string;
  progress: number;
  goal: number;
};

type PostProductDto = Omit<Product, "id" | "progress">;

type Cart = {
  product: Product;
  checked: boolean;
  quantity: number;
};

export { PostProductDto, Product, Cart };
