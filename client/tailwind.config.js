/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'spaceCadet': '#112A46',
				'moonLily': '#e7e7e7',
			},
			backgroundImage: {
				hero: "url('./src/assets/img/bghero.jpg')",
			},
			backgroundSize: {
				'408': '408px 408px',
			},
		},
	},
	plugins: [],
}