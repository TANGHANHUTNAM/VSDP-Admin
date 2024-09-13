/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgVH: "rgb(0, 189, 212)",
      },
    },
  },
  plugins: [],
};
