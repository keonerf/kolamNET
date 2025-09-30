/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Crayonish Primary Colors
                crayon: {
                    red: {
                        50: '#FFF1F0',
                        100: '#FFE4E1',
                        200: '#FFC9C2',
                        300: '#FFAEA4',
                        400: '#FF9485',
                        500: '#FF7A67', // Main crayon red
                        600: '#E55A47',
                        700: '#CC3A27',
                        800: '#B21A07',
                        900: '#990000',
                    },
                    yellow: {
                        50: '#FFFEF0',
                        100: '#FFFDE1',
                        200: '#FFFBC2',
                        300: '#FFF9A4',
                        400: '#FFF785',
                        500: '#FFF567', // Main crayon yellow
                        600: '#E5D547',
                        700: '#CCB527',
                        800: '#B29507',
                        900: '#997500',
                    },
                    orange: {
                        50: '#FFF4F0',
                        100: '#FFE9E1',
                        200: '#FFD3C2',
                        300: '#FFBDA4',
                        400: '#FFA785',
                        500: '#FF9167', // Main crayon orange
                        600: '#E57147',
                        700: '#CC5127',
                        800: '#B23107',
                        900: '#991100',
                    }
                },
                // Pastel variants for dark mode
                pastel: {
                    red: '#FFB3B3',
                    yellow: '#FFEB99',
                    orange: '#FFCC99',
                    peach: '#FFDDCC',
                },
                // Dark mode backgrounds
                dark: {
                    50: '#18181B',
                    100: '#27272A',
                    200: '#3F3F46',
                    300: '#52525B',
                    400: '#71717A',
                    500: '#A1A1AA',
                    600: '#D4D4D8',
                    700: '#E4E4E7',
                    800: '#F4F4F5',
                    900: '#FAFAFA',
                }
            },
        },
    },
    plugins: [],
}