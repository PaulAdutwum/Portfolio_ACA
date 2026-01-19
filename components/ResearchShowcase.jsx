import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResearchShowcase = ({ papers }) => {
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [citationFormat, setCitationFormat] = useState('apa');
    const canvasRef = useRef(null);
    
    const featuredPaper = papers.find(paper => paper.featured) || papers[0];
    const otherPapers = papers.filter(paper => !paper.featured);
    
    useEffect(() => {
        // Initialize mathematical visualization
        if (typeof p5 !== 'undefined' && canvasRef.current) {
            initVisualization();
        }
    }, []);
    
    const initVisualization = () => {
        const sketch = (p) => {
            let angle = 0;
            
            p.setup = () => {
                p.createCanvas(400, 300);
                p.background(10, 10, 10);
            };
            
            p.draw = () => {
                p.background(10, 10, 10, 20);
                p.translate(p.width/2, p.height/2);
                
                // Draw Ulam sequence visualization
                for (let i = 0; i < 50; i++) {
                    const radius = i * 3;
                    const x = p.cos(angle + i * 0.1) * radius;
                    const y = p.sin(angle + i * 0.1) * radius;
                    
                    // Electric blue to gold gradient effect
                    const hue = (i * 5 + angle * 50) % 360;
                    p.fill(hue, 80, 90, 150);
                    p.noStroke();
                    p.ellipse(x, y, 4, 4);
                }
                
                angle += 0.01;
            };
        };
        
        new p5(sketch, canvasRef.current);
    };
    
    const generateCitation = (paper, format) => {
        if (format === 'apa') {
            return `${paper.authors} (${paper.year}). ${paper.title}. ${paper.journal}.`;
        } else if (format === 'bibtex') {
            return `@article{${paper.title.toLowerCase().replace(/\s+/g, '')}${paper.year},
  author = {${paper.authors}},
  title = {${paper.title}},
  journal = {${paper.journal}},
  year = {${paper.year}}
}`;
        } else if (format === 'mla') {
            return `${paper.authors}. "${paper.title}." ${paper.journal}, ${paper.year}.`;
        }
    };
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    
    const paperVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
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
    
    return (
        <div className="max-w-6xl mx-auto">
            {/* Featured Paper */}
            <motion.div 
                className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] rounded-lg p-8 mb-12 border border-[#00d4ff] glow-effect"
                variants={paperVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#ffd700] text-[#0a0a0a] px-3 py-1 rounded-full text-sm font-bold">
                                Featured Research
                            </div>
                            <div className="text-[#00d4ff] text-sm font-medium">
                                {featuredPaper.citations} citations
                            </div>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#00d4ff]">
                            {featuredPaper.title}
                        </h3>
                        
                        <div className="text-[#a0a0a0] mb-4">
                            <p className="font-medium">{featuredPaper.authors}</p>
                            <p>{featuredPaper.journal} • {featuredPaper.year}</p>
                        </div>
                        
                        <p className="text-[#a0a0a0] leading-relaxed mb-6">
                            {featuredPaper.abstract}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                onClick={() => setSelectedPaper(featuredPaper)}
                                className="bg-[#00d4ff] text-[#0a0a0a] px-6 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Details
                            </motion.button>
                            
                            <a
                                href={featuredPaper.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-[#ffd700] text-[#ffd700] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#ffd700] hover:text-[#0a0a0a] transition-all"
                            >
                                Download PDF
                            </a>
                        </div>
                    </div>
                    
                    {/* Mathematical Visualization */}
                    <div className="flex justify-center">
                        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#333]">
                            <div ref={canvasRef} className="w-full h-full"></div>
                            <p className="text-center text-[#a0a0a0] text-sm mt-2">
                                Ulam Sequence Visualization
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            {/* Other Publications */}
            {otherPapers.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold mb-8 text-center text-[#ffd700]">
                        Other Publications
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {otherPapers.map((paper, index) => (
                            <motion.div
                                key={paper.id}
                                className="bg-[#1a1a1a] rounded-lg p-6 card-hover"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="bg-[#333] text-[#a0a0a0] px-3 py-1 rounded-full text-xs font-medium">
                                        {paper.year}
                                    </span>
                                    <span className="text-[#00d4ff] text-sm font-medium">
                                        {paper.citations} citations
                                    </span>
                                </div>
                                
                                <h4 className="text-lg font-bold mb-3 text-[#00d4ff]">
                                    {paper.title}
                                </h4>
                                
                                <div className="text-[#a0a0a0] text-sm mb-4">
                                    <p>{paper.authors}</p>
                                    <p>{paper.journal}</p>
                                </div>
                                
                                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4 line-clamp-3">
                                    {paper.abstract}
                                </p>
                                
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={() => setSelectedPaper(paper)}
                                        className="flex-1 bg-[#333] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#444] transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Details
                                    </motion.button>
                                    
                                    <a
                                        href={paper.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 border border-[#00d4ff] text-[#00d4ff] px-4 py-2 rounded text-sm font-medium text-center hover:bg-[#00d4ff] hover:text-[#0a0a0a] transition-all"
                                    >
                                        PDF
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Paper Detail Modal */}
            <AnimatePresence>
                {selectedPaper && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedPaper(null)}
                    >
                        <motion.div
                            className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-[#00d4ff]">
                                        {selectedPaper.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedPaper(null)}
                                        className="text-[#a0a0a0] hover:text-white transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="text-[#a0a0a0]">
                                    <p className="font-medium">{selectedPaper.authors}</p>
                                    <p>{selectedPaper.journal} • {selectedPaper.year}</p>
                                    <p className="text-[#00d4ff] mt-2">{selectedPaper.citations} citations</p>
                                </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 text-[#ffd700]">
                                        Abstract
                                    </h3>
                                    <p className="text-[#a0a0a0] leading-relaxed">
                                        {selectedPaper.abstract}
                                    </p>
                                </div>
                                
                                {/* Citation Generator */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 text-[#ffd700]">
                                        Cite This Paper
                                    </h3>
                                    
                                    <div className="flex gap-2 mb-3">
                                        {['apa', 'bibtex', 'mla'].map((format) => (
                                            <button
                                                key={format}
                                                onClick={() => setCitationFormat(format)}
                                                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                                                    citationFormat === format
                                                        ? 'bg-[#00d4ff] text-[#0a0a0a]'
                                                        : 'bg-[#333] text-[#a0a0a0] hover:bg-[#444]'
                                                }`}
                                            >
                                                {format.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#333] relative">
                                        <pre className="text-[#a0a0a0] text-sm whitespace-pre-wrap font-mono">
                                            {generateCitation(selectedPaper, citationFormat)}
                                        </pre>
                                        <button
                                            onClick={() => copyToClipboard(generateCitation(selectedPaper, citationFormat))}
                                            className="absolute top-2 right-2 bg-[#00d4ff] text-[#0a0a0a] px-2 py-1 rounded text-xs font-medium hover:bg-[#00b8e6] transition-colors"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex gap-4">
                                    <a
                                        href={selectedPaper.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#00d4ff] text-[#0a0a0a] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#00b8e6] transition-colors"
                                    >
                                        Download PDF
                                    </a>
                                    
                                    <button
                                        onClick={() => {
                                            // Share functionality
                                            navigator.share({
                                                title: selectedPaper.title,
                                                text: selectedPaper.abstract,
                                                url: window.location.href
                                            }).catch(() => {
                                                // Fallback for browsers that don't support Web Share API
                                                copyToClipboard(window.location.href);
                                            });
                                        }}
                                        className="border-2 border-[#ffd700] text-[#ffd700] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffd700] hover:text-[#0a0a0a] transition-all"
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResearchShowcase;