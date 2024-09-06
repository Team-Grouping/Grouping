import Cart from "@/containers/carts/Cart";
import s from "./CartList.module.scss";
import { useCartItems, useCartActions } from "@/data/store/useCartStore";
import Link from "next/link";
import { useState } from "react";
import { PATHS, replaceId } from "@/constants/appRoutes";

export default function CartList() {
  const cartItems = useCartItems();
  const { calculateTotalPrice, selectAll } = useCartActions();

  const [selectAllButtonChecked, setSelectAllButtonChecked] = useState(false);

  const totalPrice = calculateTotalPrice();
  const userId = "1";
  const pathToPayment = replaceId(PATHS.payment, userId);

  const handleCheckout = () => {
    const checkedItems = cartItems.filter((item) => item.checked);
  };

  const buttonClickAction = () => {
    selectAll();
    setSelectAllButtonChecked(!selectAllButtonChecked);
  };

  const checkedItems = cartItems.filter((item) => item.checked);

  return (
    <div className={s.cartForm}>
      {cartItems.length !== 0 ? (
        <div className={s.checkBoxContainer}>
          <input
            type="checkbox"
            checked={cartItems.length - checkedItems.length === 0}
            onChange={buttonClickAction}
            style={{ width: "20px", height: "20px" }}
          />
          <div className={s.note}>
            {cartItems.length - checkedItems.length === 0
              ? "Cancel All"
              : "Select All"}
          </div>
        </div>
      ) : (
        <div className={s.empty}>ShoppingCart is Empty</div>
      )}

      <div className={s.cartContainer}>
        {cartItems.map((item) => (
          <Cart key={item.id} item={item} />
        ))}
      </div>

      <div className={s.checkoutBox}>
        <span className={s.checkoutSummary}>Total: ${totalPrice}</span>
        {checkedItems.length !== 0 ? (
          <Link
            href={pathToPayment}
            className={s.checkoutButton}
            onClick={handleCheckout}
          >
            Checkout!
          </Link>
        ) : (
          <div className={s.disabledCheckoutButton}>Checkout!</div>
        )}
      </div>
    </div>
  );
}
