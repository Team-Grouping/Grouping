"use client";

import { useRouter } from "next/navigation";
import styles from "./CreateProductButton.module.scss";
import { PlusIcon } from "lucide-react";
import { PATHS } from "@/constants/appRoutes";

export default function CreateProductButton() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(PATHS.productNew); // 새 페이지로 이동
  };

  return (
    <button className={styles.addButton} onClick={handleButtonClick}>
      <PlusIcon />
    </button>
  );
}
