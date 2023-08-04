/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}", "./static/**/*.{html,js}"],
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
        third: "rgb(113,118,123)",
        hoverBg: "rgba(231,233,234,0.1)",
        borderColor: "rgb(47,51,54)",
      },
    },
  },
  plugins: [],
};
