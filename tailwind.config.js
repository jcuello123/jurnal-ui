/** @type {import('tailwindcss').Config} */
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
		},
	},
	plugins: [],
};
