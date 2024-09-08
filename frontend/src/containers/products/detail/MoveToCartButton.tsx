import s from "@/containers/products/detail/MoveToCartButton.module.scss";
import { useCartActions } from "@/data/store/useCartStore";
import { Product, RequestPostCartDto } from "@/type/types";

interface MoveToCartButtonProps {
  item: Product;
  setCartModalState: () => void;
}

export default function MoveToCartButton({
  item,
  setCartModalState,
}: MoveToCartButtonProps) {
  const { handleAddToCart } = useCartActions();
  const newCartItem: RequestPostCartDto = {
    product: item,
  };

  const handleClick = () => {
    handleAddToCart(newCartItem);
    setCartModalState();
  };

  return (
    <button onClick={handleClick} className={s.buttonContainer}>
      <div className={s.buttonWide}>Join This GroupBuy!</div>
    </button>
  );
}
