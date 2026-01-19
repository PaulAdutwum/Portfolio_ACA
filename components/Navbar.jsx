import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection, scrollToSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'research', label: 'Research' },
        { id: 'projects', label: 'Projects' },
        { id: 'community', label: 'Community' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'hobbies', label: 'Interests' }
    ];
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };
    
    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Name */}
                    <motion.div 
                        className="text-xl font-bold gradient-text cursor-pointer"
                        onClick={() => handleNavClick('hero')}
                        whileHover={{ scale: 1.05 }}
                    >
                        Paul Adutwum
                    </motion.div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                                    activeSection === item.id 
                                        ? 'text-[#00d4ff]' 
                                        : 'text-[#a0a0a0] hover:text-[#00d4ff]'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d4ff]"
                                        layoutId="activeTab"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                    
                    {/* Mobile Menu Button - Enhanced visibility */}
                    <motion.button
                        className="md:hidden p-2.5 rounded-lg bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#00d4ff]/50 shadow-lg shadow-[#00d4ff]/20"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ borderColor: '#00d4ff', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
                    >
                        <svg 
                            className="w-6 h-6 text-[#00d4ff]" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>
                
                {/* Mobile Menu - Enhanced visibility with solid background */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden py-4 mt-2 rounded-xl bg-[#0a0a0a]/95 backdrop-blur-md border border-[#333] shadow-xl shadow-black/50"
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col space-y-1 px-2">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                                            activeSection === item.id 
                                                ? 'bg-[#00d4ff] text-[#0a0a0a]' 
                                                : 'text-white hover:bg-[#1a1a1a] hover:text-[#00d4ff]'
                                        }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;