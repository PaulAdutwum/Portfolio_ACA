import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Text-based architecture flow diagram — a stand-in for a real
// system diagram, built from each project's actual stack.
const ArchDiagram = ({ flow }) => (
    <div className="px-5 pt-6 pb-2 flex flex-col items-stretch">
        {flow.map((node, i) => (
            <div key={node} className="flex flex-col items-center">
                <div className="w-full text-center text-[10.5px] sm:text-[11px] tracking-wide px-3 py-2 rounded border border-[#b0b8c4]/25 bg-[#0a0a0a] text-[#b0b8c4] font-mono transition-colors duration-300 group-hover:border-[#b0b8c4]/60 group-hover:text-white">
                    {node}
                </div>
                {i < flow.length - 1 && (
                    <div className="text-[#b0b8c4]/40 text-xs leading-none py-0.5 font-mono">│</div>
                )}
            </div>
        ))}
    </div>
);

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);

    const cardVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="group bg-[#0a0a0a] rounded-lg overflow-hidden card-hover relative border border-transparent hover:border-[#b0b8c4]/20 transition-colors duration-300"
            variants={cardVariants}
            initial="initial"
            animate="animate"
        >
            {project.featured && (
                <div className="absolute top-4 right-4 z-10 bg-[#ffd700] text-[#050505] px-3 py-1 rounded-full text-xs font-bold font-mono">
                    Featured
                </div>
            )}

            <ArchDiagram flow={project.stackFlow} />

            <div className="p-6 pt-4">
                <h3 className="text-xl font-bold mb-1 text-[#b0b8c4] font-mono">
                    {project.title}
                </h3>
                <p className="text-[#8b949e] text-sm mb-4 font-mono">
                    {project.tagline}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b0b8c4]/30 to-transparent mb-4" />

                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-between gap-2 bg-[#0a0a0a] hover:bg-[#151515] border border-[#333] hover:border-[#b0b8c4]/40 text-[#b0b8c4] px-4 py-2 rounded-lg text-sm font-medium font-mono transition-colors duration-300"
                >
                    <span>{expanded ? 'Hide Details' : 'View Details'}</span>
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-block"
                    >
                        ▾
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-5 space-y-5">
                                <p className="text-[#c0c0c0] text-sm leading-relaxed font-mono">
                                    {project.description}
                                </p>

                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-[#caa23a] font-mono mb-2">
                                        Use Case
                                    </h4>
                                    <p className="text-[#a0a0a0] text-sm leading-relaxed font-mono">
                                        {project.useCase}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-[#caa23a] font-mono mb-2">
                                        Highlights
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {project.highlights.map((h) => (
                                            <li key={h} className="text-[#a0a0a0] text-sm font-mono flex gap-2">
                                                <span className="text-[#b0b8c4]">▸</span>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#333] text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-[#444] transition-colors font-mono"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Code
                                        </span>
                                    </a>
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-transparent border border-[#b0b8c4]/40 text-[#b0b8c4] px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-[#b0b8c4]/10 hover:border-[#b0b8c4] transition-colors font-mono"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
