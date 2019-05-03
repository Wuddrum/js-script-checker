import ts from "@wessberg/rollup-plugin-ts";
import multiEntry from "rollup-plugin-multi-entry";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

export default [
  {
    input: ["src/index.ts", "src/script-definitions/**/*.ts"],
    output: [
      {
        file: "dist/js-script-checker.js",
        format: "iife",
        name: "JsScriptChecker"
      }
    ],
    plugins: [multiEntry(), ts()]
  },
  {
    input: ["src/index.ts", "src/script-definitions/**/*.ts"],
    output: [
      {
        file: "dist/js-script-checker.min.js",
        format: "iife",
        name: "JsScriptChecker"
      }
    ],
    plugins: [
      multiEntry(),
      ts(),
      compiler({
        compilation_level: "SIMPLE"
      })
    ]
  }
];
