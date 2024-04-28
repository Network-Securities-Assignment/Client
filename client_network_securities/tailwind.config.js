/** @type {import('tailwindcss').Config} */
// const defaultColors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: '414px',
      // => @media (min-width: 414px) { ... }
      tablet: '834px',
      // => @media (min-width: 834px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      boxShadow:{
        1: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
        2: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
        'clicked': '#D6D6E7 0 3px 7px inset',
        'clicked-menu': '#40513B 0 3px 7px inset',
        'select' : 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
        'crop-display' : '#1d371f 0px 1px 4px, #458446 0px 0px 0px 3px'
      },
      colors: {
        main: {
          100: '#222831',
          200: '#393E46',
          300: '#00ADB5',
          400: '#EEEEEE',
          500: '#8198a5'
        }, 
        primary: {
          '50': '#f2f8f1',
          '100': '#e1edde',
          '200': '#c2dbbf',
          '300': '#96c194',
          '400': '#79ac78',
          '500': '#458446',
          '600': '#336835',
          '700': '#29532c',
          '800': '#224324',
          '900': '#1d371f',
          '950': '#0f1f11',
        }
      },
      animation:{
        bounceRight: 'bounceRight 1s infinite',
        typing: 'typing 4s steps(40,end), blink-caret .75s step-end infinite',

      },
      keyframes:{
        bounceRight: {
            '0%, 100%': {
              transform: 'translateX(-10%)',
              'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
            },
            '50%':{
              transform: 'translateX(0)',
              'animation-timing-function':' cubic-bezier(0, 0, 0.2, 1)'
            }
        },
        typing:{
          '0%': {
            width: 0,
            visibility: "hidden"
          },
          '100%': {
            width: '100%',
          }
        },
        'blink-caret':{
          '0%, 100%': {
            'border-color': 'transparent',
          },
          '50%': {
            'border-color': 'white',
          }
        }
      }
      
    },
  },
  plugins: [],
}

