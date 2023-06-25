import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";
import styles from "rollup-plugin-styles";

const overrides = {
  compilerOptions: { declaration: true },
  exclude: [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/**/*.stories.mdx",
    "src/setupTests.ts",
  ],
};

const config = {
  input: "src/components/index.tsx",
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    styles({
      // modules: {
      // mode: "local",
      mode: "inject",
      autoModules: true
      // autoModules: true
      // generateScopedName: "chatgptAAA_[local]_[hash:4]", // 控制我们的css生成规则。
      // },
    }),
    // sass({ output: "dist/index.css" }),
  ],
};

export default config;
