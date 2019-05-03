import ts from "@wessberg/rollup-plugin-ts";
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: ["src/index.ts", "src/script-definitions/**/*.ts"],
  output: [
    {
      file: "dist/js-script-checker.js",
      format: "iife",
      name: "JsScriptChecker",
      sourcemap: "inline"
    }
  ],
  plugins: [multiEntry(), ts()],
  watch: {
    exclude: "node_modules/**"
  }
};
