/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/slices/**/*.{js,ts,jsx,tsx,mdx}"
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    colors: {
      newGray: '#A29D9D',
      transparent: 'transparent',
      current: 'currentColor',
      "deep-green": "#37473C",
      "bright-yellow": "#FBDA1D",
      "cream": "#F0EEDD",
      "off-white": "#FFFBF1",
      "muted-gray": "#AFB3A9",
      "olive-green": "#767632",
      "light-gray": "#C7C7C7",
      "soft-white": "#F5F4F1",
    },
    backgroundColor: {
      "deep-green": "#37473C",
      "bright-yellow": "#FBDA1D",
      "cream": "#F0EEDD",
      "off-white": "#FFFBF1",
      "muted-gray": "#AFB3A9",
      "olive-green": "#767632", 
      "light-gray": "#C7C7C7",
      "soft-white": "#F5F4F1",
    },
    fontFamily: {
      "inter": ["var(--font-inter)"],
      "playfair-display": ["var(--font-pf-d)"],
      "instrument-sans": ["var(--font-inst-sans)"],
      "ambit-regular": ["var(--font-ambit-reg)"],
      "ambit-italic": ["var(--font-ambit-italic)"],
      "ambit-semibold": ["var(--font-ambit-semibold)"],
      "ambit-bold": ["var(--font-ambit-bold)"],
      "ambit-light": ["var(--font-ambit-light)"],
      "ambit-black": ["var(--font-ambit-black)"],
    },
    screens: {
      '3xl': '1740px',
      "mid": '1048px',
      "1000pixel": "1000px",
      "950px":"950px"
    }
  },
};
export const plugins = [];
