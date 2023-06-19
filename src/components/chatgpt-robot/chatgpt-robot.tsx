import React, { useState, useRef } from "react";
import axios from "axios";

import ChatgptRobotMessage from "./chat-robot-message/index.tsx";
import ChatgptRobotForm from "./chat-robot-form/index.tsx";
import "./chatgpt-robot.css";

const ChatgptRobotComponent = () => {
  const [loading, setLoading] = useState(false);
  const TITLE = "ChatGPT Robot";
  const MAX_LIMIT = 5;
  const MAX_TOKEN_LENTH_LIMIT = 4000;
  const appName = "Higress";
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
        avatar: "https://avatars.githubusercontent.com/u/116630909?s=200&v=4",
      },
    },
  ]);

  const getTextLenth = (text) => {
    // const tokenizer = new GPT3Tokenizer({ type: 'gpt3' }); // or 'codex'
    // const encoded = tokenizer.encode(text);
    // return encoded.text ? encoded.text.length : text.length;
  };

  const getMessageLength = (message) => {
    const text = message.map((val) => val.text).join();
    return getTextLenth(text);
  };

  const getMessage = (messageNumber = 15) => {
    if (messageNumber <= 0) return [];

    const result = messages.current
      .filter(
        (val) =>
          !val.reply ||
          (val.reply &&
            (!val.text?.includes("ChatGPT Error") ||
              val.user?.name === appName))
      )
      .slice(-messageNumber);

    return result;
  };

  const sendChatGPTMessage = ($event) => {
    setLoading(true);

    // var form = new FormData();
    // form.append("input", "帮我生成Dubbo接入示例代码");

    const formData = {
      // input: "帮我生成Dubbo接入示例代码",
      input: "今天是几号",
    };

    axios
      .post("http://47.251.1.215/chat/gpt", formData)
      .then((res) => {
        debugger;
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
      });

    // trace.current.report('send_chatGPT');
    // http.current
    //   .post(`${APP_CONFIG.EXTENSION_URL}/chatGPT`, {
    //     key: APIKey,
    //     message: transferMessage2Body(getMessage())
    //   })
    //   .subscribe({
    //     next: (res) => {
    //       setLoading(false);
    //       if (!res?.result) {
    //         const error = res?.error || res?.msg || 'unknown error';
    //         messages.current.push({
    //           text: `ChatGPT Error: ${error}`,
    //           date: new Date(),
    //           reply: true,
    //           type: 'text',
    //           user: {
    //             name: 'ChatGPT',
    //             avatar: 'https://data-apibee.apispace.com/license/167773762614902e10710-8d88-4d7e-b962-2df477b361ec'
    //           }
    //         });
    //         return;
    //       }
    //       messages.current.push({
    //         text: res.result,
    //         date: new Date(),
    //         reply: true,
    //         type: 'text',
    //         user: {
    //           name: 'ChatGPT',
    //           avatar: 'https://data-apibee.apispace.com/license/167773762614902e10710-8d88-4d7e-b962-2df477b361ec'
    //         }
    //       });
    //     },
    //     error: (e) => {

    //     }
    //   });
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
  };

  const watchExtensionChange = (inArg) => {
    switch (inArg.data.action) {
      case "install":
      case "enable": {
        // chat.current.open();
        break;
      }
    }
  };

  return (
    <div className="chatgpt-robot">
      <header className="chatgpt-robot-header">
        {TITLE}
        <span>&times;</span>
      </header>
      <div className="chatgpt-robot-container">
        <div className="chatgpt-robot-message">
          {messages.current.map((msg, index) => (
            <ChatgptRobotMessage key={index} data={msg}></ChatgptRobotMessage>
          ))}
          {/* {msg.text} */}
        </div>
        <ChatgptRobotForm onSend={(e) => sendMessage(e)} />
      </div>
    </div>
  );
};

export default ChatgptRobotComponent;
