/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        lightGray: "#78909c",
        serchButtonBg: "#f8f8f8",
        lightWhite: "#f2f2f2",
        shimmerColor: "#f5f5f5",
      },
      screens: {
        tablet: "481px",
        laptop: "769px",
        desktop: "1025px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
