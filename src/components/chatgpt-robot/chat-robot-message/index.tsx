import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import StarMotivation from "../star-motivation";

function formatTime(date) {
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
  const delay = 20;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer;
    if (type === "loading") {
      setDisplayedText(".");
      timer = setInterval(() => {
        setDisplayedText((prevValue) => {
          return prevValue.length < 7 ? prevValue + "." : ".";
        });
      }, 1000);
      return;
    }

    if (["init", "error"].includes(type) || !reply) {
      setDisplayedText(text);
      return;
    }
    let index = 0;
    timer = setInterval(() => {
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
      className={`${styles["chat-robot-message"]} ${
        styles["chatgpt-robot-message-item"]
      }  ${reply ? styles["reply"] : styles["not-reply"]}`}
    >
      <img className={styles["avatar"]} src={avatar} />
      <div className={styles["message"]}>
        <p className={styles["sender"]}>
          <span className={styles["mr-5px"]}>{name}</span>
          <span>{formatTime(date)}</span>
        </p>
        <div className={styles["message-content"]}>
          {type === "init" ? (
            <StarMotivation data={props.data} />
          ) : (
            <pre className={styles["text"]}>{displayedText}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatgptRobotMessage;
