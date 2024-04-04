import { useEffect, useState } from "react";
import ToastNotification from "../ToastNotification";
import { motion, useAnimation } from "framer-motion";
import { verify } from "@/app/lib/Auth";
import { toast } from "react-toastify";
import styles from "./VerifyCode.module.scss";

export const VerifyCode = ({ onVerified }: { onVerified: () => void }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [submitCode, setSubmitCode] = useState("");
  const submit = useAnimation();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value);
  };

  useEffect(() => {
    const onVerify = async () => {
      await verify(submitCode).then((res) => {
        if (res) {
          onVerified();
          // toast.success("verified!");
        } else {
          toast.error("invalid code");
        }
      });
    };

    if (submitCode !== "") {
      onVerify();
    }
  }, [submitCode, onVerified]);

  return (
    <>
      <ToastNotification />
      <div className={styles.container}>
        <motion.input
          animate={submit}
          transition={{ duration: 1 }}
          maxLength={15}
          // rows={1}
          onChange={handleTextAreaChange}
          type="password"
          className={styles.textArea}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSubmitCode(textAreaValue);
            }
          }}
        ></motion.input>
      </div>
    </>
  );
};
