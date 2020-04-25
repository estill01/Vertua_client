module.exports = {
  theme: {
		extend: {
			textColor: {
				primary: "var(--color-text-primary)",
				secondary: "var(--color-text-secondary)",
				default: "var(--color-text-default)",
				"default-soft": "var(--color-text-default-soft)",
				inverse: "var(--color-text-inverse)",
				"inverse-soft": "var(--color-text-inverse-soft)"
			},
			backgroundColor: {
				primary: "var(--color-bg-primary)",
				secondary: "var(--color-bg-secondary)",
				default: "var(--color-bg-default)",
				inverse: "var(--color-bg-inverse)"
			},
			fontFamily: {
				logo: ['Comfortaa-Regular'],
				"logo-bold": ['Comfortaa-Bold'],
				display: ["Comfortaa-Regular", "Helvetica", "sans-serif"],
				body: ["Comfortaa-Regular", "Helvetica", "sans-serif"],
			},
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
  plugins: [],
}
