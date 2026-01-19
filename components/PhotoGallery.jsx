import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = ({ images }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];
    
    const filteredImages = selectedCategory === 'All' 
        ? images 
        : images.filter(img => img.category === selectedCategory);
    
    useEffect(() => {
        // Simulate loading time for images
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const categoryVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };
    
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };
    
    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };
    
    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00d4ff]"></div>
                <p className="text-[#a0a0a0] mt-4">Loading Gallery...</p>
            </div>
        );
    }
    
    return (
        <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-12"
                variants={categoryVariants}
                initial="hidden"
                animate="visible"
            >
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                                ? 'bg-[#00d4ff] text-[#0a0a0a]'
                                : 'bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#333] hover:text-[#00d4ff]'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>
            
            {/* Masonry Grid */}
            <motion.div 
                className="masonry-grid"
                variants={categoryVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence mode="wait">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={`${image.id}-${selectedCategory}`}
                            className="masonry-item cursor-pointer"
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            whileHover="hover"
                            onClick={() => setSelectedImage(image)}
                            layout
                        >
                            <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a]">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-auto object-cover transition-transform duration-300"
                                />
                                
                                {/* Overlay */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold mb-1">
                                            {image.title}
                                        </h3>
                                        <p className="text-[#a0a0a0] text-sm">
                                            {image.description}
                                        </p>
                                        <div className="mt-2">
                                            <span className="inline-block bg-[#00d4ff] text-[#0a0a0a] px-2 py-1 rounded text-xs font-medium">
                                                {image.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl max-h-full"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 bg-[#0a0a0a] bg-opacity-80 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {/* Image */}
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                            />
                            
                            {/* Image Info */}
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] to-transparent p-6 rounded-b-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-white text-xl font-bold mb-2">
                                    {selectedImage.title}
                                </h3>
                                <p className="text-[#a0a0a0] mb-3">
                                    {selectedImage.description}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="inline-block bg-[#00d4ff] text-[#0a0a0a] px-3 py-1 rounded-full text-sm font-medium">
                                        {selectedImage.category}
                                    </span>
                                    <button
                                        onClick={() => {
                                            // Add share functionality
                                            navigator.clipboard.writeText(selectedImage.src);
                                        }}
                                        className="text-[#a0a0a0] hover:text-[#00d4ff] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGallery;