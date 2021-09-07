module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './layouts/**/*.{html,js}',
    './index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
    },
  },
  plugins: [],
}
