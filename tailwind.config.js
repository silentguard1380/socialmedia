/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        ProductSansRegular: ["ProductSans-Regular"],
        ProductSansMedium: ["ProductSans-Medium"],
        ProductSansBold: ["ProductSans-Bold"],
      },
      colors: {
        primary: "rgb(29,155,240)",
        secondary: "rgb(231,233,234)",
        hoverBg: "rgba(231,233,234,0.1)",
      },
    },
  },
  plugins: [],
};
