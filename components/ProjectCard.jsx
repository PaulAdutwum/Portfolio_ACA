import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const techColors = {
        'Go': '#00ADD8',
        'PostgreSQL': '#336791',
        'Docker': '#2496ED',
        'Redis': '#DC382D',
        'gRPC': '#4285F4',
        'TensorFlow': '#FF6F00',
        'Python': '#3776AB',
        'OpenCV': '#5C3EE8',
        'React': '#61DAFB',
        'FastAPI': '#009688',
        'PyTorch': '#EE4C2C',
        'Transformers': '#FF6B35',
        'Kubernetes': '#326CE5'
    };

    const cardVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: { duration: 0.3 }
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
        <>
            <motion.div
                className="bg-[#1a1a1a] rounded-lg overflow-hidden card-hover relative"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setShowModal(true)}
            >
                {/* Project Image - Round */}
                <div className="relative pt-8 pb-4 flex justify-center">
                    <div className="relative">
                        <motion.div
                            className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00d4ff]/30 shadow-lg shadow-[#00d4ff]/20"
                            animate={{
                                borderColor: isHovered ? 'rgba(0, 212, 255, 0.8)' : 'rgba(0, 212, 255, 0.3)',
                                boxShadow: isHovered ? '0 0 30px rgba(0, 212, 255, 0.4)' : '0 0 15px rgba(0, 212, 255, 0.2)'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500"
                                style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
                            />
                        </motion.div>

                        {/* View Details Button on hover */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                className="bg-[#00d4ff] text-[#0a0a0a] px-3 py-1 rounded-lg font-semibold text-xs"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Details
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-4 right-4 bg-[#ffd700] text-[#0a0a0a] px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                        </div>
                    )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-[#00d4ff]">
                        {project.title}
                    </h3>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent mb-4" />

                    {/* Tech Stack */}
                    {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 4).map((tech) => (
                                <motion.span
                                    key={tech}
                                    className="tech-badge px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                        backgroundColor: `${techColors[tech] || '#00d4ff'}20`,
                                        color: techColors[tech] || '#00d4ff',
                                        borderColor: techColors[tech] || '#00d4ff'
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                            {project.tech.length > 4 && (
                                <span className="text-[#a0a0a0] text-xs">
                                    +{project.tech.length - 4} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="flex">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#333] text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-[#444] transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Code
                            </span>
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Round Image */}
                            <div className="relative pt-8 pb-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] rounded-t-lg flex justify-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00d4ff]/50 shadow-lg shadow-[#00d4ff]/30">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 bg-[#0a0a0a] bg-opacity-80 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-[#00d4ff]">
                                    {project.title}
                                </h2>

                                <p className="text-[#a0a0a0] leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Full Tech Stack */}
                                {project.tech && project.tech.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3 text-[#ffd700]">
                                            Technology Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="tech-badge px-3 py-1 rounded text-sm font-medium"
                                                    style={{
                                                        backgroundColor: `${techColors[tech] || '#00d4ff'}20`,
                                                        color: techColors[tech] || '#00d4ff',
                                                        borderColor: techColors[tech] || '#00d4ff'
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action */}
                                <div className="flex">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#333] text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-[#444] transition-colors"
                                    >
                                        View on GitHub
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectCard;