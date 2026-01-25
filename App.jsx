import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import Hero3D from './components/Hero3D';

// Import animated background components - lazy load for performance
const MatrixRain = lazy(() => import('./components/MatrixRain'));
const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'));
const ParticleField = lazy(() => import('./components/ParticleField'));

// Import generated visual assets
import portraitPlaceholder from './assets/lex6.jpeg';
import recyclensPreview from './assets/recyc.png';
import handshakePreview from './assets/handshake.png';
import lumeoPreview from './assets/lumeo.png';
import zerocostPreview from './assets/zerocost.png';

// Animated Name Component
const AnimatedName = ({ name }) => {
    const letters = name.split('');
    
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3
            }
        }
    };
    
    const letterAnimation = {
        hidden: { 
            opacity: 0, 
            y: 50,
            rotateX: -90,
            scale: 0.5
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    };
    
    const shimmer = {
        initial: { backgroundPosition: "-200% center" },
        animate: {
            backgroundPosition: "200% center",
            transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 3,
                ease: "linear"
            }
        }
    };
    
    return (
        <motion.div
            className="inline-flex flex-wrap justify-center perspective-1000"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letterAnimation}
                    className={`inline-block ${letter === ' ' ? 'w-4 md:w-6' : ''}`}
                    style={{
                        background: letter !== ' ' 
                            ? 'linear-gradient(90deg, #00d4ff, #ffd700, #00ff88, #00d4ff, #ffd700)'
                            : 'transparent',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: letter !== ' ' ? 'text' : 'unset',
                        WebkitTextFillColor: letter !== ' ' ? 'transparent' : 'unset',
                        backgroundClip: letter !== ' ' ? 'text' : 'unset',
                        textShadow: letter !== ' ' ? '0 0 30px rgba(0, 212, 255, 0.5)' : 'none'
                    }}
                    whileHover={{
                        scale: 1.2,
                        y: -10,
                        transition: { type: "spring", stiffness: 500 }
                    }}
                >
                    <motion.span
                        style={{
                            display: 'inline-block',
                            background: letter !== ' ' 
                                ? 'linear-gradient(90deg, #00d4ff, #ffd700, #00ff88, #00d4ff)'
                                : 'transparent',
                            backgroundSize: '300% auto',
                            WebkitBackgroundClip: letter !== ' ' ? 'text' : 'unset',
                            WebkitTextFillColor: letter !== ' ' ? 'transparent' : 'unset',
                            backgroundClip: letter !== ' ' ? 'text' : 'unset',
                        }}
                        animate={{
                            backgroundPosition: ['0% center', '100% center', '0% center'],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.1
                        }}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                </motion.span>
            ))}
        </motion.div>
    );
};

// Project data
const projects = [
    {
        id: 1,
        title: "ZeroCost",
        description: "Full-stack platform that aggregates free food, events, and community opportunities on an interactive map.",
        tech: [],
        github: "https://github.com/PaulAdutwum/ZeroCost",
        image: zerocostPreview,
        featured: false
    },
    {
        id: 2,
        title: "RecycLens",
        description: "Real-time computer vision platform that classifies waste into 12 material categories using a custom-trained CNN. Built with PyTorch, FastAPI, and Next.js to transform camera input into actionable recycling guidance.",
        tech: [],
        github: "https://github.com/PaulAdutwum/RecycLens",
        image: recyclensPreview,
        featured: false
    },
    {
        id: 3,
        title: "Lumeo AI",
        description: "Mental health support platform with AI-powered chat, calming imagery, and personalized video recommendations.",
        tech: [],
        github: "https://github.com/PaulAdutwum/Lumeo_Mental_Health",
        image: lumeoPreview,
        featured: false
    },
    {
        id: 4,
        title: "Handshake AI",
        description: "LLM security framework for detecting and preventing adversarial attacks on language models.",
        tech: [],
        github: "#",
        image: handshakePreview,
        featured: false
    }
];

