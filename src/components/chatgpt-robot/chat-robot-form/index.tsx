import React, { useState } from "react";

import styles from "./index.module.scss";

const ChatgptRobotForm = (props) => {
  const { onSend, loading, placeholder, inputMaxLength } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (loading) return;
    const message = String(inputValue).trim();

    if (!message.length) return;
    onSend({ message: message });
    setTimeout(() => {
      setInputValue("");
    }, 100);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 在这里执行回车事件的操作
      sendMessage();
    }
  };

  return (
    <div className={styles["chatgpt-robot-form"]}>
      <textarea
        value={inputValue}
        className={styles["chatgpt-robot-textarea"]}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        maxLength={inputMaxLength}
      ></textarea>
      <button
        className={styles["chatgpt-robot-form-btn"]}
        onClick={() => {
          sendMessage();
        }}
      >
        发送
      </button>
    </div>
  );
};

export default ChatgptRobotForm;
