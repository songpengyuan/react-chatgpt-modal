const path = require("path");

module.exports = function override(config, env) {
  config.entry = "./src/components/index.js";
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, "./lib"),
    filename: "chatgpt-robot.js",
    library: "chatgpt-robot",
    libraryTarget: "umd",
  };
  return config;
};
