import s from "./ProductItem.module.scss";
import Tag from "@/components/tags/Tag";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigDown } from "lucide-react";
import { Product } from "@/type/types";
import { replaceId, PATHS } from "@/constants/appRoutes";

interface ProductItemProps {
  item: Product;
}

export default function ProductItem({ item }: ProductItemProps) {
  const { id, imageSrc, title, price, discount, category, seller, deadline } =
    item;
  const pathTodetail = replaceId(PATHS.productDetail, String(id));
  return (
    <Link href={pathTodetail} className={s.productContainer}>
      <div className={s.tagSection}>
        <Tag content={category} />
      </div>
      <div className={s.imageSection}>
        <Image src={imageSrc} alt={title} width={90} height={90} />
      </div>
      <div className={s.detailsSection}>
        <div className={s.titleSection}>
          <span className={s.title}>{title}</span>
        </div>
        <div className={s.priceSection}>
          <span className={s.price}>{`$${price}`}</span>
          <span className={s.highlight}>{`${discount}%`}</span>
          <ArrowBigDown stroke="#15b1b1" />
        </div>
        <div className={s.descBox}>
          <span className={s.desc}>{seller}</span>
          <span className={s.deadline}>{deadline}</span>
        </div>
      </div>
    </Link>
  );
}
