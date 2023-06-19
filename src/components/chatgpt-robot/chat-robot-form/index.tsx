import React, { useState } from "react";

import "./index.css";

const ChatgptRobotForm = (props) => {
  const onSend = props.onSend;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="chatgpt-robot-form">
      <textarea
        className="chatgpt-robot-textarea"
        placeholder="#OPENAPI_KEY 发送消息到 AI"
        onChange={handleInputChange}
      ></textarea>
      <button
        className="chatgpt-robot-form-btn"
        onClick={() => {
          onSend({ message: inputValue });
        }}
      >
        发送
      </button>
    </div>
  );
};

export default ChatgptRobotForm;