// Research data
const researchPapers = [
    {
        id: 1,
        title: "Ulam Words and Computational Number Theory",
        authors: "Paul Adutwum",
        journal: "INTEGERS: Electronic Journal of Combinatorial Number Theory",
        year: 2024,
        abstract: "This paper explores the computational aspects of Ulam words and their applications in number theory. We present novel algorithms for generating Ulam sequences and analyze their mathematical properties...",
        pdf: "#",
        citations: 12,
        featured: true
    },
    {
        id: 2,
        title: "Machine Learning Applications in Supply Chain Optimization",
        authors: "Paul Adutwum, et al.",
        journal: "Journal of Operations Research",
        year: 2023,
        abstract: "A comprehensive study on applying machine learning techniques to optimize supply chain operations, with focus on predictive analytics and real-time decision making...",
        pdf: "#",
        citations: 8,
        featured: false
    }
];

// Extracurriculars data
const extracurricularsData = [
    {
        id: 1,
        title: "Bonner Racial Justice Fellow",
        organization: "Harward Center for Community Partnerships, Bates College",
        location: "Lewiston, ME",
        dates: "September 2023 – Present",
        highlights: [
            "Volunteer weekly at the Tree Street Youth Center in Lewiston, mentoring K-12 students through youth-development workshops and fostering collaboration between Bates students and local nonprofit organizations in Lewiston."
        ]
    },
    {
        id: 2,
        title: "Residential Assistant",
        organization: "Bates College",
        location: "Lewiston, ME",
        dates: "September 2024 – Present",
        highlights: [
            "Lead a diverse community of 60+ students, organizing community building events and fostering an inclusive residential environment through monthly student engagement initiatives."
        ]
    },
    {
        id: 3,
        title: "Member, Campus Safety Advisory Committee",
        organization: "Bates Student Government",
        location: "Lewiston, ME",
        dates: "November 2023 – Present",
        highlights: [
            "Serve as a student representative on the Campus Safety Advisory Committee, liaising between students and administrators to shape campus safety policies and organize campus-wide emergency preparedness initiatives."
        ]
    },
    {
        id: 4,
        title: "Board Member, Africana Club",
        organization: "Bates College",
        location: "Lewiston, ME",
        dates: "November 2024 – Present",
        highlights: [
            "Organize weekly club programming and coordinate campus-wide intercultural events, including Afro Gala and Africana fashion showcases, to celebrate African heritage and build community across campus."
        ]
    },
    {
        id: 5,
        title: "Member",
        organization: "Soccer Club",
        location: "Lewiston, ME",
        dates: "September 2023 – Present",
        highlights: [
            "Built a web application to manage intramural soccer competitions, improving scheduling and score tracking, and competed as a striker in inter-school scrimmages."
        ]
    },
    {
        id: 6,
        title: "Member",
        organization: "Physics and Astronomy Club",
        location: "Lewiston, ME",
        dates: "September 2023 – Present",
        highlights: [
            "Assisted in organizing campus stargazing nights, planetarium shows, and outreach events, coordinating telescope setup and student engagement to make astronomy accessible to community members."
        ]
    }
];

// Awards data
const awards = [
    {
        id: "award-1",
        title: "DataFest Hackathon — Best Insight (1st Place)",
        institution: "American Statistical Association",
        year: "2025",
        description:
            "Awarded 1st Place for Best Insight for predictive modeling and analysis of large-scale commercial real estate data."
    },
    {
        id: "award-2",
        title: "Dana Scholar",
        institution: "Bates College",
        year: "2024",
        description:
            "Highest institutional honor awarded to select first-year students for academic excellence and leadership potential."
    },
    {
        id: "award-3",
        title: "Dean's List",
        institution: "Bates College",
        year: "2023, 2024",
        description:
            "Awarded for consistent academic achievement, maintaining a cumulative GPA of 3.92 or higher."
    },
    {
        id: "award-4",
        title: "Most Outstanding Community Engagement Award",
        institution: "Bates College",
        year: "2024",
        description:
            "Recipient of the “Rookie of the Year” award for exceptional initiative and leadership in civic engagement and community service."
    }
];

// Work experience and hackathons
const workExperiences = [
    {
        id: "work-1",
        title: "Software Engineering Intern, Platform Engineering Team",
        organization: "InboundAV",
        location: "Remote",
        dates: "June 2025 – August 2025"
    },
    {
        id: "work-2",
        title: "Model Validation Assistant",
        organization: "Handshake AI",
        location: "Remote",
        dates: "October 2025 – Present",
        image: handshakePreview
    }
];

const hackathons = [
    {
        id: "hack-1",
        title: "Data Analyst",
        organization: "American Statistical Association — DataFest Hackathon",
        location: "Waterville, ME",
        dates: "February 2025 – March 2025"
    }
];

