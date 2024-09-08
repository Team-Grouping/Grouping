import { type Cart } from "@/type/types";
import Image from "next/image";
import s from "@/containers/payments/PaymentItemBox.module.scss";

interface ItemBoxProps {
  item: Cart;
}

export default function PaymentItemBox({ item }: ItemBoxProps) {
  const quantity = item.quantity || 1;

  return (
    <div className={s.cartItem}>
      <div className={s.cartHeader}></div>
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
          <span className={s.cartQuantitySpan}>amount : </span>
          <span className={s.cartQuantitySpan}>{quantity}</span>
        </div>
      </div>
    </div>
  );
}
