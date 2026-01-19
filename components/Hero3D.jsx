import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import rocket image
import rocketImg from '../assets/rocket.jpg';

// Spinning Rocket Component
const SpinningRocket = () => {
    return (
        <motion.div
            className="absolute top-20 left-4 sm:top-24 sm:left-8 z-20"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
                duration: 1, 
                delay: 0.3,
                type: "spring",
                stiffness: 200
            }}
        >
            <motion.div
                className="relative"
                animate={{ 
                    rotate: 360,
                    y: [0, -8, 0],
                }}
                transition={{
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {/* Glowing ring around rocket */}
                <motion.div 
                    className="absolute -inset-2 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, #00d4ff, #00ff88, #ffd700, #00d4ff)',
                        opacity: 0.6,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-[#00d4ff] blur-lg opacity-40 scale-110" />
                
                {/* Rocket image */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#00d4ff]/70 shadow-lg shadow-[#00d4ff]/30">
                    <img 
                        src={rocketImg} 
                        alt="Rocket" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Sparkle effects */}
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                    }}
                />
                <motion.div
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#ffd700] rounded-full"
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

// Clean Social Icon
const AnimatedSocialIcon = ({ icon, label, href, color, delay }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
        >
            {/* Icon container */}
            <motion.div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-[#1a1a1a]/80 backdrop-blur-sm"
                style={{
                    border: `1px solid ${color}40`,
                }}
                whileHover={{ 
                    scale: 1.1,
                    borderColor: color,
                    boxShadow: `0 0 25px ${color}40`,
                }}
                whileTap={{ scale: 0.95 }}
            >
                <div style={{ color }}>{icon}</div>
            </motion.div>
            
            {/* Label */}
            <span 
                className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color }}
            >
                {label}
            </span>
        </motion.a>
    );
};

// Social Icons Row - LinkedIn left, GitHub right
const GamifiedSocialIcons = () => {
    const linkedIn = {
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
        label: "LinkedIn",
        href: "https://linkedin.com",
        color: "#0077b5",
    };
    
    const gitHub = {
        icon: (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
        label: "GitHub",
        href: "https://github.com",
        color: "#00d4ff",
    };
    
    return (
        <>
            {/* LinkedIn - Far Left */}
            <motion.div
                className="absolute bottom-20 left-6 sm:left-12"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
            >
                <AnimatedSocialIcon {...linkedIn} delay={1.9} />
            </motion.div>
            
            {/* GitHub - Far Right */}
            <motion.div
                className="absolute bottom-20 right-6 sm:right-12"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
            >
                <AnimatedSocialIcon {...gitHub} delay={2.0} />
            </motion.div>
        </>
    );
};

// Typing animation for name - optimized for faster loading
const TypewriterName = ({ name }) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    
    useEffect(() => {
        let index = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (index <= name.length) {
                    setDisplayText(name.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setShowCursor(false), 800);
                }
            }, 70); // Faster typing speed (was 100)
            return () => clearInterval(interval);
        }, 200); // Faster start (was 500)
        return () => clearTimeout(timeout);
    }, [name]);
    
    return (
        <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span 
                className="text-[#00d4ff]"
                style={{
                    textShadow: '0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(0, 212, 255, 0.3)',
                }}
            >
                {displayText}
            </span>
            {showCursor && (
                <span className="animate-pulse text-[#00d4ff]">|</span>
            )}
        </motion.h1>
    );
};

// Floating particles for depth - subtle and professional (reduced for performance)
const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 10,
    }));
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#00d4ff]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Matrix-style falling code rain (optimized for performance)
const MatrixCodeRain = () => {
    const columns = 12; // Reduced from 20 for better performance
    const chars = '01アイウエオカキクケコ';
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
            {Array.from({ length: columns }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-[#00d4ff] text-xs font-mono"
                    style={{
                        left: `${(i / columns) * 100}%`,
                        top: '-20%',
                    }}
                    animate={{
                        y: ['0%', '120%'],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 8,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                    }}
                >
                    {Array.from({ length: 15 }).map((_, j) => (
                        <div 
                            key={j} 
                            className="leading-5"
                            style={{ opacity: 1 - (j * 0.06) }}
                        >
                            {chars[Math.floor(Math.random() * chars.length)]}
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

// Subtle grid background
const SubtleGrid = () => {
    return (
        <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #00d4ff 1px, transparent 1px),
                    linear-gradient(to bottom, #00d4ff 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }}
        />
    );
};

// Animated welcome text with wave effect
const WelcomeText = () => {
    const text = "Welcome to my portfolio";
    const words = text.split(' ');
    
    return (
        <motion.div 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
        >
            <motion.p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide">
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block mr-2">
                        {word.split('').map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                className="inline-block cursor-default text-[#a0a0a0]"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1.3 + (wordIndex * 0.08) + (charIndex * 0.02),
                                    duration: 0.2,
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    color: '#00d4ff',
                                    transition: { duration: 0.1 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.p>
            
            {/* Subtle underline */}
            <motion.div
                className="h-[1px] mx-auto mt-6 bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '150px' }}
                transition={{ delay: 1.8, duration: 0.6 }}
            />
        </motion.div>
    );
};

// Clean explore button
const ExploreButton = ({ onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            className="w-14 h-14 rounded-full bg-transparent text-[#00d4ff] flex items-center justify-center mx-auto border border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Scroll down"
        >
            <motion.svg 
                className="w-6 h-6"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
        </motion.button>
    );
};

// Main Hero3D Component
const Hero3D = ({ scrollToSection }) => {
    return (
        <section className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at 20% 20%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
                            radial-gradient(ellipse at 50% 50%, rgba(0, 30, 50, 1) 0%, #0a0a0a 70%)
                        `,
                    }}
                />
            </div>
            
            {/* Subtle grid */}
            <SubtleGrid />
            
            {/* Matrix code rain - subtle */}
            <MatrixCodeRain />
            
            {/* Floating particles - more subtle */}
            <FloatingParticles />
            
            {/* Spinning Rocket in upper left */}
            <SpinningRocket />
            
            {/* Main content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    
                    {/* Typing Name Animation */}
                    <TypewriterName name="Paul Adutwum" />
                    
                    {/* Welcome Text */}
                    <WelcomeText />
                    
                    {/* Explore Button */}
                    <ExploreButton onClick={() => scrollToSection('about')} />
                    
                </div>
            </div>
            
            {/* Gamified Social Icons - positioned at bottom */}
            <GamifiedSocialIcons />
            
            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
            >
                <motion.button
                    onClick={() => scrollToSection('about')}
                    className="flex flex-col items-center gap-2 text-[#666] hover:text-[#00d4ff] transition-colors"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero3D;
