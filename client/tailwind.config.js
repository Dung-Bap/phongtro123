/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'public/index.html'],
    theme: {
        fontFamily: {
            main: ['Poppins', 'sans-serif', 'Montserrat', 'Roboto'],
        },
        extend: {
            width: {
                main: '1100px',
            },
            backgroundColor: {
                main: '#1266dd',
                secondary: '#f83759',
            },
            colors: {
                main: '#1266dd',
                secondary: '#f83759',
                price: '#16c784',
            },
        },
    },
    plugins: [],
};
