/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"paper-white":
					"repeating-linear-gradient(white, white 30px, black 30px, black 31px, white 31px)",
				"paper-blue":
					"repeating-linear-gradient(#A0C4FF, #A0C4FF 30px, black 30px, black 31px, #A0C4FF 31px)",
				"paper-red":
					"repeating-linear-gradient(#FFADAD, #FFADAD 30px, black 30px, black 31px, #FFADAD 31px)",
				"paper-orange":
					"repeating-linear-gradient(#FFD6A5, #FFD6A5 30px, black 30px, black 31px, #FFD6A5 31px)",
				"paper-yellow":
					"repeating-linear-gradient(#FDFFB6, #FDFFB6 30px, black 30px, black 31px, #FDFFB6 31px)",
				"paper-green":
					"repeating-linear-gradient(#CAFFBF, #CAFFBF 30px, black 30px, black 31px, #CAFFBF 31px)",
				"paper-cyan":
					"repeating-linear-gradient(#9BF6FF, #9BF6FF 30px, black 30px, black 31px, #9BF6FF 31px)",
				"paper-purple":
					"repeating-linear-gradient(#BDB2FF, #BDB2FF 30px, black 30px, black 31px, #BDB2FF 31px)",
				"paper-pink":
					"repeating-linear-gradient(#FFC6FF, #FFC6FF 30px, black 30px, black 31px, #FFC6FF 31px)",
			},
			boxShadow: {
				custom: "0px 8px 8px 0px rgba(0,0,0,0.75);",
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
