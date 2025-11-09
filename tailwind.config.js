/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'checkmark': 'checkmark 0.3s ease-in-out',
        'scaleIn': 'scaleIn 0.2s ease-out',
      }
    },
  },
  plugins: [],
}

