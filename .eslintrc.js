module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@vue/standard"],
  parserOptions: {},
  plugins: ["vuefix"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-extra-semi": 0, // 出现不必要的分号,
    "spaced-comment": 0,
    "no-multiple-empty-lines": [2, { max: 5 }], // 空行最多不能超过两行
    semi: 0, //强制语句分号结尾
    "comma-style": 0, //逗号风格
    "no-unused-vars": 0,
    "space-before-function-paren": 0,
    "comma-spacing": 0,
    "no-extend-native": 0,
    quotes: 0,
    "no-new-object": 2, //创建对象的时候用new object
    indent: 0,
    "no-octal-escape": 0,
    "prefer-const": 0,
    "no-async-promise-executor": 0,
    eqeqeq: 0,
  },
};
