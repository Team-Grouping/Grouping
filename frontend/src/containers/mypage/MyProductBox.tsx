import s from "@/containers/mypage/MyProductBox.module.scss";
import Image from "next/image";
// import { MinusIcon, PlusIcon, X } from "lucide-react";
// import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/type/types";

interface ProductBoxProps {
  item: Product;
}

export default function ProductBox({ item }: ProductBoxProps) {
  return (
    <div className={s.cartItem}>
      <div className={s.cartProductInfo}>
        <Image
          src={item.imageSrc}
          alt={item.title}
          className={s.cartProductImage}
          width={180}
          height={180}
        />
        <div className={s.cartProductDetails}>
          <div className={s.cartProductName}>{item.title}</div>
          <div>
            <span
              className={s.cartProductDiscount}
            >{`${item.discount}% off`}</span>
            <span className={s.cartProductPrice}>{`$${item.price}`}</span>
          </div>
          <div>
            <span className={s.cartProductSeller}>{item.seller}</span>
          </div>
        </div>
      </div>
      <div className={s.cartFooter}></div>
    </div>
  );
}
