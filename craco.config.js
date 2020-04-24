// const tailwindcss = require('tailwindcss')
const purgecss = require("@fullhuman/postcss-purgecss")


module.exports = {
	style: {
		postcss: {
			plugins: [
				require('tailwindcss'),
				require('autoprefixer'),
				
			  // tailwindcss('./tailwind.config.js'),
				// purgecss({
				// 	content: [
				// 		"./src#<{(|.html",
				// 		"./src#<{(||)}>#*.html",
				// 		"./src#<{(|.js(x)?",
				// 		"./src#<{(||)}>#*.js(x)?",
				// 	]
				// })

			]
		}
	}
}
