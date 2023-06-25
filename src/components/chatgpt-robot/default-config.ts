const replyInfo = {
  name: "Higress",
  avatar: "https://avatars.githubusercontent.com/u/116630909?s=200&v=4",
};

const initMessage = {
  text: `您好~ 如果您喜欢 <b>ChatGPT 插件</b>，请给 Higress 一颗星！ <br /> 您的支持是我们最大的动力～`,
  img: "https://postcat.com/zh/assets/images/heart.png",
  link: "https://github.com/alibaba/higress",
  date: new Date(),
  reply: true,
  type: "init",
  user: replyInfo,
};

export const DEFAULT_CONFIG = {
  title: "ChatGPT Robot",
  gptApi: "http://47.251.1.215/chat/gpt",
  appName: "Higress",
  placeholder: "请输入你的问题",
  inputMaxLength: 1000,
  initMessage,
  userInfo: {
    name: "Visitor",
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  },
  replyInfo,
  robotStyle: {},
};
