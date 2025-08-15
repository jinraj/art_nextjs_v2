// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-amber': 'var(--custom-amber)',
        'custom-paynes-gray': 'var(--custom-paynes-gray)',
        'custom-airforce-blue': 'var(--custom-airforce-blue)',
        'custom-silver': 'var(--custom-silver)',
        'custom-white': 'var(--custom-white)',
        'custom-antiflash-white': 'var(--custom-antiflash-white)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        knewave: ['Knewave', 'cursive'],
      },
    },
  },
  plugins: [],
};
