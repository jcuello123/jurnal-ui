/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"slide-in": "slide-in 0.5s ease-in-out",
			},
			keyframes: {
				"slide-in": {
					"0%": { top: -100 },
					"100%": { top: 12 },
				},
			},
			fontFamily: {
				sans: ["Kalam", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
