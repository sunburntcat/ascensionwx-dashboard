module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    color:{
      magenta: {
        300: '#C416EC',
        400: 'B301D4',
        600: '#8C01AA',
        900: '#670A86',
      },
    },
    screen: {
      'xs': '475px',
    },
    extend: {},
  },
  plugins: [
    //require('@tailwindcss/forms'),
  ],
}
