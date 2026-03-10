/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        hazel: {
          DEFAULT: '#8B6F47',
          50: '#F5F0EA',
          100: '#E6D9C7',
          200: '#D4C0A0',
          300: '#B89B6F',
          400: '#8B6F47',
          500: '#6B5535',
        },
        cream: {
          DEFAULT: '#FDF6EE',
          50: '#FEFCF9',
          100: '#FDF6EE',
          200: '#F9EDD9',
          300: '#F2DFC0',
        },
        sage: '#A8B5A0',
        terracotta: '#C67B5C',
        'dusty-rose': '#D4A5A5',
        charcoal: '#3D3D3D',
      },
      fontFamily: {
        display: ['Fraunces_400Regular'],
        'display-bold': ['Fraunces_700Bold'],
      },
    },
  },
  plugins: [],
};
