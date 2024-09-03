import Image from "next/image";
import s from "./PaymentProgressIndicator.module.scss";
import { PaymentStates } from "@/type/types";

interface progressIndicatorProps {
  paymentState: PaymentStates;
}

export default function ProgressIndicator({
  paymentState,
}: progressIndicatorProps) {
  //const [progressStatus, setProgressStatus] = useState("");
  //progressStatus가 "preparation", "pending", "completed"로 변함에 따라 이미지 변경
  const waitingIcon = "/images/waiting.png";
  const completedIcon = "/images/waitingBlue.png";

  const setPreparationImg = () => {
    return paymentState === "preparation" ? completedIcon : waitingIcon;
  };
  const setPendingImg = () => {
    return paymentState === "pending" ? completedIcon : waitingIcon;
  };
  const setCompletedImg = () => {
    return paymentState === "completed" ? completedIcon : waitingIcon;
  };

  const progressIcons = [
    [setPreparationImg(), "Preparation"],
    [setPendingImg(), "Pending"],
    [setCompletedImg(), "Completed"],
  ];

  const colorOfDot = () => {
    if (paymentState === "completed") return 9;
    else if (paymentState === "pending") return 4;
    else return 0;
  };

  return (
    <div className={s.ProgressImgContainer}>
      {progressIcons.map((item, index) => (
        <div className={s.ProgressItem} key={index}>
          <Image src={item[0]} alt="progressImage" width={50} height={32} />
          <div className={`${s.dot} ${item[2] ? s.success : ""}`} />
          <div className={s.status}>{item[1]}</div>
        </div>
      ))}
      <div className={s.smallDotContainer}>
        {Array.from({ length: 9 }).map((val, idx) => (
          <div
            className={`${s.smallDot} ${idx < colorOfDot() ? s.blue : ""}`}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
