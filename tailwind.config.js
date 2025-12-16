/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maze: {
          wall: "#1a1a2e",
          path: "#16213e",
          player: "#e94560",
          exit: "#0f3460",
          visited: "#1a1a3e",
        },
      },
    },
  },
  plugins: [],
};
