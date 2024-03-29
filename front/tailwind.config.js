/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./node_modules/actify/dist/**/*.{js,jsx}',"./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary, 0 106 106) / <alpha-value>)',
        'on-primary':
            'rgb(var(--color-on-primary, 255 255 255) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary, 74 99 99) / <alpha-value>)',
        'on-secondary':
            'rgb(var(--color-on-secondary, 255 255 255) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary, 75 96 124) / <alpha-value>)',
        'on-tertiary':
            'rgb(var(--color-on-tertiary, 255 255 255) / <alpha-value>)',
        error: 'rgb(var(--color-error, 186 26 26) / <alpha-value>)',
        'on-error': 'rgb(var(--color-on-error, 255 255 255) / <alpha-value>)',
        surface: 'rgb(var(--color-surface, 250 253 252) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface, 25 28 28) / <alpha-value>)',
        'inverse-surface':
            'rgb(var(--color-inverse-surface, 45 49 49) / <alpha-value>)',
        'on-inverse-surface':
            'rgb(var(--color-on-inverse-surface, 239 241 240) / <alpha-value>)',
        outline: 'rgb(var(--color-outline, 111 121 121) / <alpha-value>)'
      }
    }
  },
  plugins: []
}

