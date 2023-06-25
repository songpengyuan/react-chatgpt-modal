# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Components Config

```js
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
};
```

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
