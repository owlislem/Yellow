/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        "card-shadow":
          "0px 6px 20px rgba(0, 0, 0, 0.19), 0px 4px 8px rgba(0, 0, 0, 0.2)",
        "destination-shadow": " 0px 6px 20px rgba(0, 0, 0, 0.19)",
        "review-shadow":
          "4px 4px 4px rgba(0, 0 ,0 ,0.25), inset 4px 4px 4px rgba(0, 0 ,0 ,0.25)",
        "review-shadow-v2": "0px 0px 10rpx rgba(0, 0, 0, 0.1)",
        "header-shadow": "0px 5px 4px rgba(0, 0, 0, 0.25)",
        "nextTrip-shadow":
          "0px 6px 20px rgba(0, 0, 0, 0.19),0px 4px 8px rgba(0, 0, 0, 0.2) ",
      },
      colors: {
        red: "#ff0000",
        "yellow-primary": "#FFD600",
        black: "#000000",
        "black-v2": "#212121",
        "gray-p": "#171717",
        "gray-v1": "#F2F2F2",
        "gray-v2": "#E5E5E5",
        "gray-v3": "#EEECEC",
        "gray-v4": "#F5F5F5",
        "gray-v5": "#535252",
        "gray-v6": "#464646",
        "blue-v1": "#2461FF",
        "blue-v2": "#2461FF38",
        "red-error": "#DC143C",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        roboto: ["Roboto", "serif"],
        Sriracha: ["Sriracha", "serif"],
        Poppins: ["Poppins", "sansSerif"],
      },
      letterSpacing: {
        tighter: "-0.05em",
      },
      keyframes: {
        "text-up": {
          from: { height: 0 },
          to: { height: 100 },
        },
      },
      animation: {
        "text-up": "text-up 0.3s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
