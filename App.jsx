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
import portraitPlaceholder from './assets/new_profile.jpg';
import handshakePreview from './assets/handshake.png';

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
                            ? 'linear-gradient(90deg, #b0b8c4, #ffd700, #00ff88, #b0b8c4, #ffd700)'
                            : 'transparent',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: letter !== ' ' ? 'text' : 'unset',
                        WebkitTextFillColor: letter !== ' ' ? 'transparent' : 'unset',
                        backgroundClip: letter !== ' ' ? 'text' : 'unset',
                        textShadow: letter !== ' ' ? '0 0 30px rgba(176, 184, 196, 0.5)' : 'none'
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
                                ? 'linear-gradient(90deg, #b0b8c4, #ffd700, #00ff88, #b0b8c4)'
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

// Project data — descriptions, use cases, and stack details pulled
// directly from each project's GitHub README.
const projects = [
    {
        id: 1,
        title: "ZeroCost",
        tagline: "Distributed platform aggregating free food, events & opportunities on a live map.",
        description: "I built ZeroCost because I wanted to learn how to design and orchestrate a real distributed system — coordinating services written in four different languages — and to solve a problem I kept running into on campus: free food, events, and giveaways scattered across a dozen disconnected group chats and flyers. The result is a full-stack platform with a Next.js/Mapbox frontend, a Java Spring Boot API, a Go microservice running concurrent scrapers, and a custom C++ engine for high-performance ranking — all containerized with Docker and backed by PostgreSQL and Redis.",
        useCase: "Helps students and low-income residents discover free meals, events, and giveaways in real time by aggregating dozens of scattered sources into one ranked, geolocated feed.",
        highlights: [
            "Microservices architecture spanning 4 languages (TS, Java, Go, C++)",
            "Concurrent Go scrapers aggregating live sources",
            "Custom C++ scoring/ranking engine",
            "Dockerized multi-service deployment with PostgreSQL + Redis"
        ],
        stackFlow: ["Next.js + Mapbox (Frontend)", "Spring Boot API (Java)", "Go Scraper (concurrent)", "C++ Ranking Engine", "PostgreSQL + Redis"],
        tech: ["Next.js", "TypeScript", "Java", "Spring Boot", "Go", "C++", "PostgreSQL", "Redis", "Docker"],
        github: "https://github.com/PaulAdutwum/ZeroCost",
        featured: false
    },
    {
        id: 2,
        title: "RecycLens",
        tagline: "Real-time computer vision that classifies waste into 12 categories to cut recycling contamination.",
        description: "I built RecycLens because I wanted to learn how to take a computer vision model out of a notebook and into a real, usable product — and to help solve a problem I cared about: how often recycling gets contaminated simply because people aren't sure which bin an item belongs in. I trained a ResNet-18 CNN via transfer learning in PyTorch, exported it to TorchScript, and served it through a FastAPI backend to a Next.js client, with classification history stored in MongoDB and a live demo deployed on Vercel.",
        useCase: "Lets anyone point a camera at an item and instantly get sorting guidance, reducing contamination in recycling streams for households and campus recycling programs.",
        highlights: [
            "Custom-trained ResNet-18 CNN, 12-class waste classification",
            "TorchScript export for low-latency inference",
            "FastAPI inference server + Next.js client",
            "Live production demo deployed on Vercel"
        ],
        stackFlow: ["React/Next.js Camera UI", "FastAPI Inference Server", "PyTorch ResNet-18 (TorchScript)", "MongoDB (history)"],
        tech: ["PyTorch", "FastAPI", "Next.js", "TypeScript", "MongoDB", "Computer Vision"],
        github: "https://github.com/PaulAdutwum/RecycLens",
        demo: "https://recyc-lens.vercel.app/",
        featured: false
    },
    {
        id: 3,
        title: "Lumeo AI",
        tagline: "AI-powered mental wellness companion blending empathetic chat, generative art, and curated resources.",
        description: "I built Lumeo because I wanted to learn how to design a responsible, production-style AI application — combining conversation, generated imagery, and semantic search into something that actually helps people — after seeing how many of my peers needed accessible mental health support and didn't know where to start. It pairs GPT-4 for empathy-driven conversation with DALL·E for therapeutic imagery, uses Pinecone for semantic search over self-care and mental-health resources, and was later migrated from Firebase to PostgreSQL and AWS S3 for improved performance and scale.",
        useCase: "Gives users a private, always-available space to talk through emotions, get calming visuals, guided breathing exercises, and be routed to real mental-health resources.",
        highlights: [
            "GPT-4 conversational AI tuned for empathy",
            "DALL·E-generated therapeutic imagery",
            "Pinecone semantic search for resource matching",
            "Migrated from Firebase to PostgreSQL + AWS S3"
        ],
        stackFlow: ["React/TypeScript Client", "OpenAI GPT-4 + DALL·E", "Pinecone Vector Search", "PostgreSQL + AWS S3"],
        tech: ["TypeScript", "OpenAI API", "Pinecone", "PostgreSQL", "AWS"],
        github: "https://github.com/PaulAdutwum/Lumeo_Mental_Health",
        featured: false
    },
    {
        id: 4,
        title: "Autonomous Lidar Object Detection System",
        tagline: "Bare-metal C control system for real-time obstacle mapping with sub-50ms response.",
        description: "I built this because I wanted to learn how firmware, hardware, and control theory actually intersect — not just in theory, but by getting a real sensor, motor, and microcontroller to work together reliably in a safety-critical loop. Interrupt-driven C firmware fuses Lidar and ultrasonic sensor data over UART/GPIO, drives a 180° servo sweep via PWM, and triggers synchronized buzzer, LED, and motor responses, with live telemetry streamed to a custom Python GUI for real-time monitoring and validation.",
        useCase: "A safety-critical obstacle-avoidance reference platform — the same closed-loop sensing-to-actuation pattern used in robotics, autonomous vehicles, and industrial safety systems.",
        highlights: [
            "Interrupt Service Routines for sub-50ms deterministic response",
            "180° PWM-driven servo scanning",
            "Multi-sensor fusion (Lidar + ultrasonic) over UART/GPIO",
            "Custom Python GUI for live telemetry & validation"
        ],
        stackFlow: ["Lidar + Ultrasonic Sensors", "C Firmware (ISR / State Machine)", "PWM Servo + Actuators", "Python Telemetry GUI"],
        tech: ["C", "Embedded Systems", "UART", "PWM", "Python"],
        github: "https://github.com/PaulAdutwum/embedded-control-systems",
        featured: false
    },
    {
        id: 5,
        title: "RayTracer",
        tagline: "Multithreaded C++20 ray tracer with BVH acceleration and a live ImGui control panel.",
        description: "I built this ray tracer because I wanted to learn computer graphics from first principles — how a renderer actually turns math into an image — instead of just using an engine. Implementing ray-sphere and ray-triangle intersection (Möller–Trumbore), a BVH acceleration structure, and PBR-style shading with Schlick Fresnel myself meant understanding the same techniques that power production renderers and game engines, all wrapped in a real-time, multithreaded C++20 app with soft shadows and a live Dear ImGui control panel.",
        useCase: "A from-scratch demonstration of core computer graphics and systems-programming fundamentals — the same rendering math (BVH, PBR shading) that powers production renderers and game engines.",
        highlights: [
            "BVH acceleration structure for fast ray-scene intersection",
            "PBR-style shading with roughness/metallic + Fresnel",
            "Soft shadows via area-light sampling",
            "Real-time multithreaded CPU rendering + ImGui controls"
        ],
        stackFlow: ["Raylib Window/Input", "BVH + Ray-Scene Intersection", "PBR Shading Engine", "ImGui Live Control Panel"],
        tech: ["C++", "CMake", "Raylib", "Dear ImGui"],
        github: "https://github.com/PaulAdutwum/RayTracer",
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

function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isLoading, setIsLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [contactStatus, setContactStatus] = useState('idle');
    // Background mode: 'matrix', 'particles', 'orbs', 'mesh', 'aurora', 'rings'
    const [backgroundMode, setBackgroundMode] = useState('orbs');
    
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const researchRef = useRef(null);
    const projectsRef = useRef(null);
    const awardsRef = useRef(null);
    const communityRef = useRef(null);
    const contactRef = useRef(null);

    const sectionRefs = {
        hero: heroRef,
        about: aboutRef,
        research: researchRef,
        projects: projectsRef,
        awards: awardsRef,
        community: communityRef,
        contact: contactRef
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
        <div className="min-h-screen bg-[#050505] text-white relative">
            {/* Subtle animated side signals */}
            <div
                className="side-signal side-signal-left"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(176,184,196,0.10) 0%, rgba(5,5,5,0.92) 35%, rgba(5,5,5,0.92) 65%, rgba(255,215,0,0.08) 100%)`
                }}
                aria-hidden="true"
            />
            <div
                className="side-signal side-signal-right"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(176,184,196,0.10) 0%, rgba(5,5,5,0.92) 35%, rgba(5,5,5,0.92) 65%, rgba(255,215,0,0.08) 100%)`
                }}
                aria-hidden="true"
            />
            {/* Dynamic Animated Backgrounds - Only show on desktop for performance */}
            {!isMobile && (
                <Suspense fallback={<div className="fixed inset-0 bg-[#050505]" />}>
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
            <section ref={aboutRef} id="about" className="py-20 bg-[#050505]">
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
                            <div className="order-1 md:order-2">
                                <div className="relative">
                                    <img 
                                        src={portraitPlaceholder} 
                                        alt="Paul Adutwum" 
                                        className="relative rounded-full w-80 h-80 mx-auto object-cover border-4 border-[#b0b8c4] glow-effect"
                                    />
                                </div>
                            </div>
                            
                            <div className="order-2 md:order-1">
                                <h3 className="text-3xl font-bold mb-6 text-[#b0b8c4]">
                                    Hi there! <span className="inline-block animate-bounce">👋</span>
                                </h3>
                                
                                <div className="space-y-5 text-[#c0c0c0] leading-relaxed text-lg">
                                    <p>
                                        I'm <span className="text-[#b0b8c4] font-semibold">Paul Adutwum</span> — a first-generation student at{' '}
                                        <span className="text-[#b0b8c4]">Columbia University</span> studying{' '}
                                        <span className="text-[#b0b8c4]">Electrical and Computer Engineering</span>.
                                    </p>

                                    <p>
                                        Before Columbia, I completed my pre-engineering program at{' '}
                                        <span className="text-[#b0b8c4]">Bates College</span>, where I studied{' '}
                                        <span className="text-[#b0b8c4]">Mathematics</span> and <span className="text-[#b0b8c4]">Physics</span>{' '}
                                        with a minor in <span className="text-[#b0b8c4]">Computer Science</span>.
                                    </p>

                                    <p>
                                        Some things I've done: published combinatorics research in a peer-reviewed journal, won a national
                                        data science competition, built embedded firmware for autonomous detection systems, and attended
                                        the <span className="text-[#b0b8c4]">Morgan Stanley Equity Derivatives Summit</span> as one of 30
                                        selected from 1,000+ applicants.
                                    </p>

                                    <p>
                                        I tend to pick up something new and keep pulling the thread until it makes sense. I'm currently
                                        learning <span className="text-[#b0b8c4]">Verilog</span>, <span className="text-[#b0b8c4]">SystemVerilog</span>,{' '}
                                        <span className="text-[#b0b8c4]">PCB design</span>, <span className="text-[#b0b8c4]">machine learning</span>,
                                        and <span className="text-[#b0b8c4]">quantitative finance</span>.
                                    </p>

                                    <p>
                                        I'm also working on <span className="text-[#b0b8c4]">RecycLens</span> — a computer vision system for
                                        automated waste classification, exploring how it becomes real sorting infrastructure, and going
                                        deeper into quantitative systems and financial modeling.
                                    </p>

                                    <p>
                                        Outside of work I play soccer, listen to a lot of music, and am always happy to connect with people
                                        working on interesting problems. 🚀
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Research Section */}
            <section ref={researchRef} id="research" className="py-20 bg-[#050505]">
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
                        
                        <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 border border-[#333]">
                            {/* Paper Title */}
                            <div className="mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Distributions of Ulam Words Up to Length 30
                                </h3>
                                <p className="text-[#a0a0a0] text-sm">
                                    Paul Adutwum, Hopper Clark, Ro Emerson, Alexandra Sheydvasser, Arseniy Sheydvasser, Axelle Tougouma
                                </p>
                                <p className="text-[#b0b8c4]/70 text-sm mt-1">
                                    Published in INTEGERS Journal, 2025
                                </p>
                            </div>
                            
                            {/* Personal Story */}
                            <div className="space-y-4 text-[#c0c0c0] leading-relaxed text-lg mb-8">
                                <p>
                                    In my first year at Bates College, I worked as a research assistant with{' '}
                                    <span className="text-[#b0b8c4]">Professor Senia Sheydvasser</span> in the mathematics department. 
                                    I was curious about how mathematical ideas could be explored and tested through computation, 
                                    even though I hadn’t yet taken many advanced classes or done formal research. Joining a 
                                    project focused on abstract combinatorics and number theory—especially the{' '}
                                    <span className="text-[#b0b8c4]">Gibbs conjecture</span> and <span className="text-[#b0b8c4]">Ulam sequences</span>—felt 
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#b0b8c4] text-black font-semibold rounded-lg hover:bg-[#b0b8c4]/80 transition-all hover:scale-105"
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
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#b0b8c4] text-[#b0b8c4] font-semibold rounded-lg hover:bg-[#b0b8c4]/10 transition-all hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View on INTEGERS
                                </a>
                            </div>
                        </div>
                        
                        {/* RAG Research Project */}
                        <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 border border-[#333] mt-8">
                            {/* Project Title */}
                            <div className="mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    RAG-Powered Academic Advising System
                                </h3>
                                <p className="text-[#a0a0a0] text-sm">
                                    Digital and Computational Studies Department, Bates College
                                </p>
                                <p className="text-[#b0b8c4]/70 text-sm mt-1">
                                    Research Assistant — June 2025 – August 2025
                                </p>
                            </div>
                            
                            {/* Personal Story */}
                            <div className="space-y-4 text-[#c0c0c0] leading-relaxed text-lg mb-8">
                                <p>
                                    During the winter of my sophomore year, the <span className="text-[#b0b8c4]">Digital and Computational Studies</span> program 
                                    at Bates was transitioning from a minor into a full major, and I was taking a web development 
                                    course with <span className="text-[#b0b8c4]">Professor Barry Lawson</span> right in the middle of that change. 
                                    The department was suddenly receiving a flood of questions from prospective and current students 
                                    about requirements, pathways, and course planning, and traditional advising methods were no longer enough.
                                </p>
                                
                                <p>
                                    After several brainstorming sessions, we decided to design a system that could answer these 
                                    questions automatically using the department's own materials. That summer, I worked as a 
                                    Research Assistant to build a <span className="text-[#b0b8c4]">Retrieval-Augmented Generation (RAG)</span> pipeline 
                                    that transformed over 5,000 institutional documents into a searchable knowledge base using 
                                    <span className="text-[#b0b8c4]"> vector embeddings</span>. I then deployed the system as a 
                                    <span className="text-[#b0b8c4]"> FastAPI microservice</span> so students could receive accurate, 
                                    context-aware responses.
                                </p>
                                
                            </div>
                            
                            {/* Button */}
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://github.com/PaulAdutwum" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#b0b8c4] text-black font-semibold rounded-lg hover:bg-[#b0b8c4]/80 transition-all hover:scale-105"
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
            <section ref={projectsRef} id="projects" className="py-20 bg-[#050505]">
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
            <section className="py-20 bg-[#050505]">
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
                                    className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] hover:border-[#b0b8c4]/50 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(176, 184, 196, 0.08)' }}
                                >
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg md:text-xl font-bold text-[#b0b8c4]">
                                            {item.organization}
                                        </h3>
                                    </div>
                                    <p className="text-white font-medium mb-2">
                                        {item.title}
                                    </p>
                                    <p className="text-[#888] text-sm">
                                        {item.location}
                                    </p>
                                    {item.image && (
                                        <div className="mt-4 w-16 h-16 rounded-lg overflow-hidden border border-[#b0b8c4]/30">
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
                        
                        <p className="text-center text-[#666] text-sm mt-6 italic">
                            New internships coming soon.
                        </p>
                        
                        <div className="mt-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-center mb-6 gradient-text">
                                Hackathons
                            </h3>
                            <div className="max-w-3xl mx-auto space-y-4">
                                {hackathons.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] hover:border-[#b0b8c4]/50 transition-all duration-300"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-[#b0b8c4]">
                                                    {item.organization}
                                                </h4>
                                                <p className="text-white font-medium">
                                                    {item.title}
                                                </p>
                                            </div>
                                            <div className="text-sm text-[#a0a0a0]">
                                                {item.location}
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
            <section ref={awardsRef} id="awards" className="py-20 bg-[#050505]">
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
                                    className="bg-[#0a0a0a] rounded-xl p-6 border border-[#333] hover:border-[#b0b8c4]/50 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(176, 184, 196, 0.08)' }}
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg md:text-xl font-bold text-[#b0b8c4]">
                                            {award.title}
                                        </h3>
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
            <section ref={communityRef} id="community" className="py-20 bg-[#050505]">
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
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#b0b8c4]/40 to-transparent" />
                            <div className="space-y-6 pl-10">
                                {extracurricularsData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="relative bg-[#0a0a0a] rounded-xl p-6 border border-[#333] hover:border-[#b0b8c4]/50 transition-all duration-300"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(176, 184, 196, 0.08)' }}
                                    >
                                        <div className="absolute -left-10 top-7 w-3 h-3 rounded-full bg-[#b0b8c4] shadow-[0_0_12px_rgba(176,184,196,0.6)]" />
                                        
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-[#b0b8c4]">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs px-2.5 py-1 rounded-full border border-[#b0b8c4]/40 text-[#b0b8c4] bg-[#b0b8c4]/10">
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
                                                    <span className="text-[#b0b8c4] mt-1">•</span>
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
            
            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="py-20 bg-[#050505]">
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
                                className="bg-[#0a0a0a] rounded-2xl p-6 md:p-8 border border-[#333]"
                            >
                                <input type="hidden" name="_subject" value="New contact from Portfolio" />
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-[#a0a0a0] mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            className="w-full bg-[#0a0a0a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#b0b8c4]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#a0a0a0] mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className="w-full bg-[#0a0a0a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#b0b8c4]"
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
                                        className="w-full bg-[#0a0a0a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#b0b8c4]"
                                    />
                                </div>
                                
                                <div className="mt-6">
                                    <label className="block text-sm text-[#a0a0a0] mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Write your message..."
                                        className="w-full bg-[#0a0a0a] text-white rounded-lg border border-[#333] px-4 py-3 focus:outline-none focus:border-[#b0b8c4] resize-none"
                                        required
                                    />
                                </div>
                                
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={contactStatus === 'sending'}
                                        className="bg-[#b0b8c4] text-[#050505] px-8 py-3 rounded-lg font-semibold hover:bg-[#00b8e6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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