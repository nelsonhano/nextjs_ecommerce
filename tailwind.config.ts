import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#00d8a8",
        
"secondary": "#0030ff",
        
"accent": "#008000",
        
"neutral": "#120102",
        
"base-100": "#2b2b2b",
        
"info": "#00a3e3",
        
"success": "#bce600",
        
"warning": "#ff6700",
        
"error": "#ff2849",
        },
      },
    ],
  },
}
export default config
