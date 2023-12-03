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
        keyframes: {
            'slide-left': {
                '0%': {
                    '-webkit-transform': 'translateX(656px);',
                    opacity: 0,
                    transform: 'translateX(656px);',
                },
                '100%': {
                    '-webkit-transform': ' translateX(0);',
                    opacity: 1,
                    transform: ' translateX(0);',
                },
            },
            pulse: {
                '0%,100%': {
                    opacity: 1,
                },
                '50%': {
                    opacity: 0.5,
                },
            },
        },
        animation: {
            'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        // ...
    ],
};
