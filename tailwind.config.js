module.exports = {
  theme: {
		extend: {
			textColor: {
				primary: "var(--color-text-primary)",
				'primary-inverse': "var(--color-text-primary-inverse)",
				secondary: "var(--color-text-secondary)",
				'secondary-inverse': "var(--color-text-secondary-inverse)",
				default: "var(--color-text-default)",
				"default-soft": "var(--color-text-default-soft)",
				inverse: "var(--color-text-inverse)",
				"inverse-soft": "var(--color-text-inverse-soft)"
			},
			backgroundColor: {
				primary: "var(--color-bg-primary)",
				'primary-inverse': "var(--color-bg-primary-inverse)",
				secondary: "var(--color-bg-secondary)",
				'secondary-inverse': "var(--color-bg-secondary-inverse)",
				default: "var(--color-bg-default)",
				inverse: "var(--color-bg-inverse)",
			},
			fontFamily: {
			//	logo: ['Comfortaa'],
				display: ["Helvetica", "sans-serif"],
				body: ["Helvetica", "sans-serif"],
			},
			backgroundOpacity: {
			  '25': '0.25',
			  '50': '0.5',
			  '75': '0.75',
				'100': '1.0',
			}
			// fontWeights: {
			// 	normal: "var(--font-weight-normal)",
			// 	display: "var(--font-weight-display)",
			// 	btn: "var(--font-weight-btn)"
			// },
			// borderRadius: {
			// 	none: "0",
			// 	btn: "var(--rounded-btn)"
			// },
		}
  },
	variants: {
		borderColor: ['hover', 'active'],
		backgroundColor: ['hover', 'active'],
		backgroundOpacity: ['hover', 'active'],
		textColor: ['hover', 'active'],
		scale: ['hover', 'active'],
	},
  plugins: [],
}
