"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProductItems } from "@/data/store/useProductStore";
import { ArrowBigDown } from "lucide-react";
import styles from "@/containers/products/detail/ProductDetailContainer.module.scss";

export default function ProductDetailContainer() {
  const pathname = usePathname();
  const productId = Number(pathname.split("/")[2]);
  const productItems = useProductItems();
  const item = productItems[productId - 1];
  const {
    imageSrc,
    title,
    price,
    discount,
    seller,
    deadline,
    category,
    description,
    progress,
    goal,
  } = item;

  return (
    <>
      <div className={styles.descriptionContainer}>
        <Image
          src={imageSrc}
          alt="productImage"
          width={200}
          height={200}
          className={styles.productImg}
        ></Image>
        <div className={styles.itemDescription}>
          <div className={styles.category}>{category}</div>
          <div className={styles.titleAndPrice}>
            <div className={styles.title}>{title}</div>
            <div className={styles.priceContainer}>
              <div className={styles.price}>{`$${price}`}</div>
              <div className={styles.discount}>{`${discount}%`}</div>
              <ArrowBigDown stroke="rgb(219, 17, 135)" />
            </div>
          </div>

          <div className={styles.seller}>{`Seller : ${seller}`}</div>
          <div className={styles.deadline}>{`Duedate : ${deadline}`}</div>

          <div className={styles.progressContainer}>
            <div className={styles.progressNotice}>
              <span>Progression of the GroupBuy : </span>
              <span className={styles.progressValue}>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressIndicator}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </>
  );
}
