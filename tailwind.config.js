/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"], // Define DM Sans como fonte padrão para sans
      },
      colors: {
        primary: "#0ACF83",
        light_gray: "F6F6F6",
      },
    },
  },
  plugins: [],
};
