// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // 强制使用双引号
    quotes: ["error", "double"],
    // 强制使用分号
    semi: ["error", "always"],
    // 设置制表符大小为 2
    indent: ["error", 2],
    // 禁止使用制表符，强制使用空格
    "no-tabs": "error",
    "no-undef": "off",
    "no-unused-vars": "warn",
    "vue/html-self-closing": "off"
  },
});
