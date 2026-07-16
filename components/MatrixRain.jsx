import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ opacity = 0.15 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const lineCount = 50;
        const lines = Array.from({ length: lineCount }, () => ({
            y: Math.random() * canvas.height,
            speed: 0.2 + Math.random() * 0.6,
            thickness: 0.6 + Math.random() * 1.2,
            phase: Math.random() * Math.PI * 2,
            amplitude: 20 + Math.random() * 40
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(5, 5, 5, 0.22)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (const line of lines) {
                const offset = Math.sin(line.phase) * line.amplitude;
                const startX = -100;
                const endX = canvas.width + 100;
                const y = line.y;

                const gradient = ctx.createLinearGradient(startX, y, endX, y + 40);
                gradient.addColorStop(0, 'rgba(176, 184, 196, 0)');
                gradient.addColorStop(0.5, 'rgba(176, 184, 196, 0.18)');
                gradient.addColorStop(1, 'rgba(176, 184, 196, 0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = line.thickness;
                ctx.beginPath();
                ctx.moveTo(startX, y + offset);
                ctx.lineTo(endX, y - offset * 0.6);
                ctx.stroke();

                line.y += line.speed;
                line.phase += 0.008;

                if (line.y > canvas.height + 40) {
                    line.y = -40;
                }
            }

            animationFrameId = window.requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
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


