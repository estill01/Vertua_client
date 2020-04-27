// TODO PurgeCSS is purging the SemanticUI CSS; fix!

// const purgecss = require("@fullhuman/postcss-purgecss")({
// 	content: ['./public#<{(||)}>#*.html'],
// 	defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
// })


module.exports = {
	style: {
		postcss: {
			plugins: [
				require('tailwindcss'),
				require('autoprefixer'),
				// ...process.env.NODE_ENV === 'production'
				// ? [purgecss, require('cssnano')]
				// : []

			]
		}
	}
}
