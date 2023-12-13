/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue': '#489CFF',
        'dark-green': '#73CA5C',
        'dark-blue': '#6148FF',
        'dark-red': '#FF4D4D',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
