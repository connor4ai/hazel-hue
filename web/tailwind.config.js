/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hazel: {
          50: '#F5F0EA',
          100: '#E6D9C7',
          200: '#D4C0A0',
          300: '#B89B6F',
          400: '#8B6F47',
          500: '#6B5535',
          DEFAULT: '#8B6F47',
        },
        cream: {
          50: '#FEFCF9',
          100: '#FDF6EE',
          200: '#F9EDD9',
          300: '#F2DFC0',
          DEFAULT: '#FDF6EE',
        },
        sage: '#A8B5A0',
        terracotta: '#C67B5C',
        'dusty-rose': '#D4A5A5',
        charcoal: '#3D3D3D',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        organic: '20px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(139,111,71,0)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(139,111,71,0.15)' },
        },
      },
    },
  },
  plugins: [],
};
