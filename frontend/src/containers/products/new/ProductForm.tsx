import { useState } from "react";
import styles from "./ProductForm.module.scss";
import { RequestPostProductDto } from "@/type/types";

interface ProductFormProps {
  onSubmit: (formData: RequestPostProductDto) => void;
}
export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    imageSrc: "/assets/logo192.png", // 기본 이미지
    title: "",
    price: "",
    discount: 0,
    seller: "",
    deadline: "",
    category: "fruit", // 기본 카테고리
    description: "",
    progress: 0,
    goal: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.label}>
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="discount" className={styles.label}>
          Discount (%):
        </label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="seller" className={styles.label}>
          Seller:
        </label>
        <input
          type="text"
          name="seller"
          value={formData.seller}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="deadline" className={styles.label}>
          Deadline:
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Category:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="imageSrc" className={styles.label}>
          Image URL:
        </label>
        <input
          type="text"
          name="imageSrc"
          value={formData.imageSrc}
          onChange={(e) =>
            setFormData({
              ...formData,
              imageSrc: e.target.value || "/assets/logo192.png",
            })
          }
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Product
      </button>
    </form>
  );
}
