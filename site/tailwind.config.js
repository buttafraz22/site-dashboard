/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': {
          100: "#ffffff",
          200: "#f5f5f5",
          300: "#fbfbfb",
          400: "#ffffff",
          500: "#fffaf1",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
        },
      'teal': {
          100: "#edf8f9",
          200: "#CCE5E5",
          300: "#66B2B2",
          400: "#0e868f",
          500: "#063d42",
        },
        'secondary': {
          100: "#f7f7f7",
          200: "#f0f0f0",
          300: "#e8e8e8",
          400: "#e1e1e1",
          500: "#d9d9d9",
          600: "#aeaeae",
          700: "#828282",
          800: "#575757",
          900: "#2b2b2b"
        },
        'red': {
          100: "#ffcccc",
          200: "#ff9999",
          300: "#ff6666",
          400: "#ff3333",
          500: "#ff0000",
          600: "#cc0000",
          700: "#990000",
          800: "#660000",
          900: "#330000"
        },
        'gray' : '#97a1aa',
        blue: {
          100: "#cfe2ff",
          200: "#9ec5fe",
          300: "#6ea8fe",
          400: "#3d8bfd",
          500: "#0d6efd",
          600: "#0074d9",
          700: "#084298",
          800: "#052c65",
          900: "#031633"
        },
        'primary-testimonial-bluecolor':  "hsl(219, 30%, 18%)",
        "slate" : "#cbd5e1",
        'black' : '#060606'
    },
    extend: {},
  },
  plugins: [],
}

