const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Slab", "Noto Sans", ...defaultTheme.fontFamily.sans],
      },
      // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
      typography: (theme) => ({
        lg: {
          css: {
            maxWidth: "85ch",
            img: {
              marginTop: "1px",
              marginBottom: "1px",
            },
            pre: {
              marginTop: "0",
              borderRadius: "0",
            },
            h1: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h2: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h3: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h4: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h5: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h6: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
          },
        },
        xl: {
          css: {
            h1: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h2: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h3: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h4: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h5: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h6: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
          },
        },
        "2xl": {
          css: {
            h1: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h2: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h3: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h4: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h5: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h6: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
          },
        },
        DEFAULT: {
          css: {
            // fontSize: '1rem',
            // fontWeight: '550',
            maxWidth: "80ch",
            img: {
              marginTop: "1px",
              marginBottom: "1px",
            },
            strong: {
              fontWeight: "900",
            },
            blockquote: {
              fontSize: "0.9rem",
              fontStyle: "not-italic",
              fontWeight: "400",
            },
            pre: {
              marginTop: "0",
              fontSize: "0.8rem",
              borderRadius: "0",
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
            table: {
              display: "block",
              whiteSpace: "pre",
              overflowX: "auto",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: "0.1em",
              marginBottom: "0.1em",
            },
            li: {
              marginTop: "0.1em",
              marginBottom: "0.1em",
            },
            h1: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h2: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h3: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h4: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h5: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
            h6: {
              marginTop: "1.75rem",
              marginBottom: "1.75rem",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
