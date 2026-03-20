/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/js/**/*.js",
    "./components/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF6321',
        'brand-blue': '#00D4FF',
      },
    },
  },
  plugins: [],
}
