import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import ChatgptRobotMessage from "./chat-robot-message";
import ChatgptRobotForm from "./chat-robot-form";

import styles from "./index.module.scss";

import { DEFAULT_CONFIG } from "./default-config";

const ChatgptRobotComponent = (props) => {
  const config = {
    ...DEFAULT_CONFIG,
    ...props.config,
  };

  const { appName, initMessage, title, userInfo, replyInfo } = config;

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const scrollContainerRef: any = useRef(null);
  const scrollTimer: any = useRef(null);
  const scrollBottom = () => {
    scrollTimer.current = setInterval(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 800);
  };
  useEffect(() => {
    setVisible(props.visible);
    return () => {
      scrollTimer.current && clearInterval(scrollTimer.current);
    };
  }, [props.visible]);

  const closeModal = () => {
    const { onClose } = props;
    onClose && onClose();
    setVisible(false);
  };

  const messages = useRef(initMessage ? [initMessage] : []);

  const sendChatGPTMessage = ($event) => {
    const { message } = $event;
    setLoading(true);

    let forms = new FormData();
    forms.append("input", message);

    axios
      .post(config.gptApi, forms)
      .then((res: any) => {
        setLoading(false);
        if (!res || !res?.data) {
          const error = res.error || res.msg || "unknown error";
          messages.current.push({
            text: `ChatGPT Error: ${error}`,
            date: new Date(),
            reply: true,
            type: "text",
            user: {
              name: replyInfo.name,
              avatar: replyInfo.avatar,
            },
          });
          return;
        }
        messages.current.push({
          text: res.data,
          date: new Date(),
          reply: true,
          type: "text",
          user: {
            name: replyInfo.name,
            avatar: replyInfo.avatar,
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        messages.current.push({
          text: "ChatGPT Error",
          date: new Date(),
          reply: true,
          type: "error",
          user: {
            name: replyInfo.name,
            avatar: replyInfo.avatar,
          },
        });
      })
      .finally(() => {
        scrollBottom();
      });
  };

  const addMessageTextToChat = (text) => {
    messages.current.push({
      text: text,
      date: new Date(),
      reply: false,
      type: "text",
      user: {
        name: userInfo.name,
        avatar: userInfo.avatar,
      },
    });
  };

  const sendMessage = ($event) => {
    addMessageTextToChat($event.message);
    sendChatGPTMessage($event);
    scrollBottom();
  };

  return (
    <div
      className={`${styles["chatgpt-robot"]} ${
        visible ? styles["chatgpt-robot-open"] : styles["chatgpt-robot-close"]
      } `}
      style={config.robotStyle || {}}
    >
      <header className={styles["chatgpt-robot-header"]}>
        {title}
        <span onClick={closeModal}>&times;</span>
      </header>
      <div className={styles["chatgpt-robot-message"]} ref={scrollContainerRef}>
        {messages.current.map((msg, index) => (
          <ChatgptRobotMessage key={index} data={msg}></ChatgptRobotMessage>
        ))}
      </div>
      <ChatgptRobotForm
        loading={loading}
        placeholder={config.placeholder}
        inputMaxLength={config.inputMaxLength}
        onSend={(e) => sendMessage(e)}
      />
    </div>
  );
};

export default ChatgptRobotComponent;
