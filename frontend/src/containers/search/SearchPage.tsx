import { useState } from "react";
import Image from "next/image";
import s from "@/containers/search/SearchPage.module.scss";
import { categoryType } from "@/type/types";

export default function SearchPageContainer() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState<categoryType>(undefined);
  const searchIcon = "/images/searchIcon.svg";

  const handleCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const newCategory = e.target.value as categoryType;
    setCategory(newCategory);
    console.log(e.target.form);
  };

  return (
    <div className={s.SearchPageContainer}>
      <div className={s.textfield}>
        <input
          type="text"
          placeholder="Enter the Keyword"
          className={s.searchInput}
        />
        <Image
          src={searchIcon}
          alt="search"
          width={28}
          height={28}
          className={s.searchIcon}
        />
      </div>

      <div className={s.selectorContainer}>
        <div className={s.category}>Category</div>
        <select
          name="category"
          value={category}
          onChange={handleCategory}
          className={s.selector}
        >
          <option value={undefined}>All</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>
    </div>
  );
}
