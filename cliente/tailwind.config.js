/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color_navbar': '#ac0c3c',
        'color_navbar_hover': '#95002c'
      },
      transitionDuration: {
        '0.5': '0.5s',
      },
    },
  },
  plugins: [],
}
