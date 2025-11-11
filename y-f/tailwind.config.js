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
        'my-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        "card-shadow":
          "0px 6px 20px rgba(0, 0, 0, 0.19), 0px 4px 8px rgba(0, 0, 0, 0.2)",
        "destination-shadow": " 0px 6px 20px rgba(0, 0, 0, 0.19)",
        "review-shadow":
          "4px 4px 4px rgba(0, 0 ,0 ,0.25), inset 4px 4px 4px rgba(0, 0 ,0 ,0.25)",
        "review-shadow-v2": "0px 0px 10px rgba(0, 0, 0, 0.1)",
        "header-shadow": "0px 5px 4px rgba(0, 0, 0, 0.25)",
        "nextTrip-shadow":
          "0px 6px 20px rgba(0, 0, 0, 0.19),0px 4px 8px rgba(0, 0, 0, 0.2) ",
      },
      colors: {
        customYellow : '#FFD600',
        customGrey : '#EEECEC',
        customGrey2 : '#E5E5E5',
        customDark : '#171717',
        grayBackground : "#f2f2f2",
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
        "blue-v1": "#2461FF",
        "blue-v2": "#2461FF38",
        "red-error": "#DC143C",
      },
      


      backgroundImage: {
        'hero-img': "url('/images/homeBackground-image.jpg')",
        
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
