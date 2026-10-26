/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        podium: ['"FSP DEMO - PODIUM Sharp 4.11"', 'Impact', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
