import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "@/data/products";
import { Product, RequestPostProductDto } from "@/type/types";

const productsEqualityFn = (a: Product[], b: Product[]) => {
  if (a.length !== b.length) return false;
  return a.every((item, index) => item.id === b[index].id);
};

type ProductsStore = {
  productItems: Product[];
  lastId: number;
  handleAdd: (item: RequestPostProductDto) => void;
  handleRemove: (id: number) => void;
  resetProducts: () => void;
};

const StorageKey = "products-store"; // 로컬 스토리지 키

export const useProductStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      productItems: initialProducts,
      lastId:
        initialProducts.length > 0
          ? initialProducts[initialProducts.length - 1].id
          : 0,

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

      resetProducts: () => {
        const state = get();
        const productsChanged = !productsEqualityFn(
          state.productItems,
          initialProducts,
        );
        if (productsChanged) {
          set({
            productItems: initialProducts,
            lastId:
              initialProducts.length > 0
                ? initialProducts[initialProducts.length - 1].id
                : 0,
          });
        }
      },
    }),
    {
      name: StorageKey,
    },
  ),
);

// 상태를 가져오는 훅
export const useProductItems = () =>
  useProductStore((state) => state.productItems);

// 상태를 업데이트하는 액션 훅
export const useProductActions = () => ({
  handleAdd: useProductStore((state) => state.handleAdd),
  handleRemove: useProductStore((state) => state.handleRemove),
  resetProducts: useProductStore((state) => state.resetProducts),
});
