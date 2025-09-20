/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
        }
      }
    },
  },
  plugins: [],
}
