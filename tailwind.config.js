const defaultTheme = require('tailwindcss/defaultTheme')

// Px to REM function (static base of 16)
const pxToRem = (dest) => 1 / (16 / dest)

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    //   fontSize: Object.assign(
    //     { 0.5: '0.8125rem' },
    //     Array.from(Array(8).keys()).map(
    //       (i) => `${Math.pow(1.333, i).toFixed(3)}rem`
    //     )
    //   ),
    fontSize: {
      0.5: [
        `${pxToRem(13)}rem`,
        { letterSpacing: `${pxToRem(0.5)}rem`, lineHeight: 1.307 },
      ],
      0: [
        `${pxToRem(16)}rem`,
        { letterSpacing: `${pxToRem(0.2)}rem`, lineHeight: 1.3 },
      ],
      1: [
        `${pxToRem(21)}rem`,
        { letterSpacing: `-${pxToRem(0.2)}rem`, lineHeight: 1.287 },
      ],
      2: [
        `${pxToRem(28)}rem`,
        { letterSpacing: `-${pxToRem(0.6)}rem`, lineHeight: 1.27 },
      ],
      3: [
        `${pxToRem(38)}rem`,
        { letterSpacing: `-${pxToRem(0.8)}rem`, lineHeight: 1.247 },
      ],
      4: [
        `${pxToRem(51)}rem`,
        { letterSpacing: `-${pxToRem(1)}rem`, lineHeight: 1.216 },
      ],
      5: [
        `${pxToRem(67)}rem`,
        { letterSpacing: `-${pxToRem(2)}rem`, lineHeight: 1.175 },
      ],
      6: [
        `${pxToRem(90)}rem`,
        { letterSpacing: `-${pxToRem(2)}rem`, lineHeight: 1.12 },
      ],
      7: [
        `${pxToRem(120)}rem`,
        { letterSpacing: `-${pxToRem(2)}rem`, lineHeight: 1.047 },
      ],
    },
    colors: {
      whites: {
        500: 'rgba(255,255,255,0.5)',
        800: 'rgba(255,255,255,0.82)',
        1000: '#FFFFFF',
      },
      grays: {
        0: '#000000',
      },
    },
    screens: {
      // mobile first -> (min-width:xxx)
      xs: `${pxToRem(320)}rem`,
      sm: `${pxToRem(576)}rem`,
      m: `${pxToRem(768)}rem`,
      l: `${pxToRem(1024)}rem`,
      xl: `${pxToRem(1440)}rem`,
    },
  },
  plugins: [],
}
