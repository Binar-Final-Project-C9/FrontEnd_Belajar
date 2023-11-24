/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#489CFF",
        "dark-green": "#73CA5C",
        "dark-blue": "#6148FF",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
