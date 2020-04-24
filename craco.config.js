const tailwindcss = require('tailwindcss')
const purgecss = require("@fullhuman/postcss-purgecss")({
	content: [
	  "./src/*.html",
	  "./src/**/*.html",
		"./src/*.js(x)?",
		"./src/**/*.js(x)?",
	]
})

module.exports = {
	style: {
		postcss: {
			plugins: [
			  tailwindcss('./tailwind.js'),
				...(process.env.NODE_ENV === "production" ? [purgecss] : [])
			]
		}
	}
}
