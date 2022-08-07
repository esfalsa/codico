const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: "#14b8a6", // teal-500
					"primary-focus": "#0d9488", // teal-600
					"primary-content": "#f0fdfa", // teal-50
					secondary: "#e2e8f0", // slate-200
					"secondary-focus": "#cbd5e1", // slate-300
					"secondary-content": "#1e293b", // slate-800
					accent: "#818cf8", // indigo-400
					neutral: "#475569", // slate-600
					"base-100": "#ffffff", // white
					"base-200": "#f1f5f9", // slate-100
					"base-300": "#e2e8f0", // slate-200
					"base-content": "#1e293b", // slate-800
					info: "#93c5fd",
					success: "#86efac",
					warning: "#fde68a",
					error: "#fda4af",
					"--btn-text-case": "none",
				},
				dark: {
					primary: "#14b8a6", // teal-500
					"primary-focus": "#0d9488", // teal-600
					"primary-content": "#f0fdfa", // teal-50
					secondary: "#475569", // slate-700
					"secondary-focus": "#334155", // slate-800
					"secondary-content": "#f8fafc", // slate-50
					accent: "#6366f1", // indigo-500
					neutral: "#475569", // slate-600
					"base-100": "#1e293b", // slate-800
					"base-200": "#334155", // slate-700
					"base-300": "#475569", // slate-600
					"base-content": "#f8fafc", // slate-50
					info: "#2563eb",
					success: "#059669",
					warning: "#eab308", // yellow-500
					"warning-content": "#fefce8", // yellow-50
					error: "#f43f5e",
					"--btn-text-case": "none",
				},
			},
		],
	},
	plugins: [
		/*require("@tailwindcss/forms"), */
		require("daisyui"),
		require("@tailwindcss/typography"),
	],
};
