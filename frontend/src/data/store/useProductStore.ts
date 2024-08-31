import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/products";
import { Product, PostProductDto } from "@/type/types";

type ProductsStore = {
  productItems: Product[];
  lastId: number;
  handleAdd: (item: PostProductDto) => void;
  handleRemove: (id: number) => void;
};

const StorageKey = "products-store"; // 로컬 스토리지 키

const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      productItems: products,
      lastId: products.length > 0 ? products[products.length - 1].id : 0,

      handleAdd: (item) => {
        const newId = get().lastId + 1;
        const newItem: Product = { ...item, id: newId, progress: 0 };
        set((state) => {
          const updatedItems = [...state.productItems, newItem];
          return { productItems: updatedItems, lastId: newId };
        });
      },

      handleRemove: (id) => {
        set((state) => ({
          productItems: state.productItems.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: StorageKey,
    },
  ),
);

// 상태를 가져오는 훅
export const useProductItems = () =>
  useProductsStore((state) => state.productItems);

// 상태를 업데이트하는 액션 훅
export const useProductActions = () => ({
  handleAdd: useProductsStore((state) => state.handleAdd),
  handleRemove: useProductsStore((state) => state.handleRemove),
});
