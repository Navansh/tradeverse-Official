/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        green: "#00B86B",
        "Gray/900": "#253343",
        "Bar": "#30445B",
        "Foundation": "#A3A3A3"
      },
      colors: {
        green: "#00B86B",
        "Gray/900": "#253343",
        "Bar": "#30445B",
        "Foundation": "#A3A3A3"
      },
      fontFamily: {
        "Roboto-Regular": "Roboto-Regular"
      },
      backgroundImage: {
        "hero-pattern": "url('../assets/bgimg.jpg')",
        "hero-pattern2": "url('../assets/bgimg2.png')",
        "hero-pattern3": "url('../assets/bgimg3.png')",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide')
  ],
};
