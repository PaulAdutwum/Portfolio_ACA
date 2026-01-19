// Paul Adutwum Portfolio - Main JavaScript

// Global variables
let isScrolled = false;
let activeSection = 'hero';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeScrollEffects();
    initializeScrollIndicator();
    initializeUlamVisualization();
    initializeScrollAnimations();
    
    // Set initial active nav link
    updateActiveNavLink('hero');
});

// Typewriter effect for hero name
function initializeTypewriter() {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-name', {
            strings: ['Paul Adutwum'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: false,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                // Add a subtle glow effect when typing is complete
                document.getElementById('typed-name').style.textShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            }
        });
    }
}

// Scroll effects and navigation
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Update navbar background
        if (scrollY > 50) {
            navbar.classList.add('nav-blur');
            isScrolled = true;
        } else {
            navbar.classList.remove('nav-blur');
            isScrolled = false;
        }
        
        // Update active section
        let currentSection = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        if (currentSection !== activeSection) {
            activeSection = currentSection;
            updateActiveNavLink(activeSection);
        }
    });
}

// Scroll indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.transform = `scaleX(${progress / 100})`;
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav link
        updateActiveNavLink(sectionId);
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the current section's nav link
    const activeLink = document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Ulam sequence visualization using p5.js
function initializeUlamVisualization() {
    if (typeof p5 !== 'undefined') {
        const sketch = (p) => {
            let angle = 0;
            let particles = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(400, 300);
                canvas.parent('ulamVisualization');
                
                // Create particles for Ulam sequence visualization
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        angle: i * 0.1,
                        radius: i * 3,
                        size: p.random(2, 6),
                        speed: p.random(0.01, 0.03),
                        hue: (i * 7) % 360
                    });
                }
            };
            
            p.draw = () => {
                p.background(10, 10, 10, 20);
                p.translate(p.width/2, p.height/2);
                
                // Draw Ulam sequence visualization
                particles.forEach((particle, i) => {
                    const x = p.cos(particle.angle + angle) * particle.radius;
                    const y = p.sin(particle.angle + angle) * particle.radius;
                    
                    // Color based on position in sequence
                    p.colorMode(p.HSB);
                    p.fill(particle.hue, 80, 90, 150);
                    p.noStroke();
                    p.ellipse(x, y, particle.size, particle.size);
                    
                    particle.angle += particle.speed;
                });
                
                angle += 0.005;
            };
        };
        
        new p5(sketch);
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Gallery filtering
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update filter button states
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter gallery items
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'All' || itemCategory === category) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            // Animate in
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);
        }
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Gallery modal functions
function openGalleryModal(imageId) {
    const galleryData = {
        gallery1: {
            src: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/eb0b8b95b734dda727238ef1b12e8b728e195267.jpg',
            title: 'Ghana Heritage',
            description: 'Traditional Ghanaian architecture and cultural elements'
        },
        gallery2: {
            src: 'gallery-hero.png',
            title: 'Academic Journey',
            description: 'From Ghana to Maine: Pursuing excellence in STEM'
        },
        gallery3: {
            src: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/44a2b20af9464daee0df22745e55f2f4b56d4a4f.jpg',
            title: 'Mathematical Research',
            description: 'Exploring computational number theory and Ulam sequences'
        },
        gallery4: {
            src: 'https://kimi-web-img.moonshot.cn/img/wpvip.edutopia.org/c2645986eb417d79f9262930ec8f6eee1427d302.jpg',
            title: 'Tech Education',
            description: 'Empowering youth through technology education'
        },
        gallery5: {
            src: 'community-visual.png',
            title: 'Bonner Fellowship',
            description: 'Community leadership and youth mentoring'
        },
        gallery6: {
            src: 'https://kimi-web-img.moonshot.cn/img/www.collidu.com/49f2544e7c3e6ef4b9e74876d9a400c907ff5aa4.png',
            title: 'Academic Presentations',
            description: 'Sharing research findings with the academic community'
        }
    };
    
    const data = galleryData[imageId];
    if (data) {
        document.getElementById('galleryModalImage').src = data.src;
        document.getElementById('galleryModalTitle').textContent = data.title;
        document.getElementById('galleryModalDescription').textContent = data.description;
        openModal('galleryModal');
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('[id$="Modal"]');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('[id$="Modal"]:not(.hidden)');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for filter buttons
const style = document.createElement('style');
style.textContent = `
    .nav-link {
        position: relative;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        transition: color 0.3s ease;
    }
    
    .nav-link:hover,
    .nav-link.active {
        color: var(--accent-blue);
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--accent-blue);
    }
    
    .mobile-nav-link {
        display: block;
        width: 100%;
        text-align: left;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        color: var(--text-secondary);
        transition: all 0.3s ease;
    }
    
    .mobile-nav-link:hover,
    .mobile-nav-link.active {
        background-color: var(--bg-secondary);
        color: var(--accent-blue);
    }
    
    .filter-btn {
        background-color: var(--bg-secondary);
        color: var(--text-secondary);
        border: 1px solid transparent;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        background-color: #333;
        color: var(--accent-blue);
    }
    
    .filter-btn.active {
        background-color: var(--accent-blue);
        color: var(--bg-primary);
    }
    
    .tech-badge {
        background-color: rgba(0, 212, 255, 0.1);
        color: var(--accent-blue);
        border: 1px solid rgba(0, 212, 255, 0.3);
    }
`;
document.head.appendChild(style);