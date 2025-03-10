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
          50: '#fff9e6',
          100: '#ffedb8',
          200: '#ffe08a',
          300: '#ffd45c',
          400: '#ffc72e',
          500: '#ffbb00',
          600: '#cc9500',
          700: '#997000',
          800: '#664a00',
          900: '#332500',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
