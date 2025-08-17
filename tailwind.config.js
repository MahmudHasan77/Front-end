    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", 
      ],
      theme: {
        extend: {},
      },
      plugins: [],
}
    
// eslint-disable-next-line no-undef
tailwind.config.js
// eslint-disable-next-line no-undef
module.exports = {
    theme: {
      extend: {
        animation: {
          slide: "slide 30s linear infinite",
        },
        keyframes: {
          slide: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        },
      },
    },
    plugins: [],
  };
  