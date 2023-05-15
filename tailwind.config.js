module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors:{
        primary: "#fb6a5b",
        primaryLight: "#fc887c",
        primaryHard: "#c95549"
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  variants: {
    animation: ["motion-safe"]
  },
  plugins: [],
};
