import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Timeline = ({ milestones }) => {
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Sort milestones by year (newest first)
    const sortedMilestones = [...milestones].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    
    useEffect(() => {
        // Auto-advance timeline
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sortedMilestones.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [sortedMilestones.length]);
    
    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };
    
    const milestoneVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        active: {
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };
    
    const impactVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
    };
    
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };
    
    const getImpactColor = (impact) => {
        const match = impact?.match(/\d+/);
        if (!match) return '#ffd700';
        const number = parseInt(match[0]);
        if (number >= 500) return '#00ff88';
        if (number >= 100) return '#00d4ff';
        return '#ffd700';
    };
    
    return (
        <div className="max-w-6xl mx-auto">
            {/* Timeline Header */}
            <motion.div 
                className="text-center mb-12"
                variants={impactVariants}
                initial="hidden"
                animate="visible"
            >
                <h3 className="text-2xl font-bold mb-4 text-[#00d4ff]">
                    Journey of Impact
                </h3>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                    From Ghana to Maine, each milestone represents a commitment to excellence, 
                    community service, and the Ubuntu philosophy of interconnected growth.
                </p>
            </motion.div>
            
            {/* Horizontal Timeline */}
            <motion.div 
                className="relative mb-16"
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Timeline Line */}
                <div className="timeline-line absolute top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
                
                {/* Timeline Points */}
                <div className="flex justify-between items-center relative">
                    {sortedMilestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.id}
                            className="flex flex-col items-center cursor-pointer"
                            variants={milestoneVariants}
                            animate={activeIndex === index ? "active" : "visible"}
                            onClick={() => setSelectedMilestone(milestone)}
                            whileHover={{ scale: 1.1 }}
                        >
                            {/* Timeline Dot */}
                            <motion.div
                                className={`w-4 h-4 rounded-full border-4 transition-all ${
                                    activeIndex === index
                                        ? 'bg-[#00d4ff] border-[#00d4ff] scale-125'
                                        : 'bg-[#1a1a1a] border-[#00d4ff]'
                                }`}
                                animate={{
                                    boxShadow: activeIndex === index 
                                        ? '0 0 20px rgba(0, 212, 255, 0.5)' 
                                        : '0 0 0px rgba(0, 212, 255, 0)'
                                }}
                            ></motion.div>
                            
                            {/* Year Label */}
                            <motion.div
                                className={`mt-4 text-sm font-bold ${
                                    activeIndex === index ? 'text-[#00d4ff]' : 'text-[#a0a0a0]'
                                }`}
                                animate={{
                                    color: activeIndex === index ? '#00d4ff' : '#a0a0a0'
                                }}
                            >
                                {milestone.year}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            {/* Milestone Cards Grid */}
            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
            >
                {sortedMilestones.map((milestone, index) => (
                    <motion.div
                        key={milestone.id}
                        className={`bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer card-hover ${
                            activeIndex === index ? 'ring-2 ring-[#00d4ff]' : ''
                        }`}
                        variants={milestoneVariants}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedMilestone(milestone)}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        {/* Image */}
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={milestone.image}
                                alt={milestone.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[#00d4ff] font-bold text-lg">
                                    {milestone.year}
                                </span>
                                <span className="text-[#a0a0a0] text-sm">
                                    {milestone.location}
                                </span>
                            </div>
                            
                            <h4 className="text-lg font-bold mb-2 text-white">
                                {milestone.title}
                            </h4>
                            
                            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4">
                                {milestone.description}
                            </p>
                            
                            {/* Impact Metric */}
                            <motion.div 
                                className="flex items-center gap-2"
                                variants={impactVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.1 + 0.5 }}
                            >
                                <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getImpactColor(milestone.impact) }}
                                ></div>
                                <span 
                                    className="text-sm font-medium"
                                    style={{ color: getImpactColor(milestone.impact) }}
                                >
                                    {milestone.impact}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            
            {/* Impact Summary */}
            <motion.div 
                className="mt-16 bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] rounded-lg p-8 border border-[#333]"
                variants={impactVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
            >
                <h3 className="text-2xl font-bold text-center mb-8 text-[#ffd700]">
                    Collective Impact
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-3xl font-bold text-[#00d4ff] mb-2">
                            700+
                        </div>
                        <div className="text-[#a0a0a0]">
                            Lives Touched Through Community Service
                        </div>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-3xl font-bold text-[#00ff88] mb-2">
                            3+
                        </div>
                        <div className="text-[#a0a0a0]">
                            Years of Academic Excellence
                        </div>
                    </motion.div>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-3xl font-bold text-[#ffd700] mb-2">
                            ∞
                        </div>
                        <div className="text-[#a0a0a0]">
                            Commitment to Ubuntu Philosophy
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Milestone Detail Modal */}
            <AnimatePresence>
                {selectedMilestone && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedMilestone(null)}
                    >
                        <motion.div
                            className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative">
                                <img
                                    src={selectedMilestone.image}
                                    alt={selectedMilestone.title}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <button
                                    onClick={() => setSelectedMilestone(null)}
                                    className="absolute top-4 right-4 bg-[#0a0a0a] bg-opacity-80 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                                {/* Year Badge */}
                                <div className="absolute top-4 left-4 bg-[#00d4ff] text-[#0a0a0a] px-4 py-2 rounded-lg font-bold text-xl">
                                    {selectedMilestone.year}
                                </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2 text-[#00d4ff]">
                                    {selectedMilestone.title}
                                </h2>
                                
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-[#a0a0a0]">
                                        📍 {selectedMilestone.location}
                                    </span>
                                    <span 
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{ 
                                            backgroundColor: `${getImpactColor(selectedMilestone.impact)}20`,
                                            color: getImpactColor(selectedMilestone.impact)
                                        }}
                                    >
                                        {selectedMilestone.impact}
                                    </span>
                                </div>
                                
                                <p className="text-[#a0a0a0] leading-relaxed mb-6">
                                    {selectedMilestone.description}
                                </p>
                                
                                {/* Ubuntu Philosophy Quote */}
                                <div className="bg-gradient-to-r from-[#00d4ff]20 to-[#ffd700]20 rounded-lg p-4 border border-[#333]">
                                    <p className="text-[#a0a0a0] italic text-center">
                                        "I am because we are" - Ubuntu Philosophy
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Timeline;