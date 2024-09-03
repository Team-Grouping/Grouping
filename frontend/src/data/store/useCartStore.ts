import { create } from "zustand";
import { Cart, RequestPostCartDto } from "@/type/types";

interface CartState {
  cartItems: Cart[];
  lastId: number;
  handleRemove: (id: number) => void;
  handleCheck: (id: number) => void;
  handleQuantityChange: (id: number, delta: number) => void;
  handleAddToCart: (item: RequestPostCartDto) => void;
  calculateTotalPrice: () => string;
  selectAll: () => void;
}

export const useCartStore = create<CartState>((set, get) => {
  // Initial cart items array
  const initialCartItems: Cart[] = [];

  // Calculate initial lastId based on the initial cartItems
  const initialLastId =
    initialCartItems.length > 0
      ? initialCartItems[initialCartItems.length - 1].id
      : 0;

  return {
    cartItems: initialCartItems,

    lastId: initialLastId,

    handleRemove: (id: number) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item: Cart) => item.id !== id),
      })),

    handleCheck: (id: number) =>
      set((state) => ({
        cartItems: state.cartItems.map((item: Cart) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      })),

    handleQuantityChange: (id: number, delta: number) =>
      set((state) => ({
        cartItems: state.cartItems.map((item: Cart) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
            : item,
        ),
      })),

    handleAddToCart: (item: RequestPostCartDto) => {
      const newId = get().lastId + 1;
      const newItem: Cart = { ...item, id: newId, checked: false, quantity: 1 };

      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (i) => i.product.id === newItem.product.id,
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...state.cartItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: (updatedItems[existingItemIndex].quantity || 1) + 1,
          };
          return { cartItems: updatedItems };
        } else {
          return {
            cartItems: [...state.cartItems, newItem],
            lastId: newId, // Update lastId when a new item is added
          };
        }
      });
    },

    calculateTotalPrice: () => {
      const state = get();
      return state.cartItems
        .filter((item) => item.checked)
        .reduce(
          (sum, item) =>
            sum +
            parseFloat(item.product.price.replace("$", "")) *
              (item.quantity || 1),
          0,
        )
        .toFixed(2);
    },

    selectAll: () => {
      set((state) => {
        const allSelected = state.cartItems.every((item) => item.checked);

        const updatedCartItems = state.cartItems.map((item) => ({
          ...item,
          checked: !allSelected,
        }));

        return {
          cartItems: updatedCartItems,
        };
      });
    },
  };
});

export const useCartItems = () => useCartStore((state) => state.cartItems);

// Hook to get cart actions
export const useCartActions = () => ({
  handleRemove: useCartStore((state) => state.handleRemove),
  handleCheck: useCartStore((state) => state.handleCheck),
  handleQuantityChange: useCartStore((state) => state.handleQuantityChange),
  handleAddToCart: useCartStore((state) => state.handleAddToCart),
  calculateTotalPrice: useCartStore((state) => state.calculateTotalPrice),
  selectAll: useCartStore((state) => state.selectAll),
});
