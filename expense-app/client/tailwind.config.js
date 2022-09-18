// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     screens: {
//       sm: "576px",

//       md: "960px",
//       lg: "1440px",
//     },
//   },
//   plugins: [],
// };
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
});
