import React, { useEffect, useRef } from 'react';

// Faint, sparse node-and-edge network background. Nodes drift slowly and
// pulse in and out of visibility; edges are drawn between nearby nodes
// with opacity scaled by distance so the whole thing stays subtle.
const NODE_COLOR = '176, 184, 196';
const MAX_LINK_DIST = 150;
const NODE_BASE_ALPHA = 0.45;
const LINE_BASE_ALPHA = 0.12;

const NetworkGraph = ({ className = '' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width, height, dpr;
        let nodes = [];
        let animationId;
        let startTime = performance.now();

        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.max(18, Math.min(42, Math.round((width * height) / 32000)));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                radius: 1.2 + Math.random() * 1.3,
                phase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.15 + Math.random() * 0.2,
            }));
        };

        const drawStatic = () => {
            ctx.clearRect(0, 0, width, height);
            nodes.forEach((n) => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${NODE_COLOR}, ${NODE_BASE_ALPHA * 0.6})`;
                ctx.fill();
            });
        };

        const tick = (now) => {
            const t = (now - startTime) / 1000;
            ctx.clearRect(0, 0, width, height);

            nodes.forEach((n) => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0) n.x = width;
                if (n.x > width) n.x = 0;
                if (n.y < 0) n.y = height;
                if (n.y > height) n.y = 0;
                n.alpha = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * n.pulseSpeed + n.phase));
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_LINK_DIST) {
                        const lineAlpha = LINE_BASE_ALPHA * (1 - dist / MAX_LINK_DIST) * a.alpha * b.alpha;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${NODE_COLOR}, ${lineAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach((n) => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${NODE_COLOR}, ${NODE_BASE_ALPHA * n.alpha})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(tick);
        };

        resize();
        if (reduceMotion) {
            drawStatic();
        } else {
            animationId = requestAnimationFrame(tick);
        }

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} aria-hidden="true" />;
};

export default NetworkGraph;
