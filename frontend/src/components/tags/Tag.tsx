import s from "@/components/tags/Tag.module.scss";

interface TagProps {
  content: string;
}

export default function Tag({ content }: TagProps) {
  return <div className={s.tag}>{content}</div>;
}
