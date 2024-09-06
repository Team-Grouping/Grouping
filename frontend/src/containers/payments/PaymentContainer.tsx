"use client";

import { useState } from "react";
import s from "./PaymentContainer.module.scss";
import ProgressIndicator from "./PaymentProgressIndicator";
import Cart from "@/containers/carts/Cart";
import { type Cart as CartType, PaymentStates } from "@/type/types";
import { useCartActions, useCartItems } from "@/data/store/useCartStore";

export default function PaymentContainer() {
  const { calculateTotalPrice } = useCartActions();

  const totalPrice = calculateTotalPrice();
  const itemsToCheckout = useCartItems();

  const [paymentState, setPaymentState] =
    useState<PaymentStates>("beforeRequest");
  const [agree, setAgree] = useState(false);

  const startPayment = () => {
    setPaymentState("preparation");
  };

  const waitingForPayment = () => {
    setPaymentState("pending");
  };

  const paymentFinished = () => {
    setPaymentState("completed");
  };

  const handleAgree = () => {
    setAgree(!agree);
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.title}>Payment</div>
      <ProgressIndicator paymentState={paymentState} />

      <div className={s.receiptContainer}>
        <div className={s.receiptTitle}>Receipt</div>
        <div className={s.receiptTotal}>{`total : $${totalPrice}`}</div>

        {itemsToCheckout.map((item: CartType, index: number) => (
          <div key={index}>
            <Cart item={item} />
            {/*<div className={s.receiptItem}>
              {`Quantity of ${item.title} : ${item.quantity}`}
            </div> */}
          </div>
        ))}
      </div>
      <div className={s.checkoutBar}>
        <div className={s.checkboxContainer}>
          <input
            type="checkbox"
            checked={agree}
            onClick={handleAgree}
            style={{ width: "24px", height: "24px" }}
            className={s.input}
          />
          <div className={s.noticeContainer}>
            <div className={s.agreement}>I agree with</div>
            <div className={s.agreement}>this transaction</div>
          </div>
        </div>
        <div className={`${s.checkoutButton} ${agree ? s.agree : ""}`}>
          CheckOut!
        </div>
      </div>
    </div>
  );
}
