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

export { RequestPostProductDto, RequestPostCartDto, Product };
