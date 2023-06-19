import React, { useState, useEffect } from "react";

import "./index.css";

function formatTime(date) {
  // return new Intl.DateTimeFormat("en-US", {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

const ChatgptRobotMessage = (props) => {
  const { date, text, reply, type, user } = props.data || {};
  const { name, avatar } = user || {};
  const delay = 300;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (["init", "error"].includes(type) || !reply) {
      setDisplayedText(text);
      return;
    }
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [text, delay]);

  return (
    <div
      className={`chat-robot-message chatgpt-robot-message-item ${
        reply ? "reply" : "not-reply"
      }`}
    >
      <img className="avatar" src={avatar} />
      <div className="message flex flex-col">
        <p className="sender">
          <span className="mr-[5px]">{name}</span>
          <span>{formatTime(date)}</span>
        </p>
        <div className="message-content">
          <pre className="text !mb-0"> {displayedText} </pre>
        </div>
      </div>
    </div>
  );
};

export default ChatgptRobotMessage;
