import s from "@/containers/carts/Cart.module.scss";
import Image from "next/image";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { useCartActions } from "@/data/store/useCartStore";
import { type Cart } from "@/type/types";

interface CartProps {
  item: Cart;
}
export default function Cart({ item }: CartProps) {
  const { handleRemove, handleCheck, handleQuantityChange } = useCartActions();

  const quantity = item.quantity || 1;

  const handleQuantityChangeWrapper = (delta: number) => {
    handleQuantityChange(item.id, delta);
  };

  return (
    <div className={s.cartItem}>
      <div className={s.cartHeader}>
        <input
          type="checkbox"
          checked={item.checked || false}
          onChange={() => handleCheck(item.id)}
        />
        <button
          className={s.cartRemoveButton}
          onClick={() => handleRemove(item.id)}
        >
          <X />
        </button>
      </div>
      <div className={s.cartProductInfo}>
        <Image
          src={item.product.imageSrc}
          alt={item.product.title}
          className={s.cartProductImage}
          width={180}
          height={180}
        />
        <div className={s.cartProductDetails}>
          <div className={s.cartProductName}>{item.product.title}</div>
          <div>
            <span
              className={s.cartProductDiscount}
            >{`${item.product.discount}% off`}</span>
            <span
              className={s.cartProductPrice}
            >{`$${item.product.price}`}</span>
          </div>
          <div>
            <span className={s.cartProductSeller}>{item.product.seller}</span>
          </div>
        </div>
      </div>
      <div className={s.cartFooter}>
        <div className={s.cartQuantity}>
          <button
            className={s.cartQuantityButton}
            onClick={() => handleQuantityChangeWrapper(-1)}
          >
            <MinusIcon />
          </button>
          <span className={s.cartQuantitySpan}>{quantity}</span>
          <button
            className={s.cartQuantityButton}
            onClick={() => handleQuantityChangeWrapper(1)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
