/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nether: '#1a0a0a',
        blood: '#8b0000',
        crown: '#ffd700',
        gold: '#daa520',
      },
    },
  },
  plugins: [],
};
