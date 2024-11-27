module.exports = {
  extends: [
    "plugin:vue/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    "vue/html-indent": "off"
  }
};