// Hobbies data - with videos from public folder
const hobbies = [
    {
        id: 1,
        title: "Basketball",
        icon: "🏀",
        video: "/basketball.mp4"
    },
    {
        id: 2,
        title: "Music",
        icon: "🎵",
        video: "/music.mp4"
    },
    {
        id: 3,
        title: "Soccer",
        icon: "⚽",
        video: "/soccer.mp4"
    }
];

function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isLoading, setIsLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [contactStatus, setContactStatus] = useState('idle');
    // Background mode: 'matrix', 'particles', 'orbs', 'mesh', 'aurora'
    const [backgroundMode, setBackgroundMode] = useState('matrix');
    
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const researchRef = useRef(null);
    const projectsRef = useRef(null);
    const awardsRef = useRef(null);
    const communityRef = useRef(null);
    const contactRef = useRef(null);
    const hobbiesRef = useRef(null);
    
    const sectionRefs = {
        hero: heroRef,
        about: aboutRef,
        research: researchRef,
        projects: projectsRef,
        awards: awardsRef,
        community: communityRef,
        contact: contactRef,
        hobbies: hobbiesRef
    };
    
    useEffect(() => {
        // Initialize scroll indicator
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Initialize typewriter effect
        setTimeout(() => {
            setIsLoading(false);
            
            // Initialize Typed.js for hero name
            if (typeof Typed !== 'undefined') {
                const typed = new Typed('#typed-name', {
                    strings: ['Paul Adutwum'],
                    typeSpeed: 100,
                    backSpeed: 50,
                    backDelay: 2000,
                    loop: false,
                    showCursor: true,
                    cursorChar: '|'
                });
            }
        }, 1000);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        // Update scroll indicator
        const indicator = document.getElementById('scrollIndicator');
        if (indicator) {
            indicator.style.transform = `scaleX(${scrollProgress / 100})`;
        }
    }, [scrollProgress]);
    
    const scrollToSection = (sectionId) => {
        const ref = sectionRefs[sectionId];
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        setContactStatus('sending');
        const form = event.currentTarget;

        try {
            const response = await fetch('https://formspree.io/f/xdkgoynb', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                setContactStatus('success');
                form.reset();
                setTimeout(() => setContactStatus('idle'), 5000);
            } else {
                setContactStatus('error');
                setTimeout(() => setContactStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Failed to send form:', error);
            setContactStatus('error');
            setTimeout(() => setContactStatus('idle'), 5000);
        }
    };
    
    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };
    
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };
    
    // Removed loading screen for faster initial paint
    // Content renders immediately now
    
    // Check if mobile for performance optimization
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative">
            {/* Subtle animated side signals */}
            <div className="side-signal side-signal-left" aria-hidden="true" />
            <div className="side-signal side-signal-right" aria-hidden="true" />
            {/* Dynamic Animated Backgrounds - Only show on desktop for performance */}
            {!isMobile && (
                <Suspense fallback={<div className="fixed inset-0 bg-[#0a0a0a]" />}>
                    {backgroundMode === 'matrix' && <MatrixRain opacity={0.08} />}
                    {backgroundMode === 'particles' && <ParticleField />}
                    {(backgroundMode === 'orbs' || backgroundMode === 'mesh' || backgroundMode === 'aurora') && (
                        <AnimatedBackground variant={backgroundMode} />
                    )}
                </Suspense>
            )}
            
            
            {/* Main Content - above background */}
            <div className="relative z-10">
            <Navbar 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
            />
            
            {/* New 3D Hero Section with mobile-first design */}
            <section ref={heroRef} id="hero">
                <Hero3D scrollToSection={scrollToSection} />
            </section>
            
            {/* About Section */}
            <section ref={aboutRef} id="about" className="py-20 bg-[#1a1a1a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
                            About Me
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#ffd700] rounded-full blur-lg opacity-30"></div>
                                    <img 
                                        src={portraitPlaceholder} 
                                        alt="Paul Adutwum" 
                                        className="relative rounded-full w-80 h-80 mx-auto object-cover border-4 border-[#00d4ff] glow-effect"
                                    />
                                </div>
                            </div>
                            
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl font-bold mb-6 text-[#00d4ff]">
                                    Hi there! <span className="inline-block animate-bounce">👋</span>
                                </h3>
                                
                                <div className="space-y-5 text-[#c0c0c0] leading-relaxed text-lg">
                                    <p>
                                        Welcome to my portfolio! My name is <span className="text-[#00d4ff] font-semibold">Paul Adutwum</span>. 
                                        I'm currently based in the United States, but I'm originally from <span className="text-[#00d4ff]">Ghana</span>.
                                    </p>
                                    
                                    <p>
                                        I'm a first-generation student at <span className="text-[#00d4ff]">Bates College</span>, studying{' '}
                                        <span className="text-[#00d4ff]">Mathematics</span> and <span className="text-[#00d4ff]">Physics</span>{' '}
                                        with a minor in <span className="text-[#00d4ff]">Computational Studies</span>. I've always enjoyed 
                                        figuring out how things work, and right now, I'm exploring <span className="text-[#00d4ff]">AI</span>{' '}
                                        and <span className="text-[#00d4ff]">embedded systems</span> through personal projects.
                                    </p>
                                    
                                    <p>
                                        Beyond academics, I love staying active and unwinding with music. You'll likely find me on the{' '}
                                        soccer field, but I'm always happy to connect and chat — so feel free to reach out! 🚀
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Research Section */}
            <section ref={researchRef} id="research" className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
                            Research
                        </h2>
                        
                        <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-[#333]">
                            {/* Paper Title */}
                            <div className="mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Distributions of Ulam Words Up to Length 30
                                </h3>
                                <p className="text-[#a0a0a0] text-sm">
                                    Paul Adutwum, Hopper Clark, Ro Emerson, Alexandra Sheydvasser, Arseniy Sheydvasser, Axelle Tougouma
                                </p>
                                <p className="text-[#00d4ff]/70 text-sm mt-1">
                                    Published in INTEGERS Journal, 2025
                                </p>
                            </div>
                            
                            {/* Personal Story */}
                            <div className="space-y-4 text-[#c0c0c0] leading-relaxed text-lg mb-8">
                                <p>
                                    In my first year at Bates College, I worked as a research assistant with{' '}
                                    <span className="text-[#00d4ff]">Professor Senia Sheydvasser</span> in the mathematics department. 
                                    I was curious about how mathematical ideas could be explored and tested through computation, 
                                    even though I hadn’t yet taken many advanced classes or done formal research. Joining a 
                                    project focused on abstract combinatorics and number theory—especially the{' '}
                                    <span className="text-[#00d4ff]">Gibbs conjecture</span> and <span className="text-[#00d4ff]">Ulam sequences</span>—felt 
                                    intimidating at first, and I had a lot to learn.
                                </p>
                                
                                <p>
                                    At the beginning, I spent a significant amount of time learning new ideas in set combinatorics 
                                    and additive number theory, and it took a while for everything to come together. With Professor 
                                    Sheydvasser’s guidance, I became more comfortable asking questions, reading technical papers, 
                                    and working through unfamiliar concepts. Facing these challenges helped me grow and become more 
                                    confident in engaging with abstract mathematical problems.
                                </p>
                                
                                <p>
                                    As the year progressed, I began making more substantial contributions, particularly on the 
                                    computational side of the project. I worked on expanding Ulam sequences of the form U(1, x) and 
                                    improving existing datasets to identify new patterns at larger scales. I refined and optimized 
                                    the Gibbs algorithm used to compute Ulam numbers, ultimately enabling us to generate over one 
                                    million terms—more than sixty times the size of the previous dataset. This expansion made it 
                                    possible to explore large-scale structures and behaviors in Ulam sequences that had not been 
                                    previously studied.
                                </p>
                                
                                <p>
                                    This work culminated in a published paper, marking my first experience with academic research 
                                    and publication. More importantly, it reshaped how I think about mathematics. I learned how to 
                                    approach open-ended problems, integrate theory with computation, and persist through uncertainty. 
                                    Conducting research as a freshman sparked a lasting interest in advanced topics in mathematics 
                                    and computer science, and it continues to influence how I learn and solve problems today.
                                </p>
                            </div>
                            
                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://math.colgate.edu/~integers/z102/z102.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-black font-semibold rounded-lg hover:bg-[#00d4ff]/80 transition-all hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Read the Paper
                                </a>
                                <a 
                                    href="https://math.colgate.edu/~integers/z102/z102.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#00d4ff] text-[#00d4ff] font-semibold rounded-lg hover:bg-[#00d4ff]/10 transition-all hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View on INTEGERS
                                </a>
                            </div>
                        </div>
                        
                        {/* RAG Research Project */}
                        <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-[#333] mt-8">
                            {/* Project Title */}
                            <div className="mb-8">
                                <div className="inline-block px-3 py-1 bg-[#00ff88]/20 text-[#00ff88] text-sm rounded-full mb-4">
                                    Winter 2025 • Coming Soon
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    RAG-Powered Academic Advising System
                                </h3>
                                <p className="text-[#a0a0a0] text-sm">
                                    Digital and Computational Studies Department, Bates College
                                </p>
                                <p className="text-[#00d4ff]/70 text-sm mt-1">
                                    Research Assistant — June 2025 – August 2025
                                </p>
                            </div>
                            
                            {/* Personal Story */}
                            <div className="space-y-4 text-[#c0c0c0] leading-relaxed text-lg mb-8">
                                <p>
                                    During the winter of my sophomore year, the <span className="text-[#00d4ff]">Digital and Computational Studies</span> program 
                                    at Bates was transitioning from a minor into a full major, and I was taking a web development 
                                    course with <span className="text-[#00d4ff]">Professor Barry Lawson</span> right in the middle of that change. 
                                    The department was suddenly receiving a flood of questions from prospective and current students 
                                    about requirements, pathways, and course planning, and traditional advising methods were no longer enough.
                                </p>
                                
                                <p>
                                    After several brainstorming sessions, we decided to design a system that could answer these 
                                    questions automatically using the department's own materials. That summer, I worked as a 
                                    Research Assistant to build a <span className="text-[#00d4ff]">Retrieval-Augmented Generation (RAG)</span> pipeline 
                                    that transformed over 5,000 institutional documents into a searchable knowledge base using 
                                    <span className="text-[#00d4ff]"> vector embeddings</span>. I then deployed the system as a 
                                    <span className="text-[#00d4ff]"> FastAPI microservice</span> so students could receive accurate, 
                                    context-aware responses.
                                </p>
                                
                                <p className="text-[#ffd700] italic">
                                    More on this project coming soon!
                                </p>
                            </div>
                            
                            {/* Button */}
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://github.com/PaulAdutwum" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-black font-semibold rounded-lg hover:bg-[#00d4ff]/80 transition-all hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    View My GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Projects Section */}
            <section ref={projectsRef} id="projects" className="py-20 bg-[#1a1a1a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
                            Personal Projects
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Experience Section */}
            <section className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">
                            Work Experience
                        </h2>
                        <p className="text-center text-[#a0a0a0] max-w-2xl mx-auto mb-12">
                            Recent roles and team-based projects.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {workExperiences.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] hover:border-[#00d4ff]/50 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0, 212, 255, 0.08)' }}
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg md:text-xl font-bold text-[#00d4ff]">
                                            {item.organization}
                                        </h3>
                                        <span className="text-xs md:text-sm text-[#ffd700] whitespace-nowrap">
                                            {item.dates}
                                        </span>
                                    </div>
                                    <p className="text-white font-medium mb-2">
                                        {item.title}
                                    </p>
                                    <p className="text-[#888] text-sm">
                                        {item.location}
                                    </p>
                                    {item.image && (
                                        <div className="mt-4 w-16 h-16 rounded-lg overflow-hidden border border-[#00d4ff]/30">
                                            <img
                                                src={item.image}
                                                alt={`${item.organization} logo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6 gradient-text">
                                Hackathons
                            </h3>
                            <div className="max-w-3xl mx-auto space-y-4">
                                {hackathons.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] hover:border-[#00d4ff]/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-[#00d4ff]">
                                                    {item.organization}
                                                </h4>
                                                <p className="text-white font-medium">
                                                    {item.title}
                                                </p>
                                            </div>
                                            <div className="text-sm text-[#a0a0a0]">
                                                {item.location} • {item.dates}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Awards Section */}
            <section ref={awardsRef} id="awards" className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">
                            Honors & Awards
                        </h2>
                        <p className="text-center text-[#a0a0a0] max-w-3xl mx-auto mb-12">
                            Recognition for academic excellence and leadership.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {awards.map((award, index) => (
                                <motion.div
                                    key={award.id}
                                    className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333] hover:border-[#00d4ff]/50 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0, 212, 255, 0.08)' }}
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg md:text-xl font-bold text-[#00d4ff]">
                                            {award.title}
                                        </h3>
                                        <span className="text-xs md:text-sm text-[#ffd700] whitespace-nowrap">
                                            {award.year}
                                        </span>
                                    </div>
                                    <p className="text-white font-medium mb-2">
                                        {award.institution}
                                    </p>
                                    <p className="text-[#a0a0a0] text-sm leading-relaxed">
                                        {award.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Extracurriculars Section */}
            <section ref={communityRef} id="community" className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
                            Extracurriculars
                        </h2>
                        
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/40 to-transparent" />
                            <div className="space-y-6 pl-10">
                                {extracurricularsData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="relative bg-[#1a1a1a] rounded-xl p-6 border border-[#333] hover:border-[#00d4ff]/50 transition-all duration-300"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0, 212, 255, 0.08)' }}
                                    >
                                        <div className="absolute -left-10 top-7 w-3 h-3 rounded-full bg-[#00d4ff] shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
                                        
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-[#00d4ff]">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs px-2.5 py-1 rounded-full border border-[#00d4ff]/40 text-[#00d4ff] bg-[#00d4ff]/10">
                                                {item.dates}
                                            </span>
                                        </div>
                                        
                                        <p className="text-white font-medium mb-1">
                                            {item.organization}
                                        </p>
                                        
                                        <p className="text-[#888] text-sm mb-4">
                                            {item.location}
                                        </p>
                                        
                                        <ul className="space-y-2">
                                            {item.highlights.map((highlight, i) => (
                                                <li key={i} className="text-[#a0a0a0] text-sm flex items-start gap-2">
                                                    <span className="text-[#00d4ff] mt-1">•</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Hobbies Section */}
            <section ref={hobbiesRef} id="hobbies" className="py-16 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-4xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">
                            Hobbies & Interests
                        </h2>
                        
                        {/* Compact video grid */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                            {hobbies.map((hobby, index) => (
                                <motion.div
                                    key={hobby.id}
                                    className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-[#00d4ff]/50 transition-all duration-300 group"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    {/* Video container - square aspect ratio */}
                                    <div className="aspect-square overflow-hidden relative">
                                        <video 
                                            src={hobby.video}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    
                                    {/* Compact label */}
                                    <div className="p-2 sm:p-3 text-center">
                                        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                                            <span className="text-lg sm:text-xl">{hobby.icon}</span>
                                            <h3 className="text-xs sm:text-sm font-medium text-[#00d4ff]">
                                                {hobby.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                    </motion.div>
                </div>
            </section>
            
            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="py-20 bg-[#1a1a1a]">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">
                            Contact
                        </h2>
                        <p className="text-center text-[#a0a0a0] max-w-2xl mx-auto mb-12">
                            Feel free to reach out to me.
                        </p>
                        
                        <div className="max-w-3xl mx-auto">
                            <form
                                onSubmit={handleContactSubmit}
                                className="bg-[#0f0f0f] rounded-2xl p-6 md:p-8 border border-[#333]"
                            >
                                <input type="hidden" name="_subject" value="New contact from Portfolio" />
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-[#a0a0a0] mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            className="w-full bg-[#1a1a1a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#00d4ff]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#a0a0a0] mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className="w-full bg-[#1a1a1a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#00d4ff]"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <label className="block text-sm text-[#a0a0a0] mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="What is this about?"
                                        className="w-full bg-[#1a1a1a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#00d4ff]"
                                    />
                                </div>
                                
                                <div className="mt-6">
                                    <label className="block text-sm text-[#a0a0a0] mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Write your message..."
                                        className="w-full bg-[#1a1a1a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#00d4ff] resize-none"
                                        required
                                    />
                                </div>
                                
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={contactStatus === 'sending'}
                                        className="bg-[#00d4ff] text-[#0a0a0a] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                
                                {contactStatus === 'success' && (
                                    <div className="mt-6 flex items-center justify-center gap-2 text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg px-4 py-3 text-sm">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Message sent successfully! I will get back to you soon.
                                    </div>
                                )}
                                
                                {contactStatus === 'error' && (
                                    <div className="mt-6 text-center text-[#ff6b35] bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-lg px-4 py-3 text-sm">
                                        Something went wrong. Please try again later.
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
            </div>
        </div>
    );
}

export default App;