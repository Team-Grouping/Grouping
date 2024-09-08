"use cleint";

import s from "@/containers/products/ProductList.module.scss";
import ProductItem from "@/containers/products/ProductItem";
import {
  useProductItems,
  useProductActions,
} from "@/data/store/useProductStore";
import { useEffect } from "react";

export function ProductList() {
  const { resetProducts } = useProductActions();
  useEffect(() => {
    resetProducts();
  }, []);

  const productItems = useProductItems();

  const content = productItems.map((product, index) => (
    <div key={index} className={s.productListItem}>
      <ProductItem item={product} />
    </div>
  ));
  return <div className={s.productListContainer}>{content}</div>;
}
