/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#7DD3FC', // sky-300
          DEFAULT: '#38BDF8', // sky-400
          dark: '#0EA5E9', // sky-500
        }
      }
    },
  },
  plugins: [],
};