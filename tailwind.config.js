/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C6F6D5",
          50: "#171923",
        },
        secondary: {
          DEFAULT: "#3182CE",
          50: "#4A5568",
        },
        tertiary: {
          DEFAULT: "#F4F8FA",
          50: "#22543D",
        },
      },
    },
  },
  plugins: [],
};
