module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hexadecimal-code': '#00b3d2',
        'light-hexadecimal-code': '#4595ca'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
