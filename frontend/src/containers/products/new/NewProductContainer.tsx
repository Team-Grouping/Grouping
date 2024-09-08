"use client";

import ProductForm from "@/containers/products/new/ProductForm";
import { useProductActions } from "@/data/store/useProductStore";
import { useRouter } from "next/navigation";
import s from "@/containers/products/new/NewProductContainer.module.scss";
import { RequestPostProductDto } from "@/type/types";

export default function NewProductContainer() {
  const { handleAdd } = useProductActions();
  const router = useRouter();

  const handleSubmit = (formData: RequestPostProductDto) => {
    handleAdd(formData);
    router.push("/");
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}> Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
