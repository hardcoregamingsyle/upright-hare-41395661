import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blood: '#7f1d1d',
        crown: '#fbbf24',
        nether: '#450a0a',
        gold: '#f59e0b',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
