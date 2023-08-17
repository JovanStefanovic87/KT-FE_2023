/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ktOrange: '#FC9815',
        ktBlueGray: '#7B8D8E',
        ktHeaderGray: '#202020',
        ktCyan: '#0D3B4E',
        ktBg: '#303030',
      },
      transitionDuration: {
        'instant': '0ms',
        'fast': '100ms',
        'medium': '500ms',
        'slow': '1000ms',
      },
      maxWidth: {
        '95': '95dvw',
      },
    },
    minWidth: {
      'label': '140px',
    },
  },
  plugins: [],
};
