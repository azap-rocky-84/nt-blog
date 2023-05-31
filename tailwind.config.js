/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
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
  plugins: [],
}

