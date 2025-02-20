/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F2F2F2",
        secondary: "#6AA63F",
        secondaryDark: "#305907",
        accent: "#D96704",
        surface: "#0D0D0D",
      },
    },
  },
  plugins: [],
};
