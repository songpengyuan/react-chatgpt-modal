import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import ChatgptRobotMessage from "./chat-robot-message/index.tsx";
import ChatgptRobotForm from "./chat-robot-form/index.tsx";
import styles from "./index.module.scss";

const ChatgptRobotComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const TITLE = "ChatGPT Robot";
  const MAX_LIMIT = 5;
  const MAX_TOKEN_LENTH_LIMIT = 4000;
  const appName = "Higress";

  const scrollContainerRef: any = useRef(null);
  const scrollTimer: any = useRef(null);
  const scrollBottom = () => {
    scrollTimer.current = setTimeout(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 800);
  };
  useEffect(() => {
    setVisible(props.visible);
    return () => {
      scrollTimer.current && clearTimeout(scrollTimer.current);
    };
  }, [props.visible]);

  const closeModal = () => {
    const { onClose } = props;
    onClose && onClose();
    setVisible(false);
  };

  const initMessage = {
    text: `请在输入框中发送 OpenAI 密钥，开始于 # `,
    date: new Date(),
    reply: true,
    type: "init",
    user: {
      name: appName,
      avatar: "https://avatars.githubusercontent.com/u/116630909?s=200&v=4",
    },
  };

  const powerBy = {
    title: "APISpace",
    link: "https://www.apispace.com?utm_source=postcat&utm_medium=robot&utm_term=chatgptturbo",
  };

  const messages = useRef([
    initMessage,
    {
      text: `请在输入框中发送 OpenAI 密钥，开始于 # `,
      date: new Date(),
      reply: false,
      type: "text",
      user: {
        name: "游客",
        avatar:
          "https://data.eolink.com/PXMbLGmc2f0b29596764f7456eefb75478ed77b4fd172d9",
      },
    },
  ]);

  const sendChatGPTMessage = ($event) => {
    const { message } = $event;
    setLoading(true);
    // var form = new FormData();
    // form.append("input", "帮我生成Dubbo接入示例代码");

    const formData = {
      input: message, // "今天是几号",
    };
    const config = {
      headers: {
        "cache-control": "no-cache",
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        "postman-token": "5392232b-4ceb-ad40-c3cd-31c3d4139982",
      },
    };

    axios
      // .post("http://47.251.1.215/chat/gpt", formData, config)
      // .post("http://localhost:3000/chat/gpt", formData, config)
      // .post("http://gpt.xiaoman.com/chat/gpt", formData, config)
      .post("/chat/gpt", formData, config)
      .then((res: any) => {
        debugger;
        setLoading(false);
        if (!res || !res?.result) {
          const error = res.error || res.msg || "unknown error";
          messages.current.push({
            text: `ChatGPT Error: ${error}`,
            date: new Date(),
            reply: true,
            type: "text",
            user: {
              name: "ChatGPT",
              avatar:
                "https://data-apibee.apispace.com/license/167773762614902e10710-8d88-4d7e-b962-2df477b361ec",
            },
          });
          return;
        }
        messages.current.push({
          text: res.result,
          date: new Date(),
          reply: true,
          type: "text",
          user: {
            name: "ChatGPT",
            avatar:
              "https://data-apibee.apispace.com/license/167773762614902e10710-8d88-4d7e-b962-2df477b361ec",
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
            name: "ChatGPT",
            avatar:
              "https://data-apibee.apispace.com/license/167773762614902e10710-8d88-4d7e-b962-2df477b361ec",
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
        name: "Visitor",
        avatar:
          "https://data.eolink.com/PXMbLGmc2f0b29596764f7456eefb75478ed77b4fd172d9",
      },
    });
  };

  const sendMessage = ($event) => {
    if ($event.message.startsWith("#")) {
      addMessageTextToChat($event.message);
      messages.current.push({
        text: `You can now start chatting with ChatGPT`,
        date: new Date(),
        reply: true,
        type: "text",
        user: {
          name: appName,
          avatar: "./assets/images/logo.svg",
        },
      });
      return;
    }
    addMessageTextToChat($event.message);
    sendChatGPTMessage($event);
    scrollBottom();
  };

  return (
    <div
      className={`${styles["chatgpt-robot"]} ${
        visible ? styles["chatgpt-robot-open"] : styles["chatgpt-robot-close"]
      } `}
    >
      <header className={styles["chatgpt-robot-header"]}>
        {TITLE}
        <span onClick={closeModal}>&times;</span>
      </header>
      <div className={styles["chatgpt-robot-message"]} ref={scrollContainerRef}>
        {messages.current.map((msg, index) => (
          <ChatgptRobotMessage key={index} data={msg}></ChatgptRobotMessage>
        ))}
      </div>
      <ChatgptRobotForm loading={loading} onSend={(e) => sendMessage(e)} />
    </div>
  );
};

export default ChatgptRobotComponent;
