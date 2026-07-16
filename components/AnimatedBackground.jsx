import React from 'react';
import { motion } from 'framer-motion';

// Animated gradient orbs background
const AnimatedBackground = ({ variant = 'orbs' }) => {
    if (variant === 'orbs') {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(176, 184, 196, 0.3) 0%, transparent 70%)',
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
                            radial-gradient(at 40% 20%, rgba(176, 184, 196, 0.15) 0px, transparent 50%),
                            radial-gradient(at 80% 0%, rgba(255, 215, 0, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 50%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
                            radial-gradient(at 80% 50%, rgba(176, 184, 196, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, rgba(255, 215, 0, 0.15) 0px, transparent 50%),
                            radial-gradient(at 80% 100%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 0%, rgba(176, 184, 196, 0.1) 0px, transparent 50%),
                            #050505
                        `,
                    }}
                />
                
                {/* Animated scanline effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(transparent 50%, rgba(176, 184, 196, 0.02) 50%)',
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
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(45deg, #050505 0%, #1a1a2e 25%, #050505 50%, #1a2e1a 75%, #050505 100%)',
                        'linear-gradient(90deg, #050505 0%, #2e1a1a 25%, #050505 50%, #1a1a2e 75%, #050505 100%)',
                        'linear-gradient(135deg, #050505 0%, #1a2e1a 25%, #050505 50%, #2e1a1a 75%, #050505 100%)',
                        'linear-gradient(45deg, #050505 0%, #1a1a2e 25%, #050505 50%, #1a2e1a 75%, #050505 100%)',
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


