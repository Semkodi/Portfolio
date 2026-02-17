/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    hover: "var(--primary-hover)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                },
                bg: "var(--bg)",
                fg: "var(--fg)",
                muted: "var(--muted)",
                card: "var(--card-bg)",
                border: "var(--border)",
                glass: "var(--glass)",
                "glass-border": "var(--glass-border)",
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            zIndex: {
                'modal': '1000',
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
}
