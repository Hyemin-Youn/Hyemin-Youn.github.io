module.exports = {
  extends: [
    "plugin:vue/recommended",
    // 다른 규칙들
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
};
