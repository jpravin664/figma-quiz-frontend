module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1fbfd',
          100: '#e9f8fa',
          200: '#cfeff5',
          300: '#b5e6ef',
          400: '#8fd7e3',
          500: '#4aa7b7',
          600: '#2b6b7a',
        },
        lightbg: '#eef9fb',
        card: '#ffffff',
      },
      fontFamily: {
        serifFancy: ['"Cormorant Garamond"', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl2: '18px'
      },
      
    },
  },
  plugins: [],
}
