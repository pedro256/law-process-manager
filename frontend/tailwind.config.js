/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: {
          50: '#fdf2f5',
          100: '#fce7ec',
          200: '#f8c4d3',
          300: '#f49eb8',
          400: '#eb5c86',
          500: '#db295c',
          600: '#6d0330', // Brand color
          700: '#5f022a',
          800: '#4f0224',
          900: '#42021e',
        },
        secondary: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#ffffff',
          600: '#ffffff', // White
          700: '#f2f2f2',
          800: '#e6e6e6',
          900: '#d9d9d9',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        }
      },
      boxShadow: {
        card: '0 2px 5px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};