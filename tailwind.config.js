/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				repeat:
					"repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px)",
			},
			boxShadow: {
				custom: "0px 8px 16px 0px rgba(0,0,0,0.75);",
			},
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
