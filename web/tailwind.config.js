/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hazel: {
          50: '#F8F3ED',
          100: '#EDE4D6',
          200: '#D4C0A0',
          300: '#B89B6F',
          400: '#8B6F47',
          500: '#6B5535',
          600: '#4A3A24',
          DEFAULT: '#8B6F47',
        },
        cream: {
          50: '#FEFCF9',
          100: '#FDF6EE',
          200: '#F9EDD9',
          300: '#F2DFC0',
          DEFAULT: '#FDF6EE',
        },
        sage: {
          DEFAULT: '#A8B5A0',
          light: '#C8D4C2',
          dark: '#7B8E6F',
        },
        terracotta: '#C67B5C',
        'dusty-rose': '#D4A5A5',
        charcoal: '#2A2A2A',
        midnight: '#1A1A2E',
        plum: '#7B2D5F',
        lavender: '#B19CD9',
        coral: '#FF8C69',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        morph: 'morph 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(at 40% 20%, hsla(28,45%,82%,0.6) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(340,30%,82%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(120,20%,72%,0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(36,50%,72%,0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(340,30%,82%,0.4) 0px, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
