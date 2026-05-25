/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:       "#050505",
        "bg-2":   "#0a0908",
        muted:    "#9E9E9E",
        accent:   "#D9B78F",
        "accent-2": "#F0D9B4",
      },
      fontFamily: {
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        serif:   ['Fraunces', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['Manrope', 'sans-serif'],
      },
      maxWidth: {
        shell: "1480px",
      },
    },
  },
  plugins: [],
}
