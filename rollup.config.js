import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";

const config = {
  input: "src/EmojiSelect/index.jsx",
  output: [
    {
      file: "src/lib/jc-emoji-picker/index.js",
      format: "esm", // iife return a function, use in browser
      name: "EmojiPicker",
      globals: {
        self: "globalThis", // 将 self 映射到全局的 self 对象
        react: "React", // 映射到全局变量 React
        "react-dom": "ReactDOM", // 映射到全局变量 ReactDOM
        "react/jsx-runtime": "jsxRuntime", // React 18+ 需要
      },
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    terser({
      compress: {
        drop_debugger: true, // 移除 debugger 语句
        pure_funcs: ["console.log", "console.info"], // 移除特定函数调用
        dead_code: true, // 移除死代码
      },
      format: {
        beautify: true,
        wrap_iife: false,
      },
    }),
    nodeResolve({
      browser: true, // 针对浏览器环境
      preferBuiltins: false, // 不使用 Node.js 内置模块
    }),
    commonjs({
      // 自动处理大多数情况
      transformMixedEsModules: true, // 启用混合模块支持
      // 仅当绝对必要时添加
      requireReturnsDefault: "auto", // 或 "preferred"/"namespace"
    }),
    // json(),
    postcss({
      modules: {
        generateScopedName: "[local]_[hash:base64:5]",
      },
      //   extract: true, // 将 CSS 提取到单独文件
      minimize: true, // 生产环境压缩 CSS
      use: ["sass"], // 使用 sass 预处理器
      //   inject: true
      plugins: [autoprefixer()],
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
};

export default config;