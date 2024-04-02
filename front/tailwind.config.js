/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { withMaterialColors } = require('tailwind-material-colors')

module.exports = withMaterialColors({
  content: ['./node_modules/actify/dist/**/*.{js,jsx}',"./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        mainBg:"#eaddff"
      }
    }
  },
  plugins: []

},
    {
      primary: '#006a6a'
    }
)

