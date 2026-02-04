/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corpiq: {
          blue: '#13315c',
          bordeaux: '#530f32',
          light: '#f4f4f4',
        }
      }
    },
  },
  plugins: [],
}

