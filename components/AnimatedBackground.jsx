import React from 'react';
import { motion } from 'framer-motion';
import bbBackground from '../assets/bb.jpeg';

// Animated gradient orbs background
const AnimatedBackground = ({ variant = 'orbs' }) => {
    if (variant === 'rings') {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
                {/* Background image with subtle opacity */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${bbBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.18,
                        filter: 'brightness(0.6) saturate(0.8)'
                    }}
                />
                {/* Cloudy backdrop */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at 20% 20%, rgba(0, 212, 255, 0.10) 0%, transparent 55%),
                            radial-gradient(ellipse at 80% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 60%),
                            radial-gradient(ellipse at 50% 80%, rgba(255, 215, 0, 0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 50% 50%, rgba(5, 5, 5, 1) 0%, #050505 70%)
                        `,
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '20% 10%', '0% 0%'],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Soft orbit rings */}
                <motion.div
                    className="absolute -right-32 top-1/4 w-[520px] h-[520px] rounded-full"
                    style={{
                        border: '1px solid rgba(0, 212, 255, 0.18)',
                        boxShadow: '0 0 60px rgba(0, 212, 255, 0.15)',
                        filter: 'blur(0.2px)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute -left-24 bottom-10 w-[420px] h-[420px] rounded-full"
                    style={{
                        border: '1px solid rgba(255, 215, 0, 0.12)',
                        boxShadow: '0 0 50px rgba(255, 215, 0, 0.12)',
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute left-1/2 top-10 w-[300px] h-[300px] rounded-full"
                    style={{
                        border: '1px solid rgba(0, 255, 136, 0.10)',
                        boxShadow: '0 0 40px rgba(0, 255, 136, 0.12)',
                        transform: 'translateX(-50%)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        );
    }

    if (variant === 'orbs') {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: ['-20%', '30%', '-20%'],
                        y: ['-20%', '40%', '-20%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full right-0"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: ['20%', '-30%', '20%'],
                        y: ['30%', '-20%', '30%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bottom-0 left-1/2"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: ['-50%', '-30%', '-50%'],
                        y: ['50%', '10%', '50%'],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                
                {/* Subtle grid overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>
        );
    }

    if (variant === 'mesh') {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(at 40% 20%, rgba(0, 212, 255, 0.15) 0px, transparent 50%),
                            radial-gradient(at 80% 0%, rgba(255, 215, 0, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 50%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
                            radial-gradient(at 80% 50%, rgba(0, 212, 255, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, rgba(255, 215, 0, 0.15) 0px, transparent 50%),
                            radial-gradient(at 80% 100%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 0%, rgba(0, 212, 255, 0.1) 0px, transparent 50%),
                            #0a0a0a
                        `,
                    }}
                />
                
                {/* Animated scanline effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(transparent 50%, rgba(0, 212, 255, 0.02) 50%)',
                        backgroundSize: '100% 4px',
                    }}
                    animate={{
                        backgroundPosition: ['0 0', '0 100%'],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>
        );
    }

    // Aurora variant
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 25%, #0a0a0a 50%, #1a2e1a 75%, #0a0a0a 100%)',
                        'linear-gradient(90deg, #0a0a0a 0%, #2e1a1a 25%, #0a0a0a 50%, #1a1a2e 75%, #0a0a0a 100%)',
                        'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 25%, #0a0a0a 50%, #2e1a1a 75%, #0a0a0a 100%)',
                        'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 25%, #0a0a0a 50%, #1a2e1a 75%, #0a0a0a 100%)',
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

export default AnimatedBackground;


