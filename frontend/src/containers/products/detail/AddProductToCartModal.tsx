import Link from "next/link";
import s from "@/containers/products/detail/AddProductToCartModal.module.scss";
import { PATHS, replaceId } from "@/constants/appRoutes";

interface cartModalProps {
  setCartModalState: () => void;
}

export default function AddProductToCartModal({
  setCartModalState,
}: cartModalProps) {
  // TODO : Get userid from web3auth
  const userId = "1";
  const pathToCart = replaceId(PATHS.shoppingCart, userId);

  return (
    <div className={s.modalBackground}>
      <div className={s.modalContainer}>
        <div className={s.title}>Product Successfully Added to Cart</div>
        <div className={s.buttonContainer}>
          <button onClick={setCartModalState} className={s.stay}>
            Keep Look Around
          </button>
          <Link
            href={pathToCart}
            className={s.toCart}
            onClick={setCartModalState}
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
