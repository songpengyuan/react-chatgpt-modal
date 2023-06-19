import React, { useState } from "react";

import styles from "./index.module.scss";

const ChatgptRobotForm = (props) => {
  const { onSend, loading, placeholder } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (loading) return;
    if (!String(inputValue).trim().length) return;
    onSend({ message: inputValue });
    setInputValue("");
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
        placeholder={placeholder || "#OPENAPI_KEY 发送消息到 AI"}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
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
