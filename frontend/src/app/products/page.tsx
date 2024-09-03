"use client";

import CreateProductButton from "@/containers/products/new/CreateProductButton";
import { ProductList } from "@/containers/products/ProductList";

export default function Products() {
  return (
    <>
      <ProductList />
      <CreateProductButton />
    </>
  );
}
