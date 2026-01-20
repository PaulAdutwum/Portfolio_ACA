import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ opacity = 0.15 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters (including some mathematical symbols for a researcher vibe)
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789∑∏∫∂√∞≈≠≤≥±×÷αβγδεζηθλμπσφψω';
        const charArray = chars.split('');

        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Array of drops - one per column
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // Colors array for variety
        const colors = [
            'rgba(0, 212, 255, ',  // Cyber blue
            'rgba(0, 255, 136, ',  // Cyber green
            'rgba(255, 215, 0, ',  // Gold
        ];

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = charArray[Math.floor(Math.random() * charArray.length)];

                // Random color from palette
                const colorBase = colors[Math.floor(Math.random() * colors.length)];
                const alpha = Math.random() * 0.5 + 0.5;
                ctx.fillStyle = colorBase + alpha + ')';

                // Draw character
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                // Reset drop to top with random delay
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity }}
        />
    );
};

export default MatrixRain;


