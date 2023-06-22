/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        colortext: "#2F4F4F",
        primary: "#008000",
        dark: {
          light:"#32CD32",
          hard: "#006400",
          soft: "#008000",
        },
      },
      fontFamily:{
        opensans: ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
}

