/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#242424',
        paper: '#f7f5f1',
        accent: '#e66a2c',
      },
      boxShadow: {
        soft: '0 14px 40px rgba(25, 25, 25, 0.08)',
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
