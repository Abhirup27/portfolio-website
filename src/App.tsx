import {type CSSProperties, useEffect, useRef, useState} from 'react';
import styles from './App.module.css';
import Sidebar from './Sidebar';
import MobileSidebar from "./MobileSidebar.tsx";

interface Project {
    id: string;
    name: string;
    status: 'completed' | 'planning' | 'progress';
    description?: string;
    tags?: string[];
    deploymentType?: 'vercel' | 'chrome-extension' | null;
    githubUrl?: string;
    liveUrl?: string;
    chromeStoreUrl?: string;
}

interface TechStackItem {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    description?: string;
}

interface TechStackData {
    frontend: TechStackItem[];
    backend: TechStackItem[];
    database: TechStackItem[];
}

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [primaryColor, setPrimaryColor] = useState('#00ff88');
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [fontSize, setFontSize] = useState(16); // Base font size in pixels
    const [showTechStack, setShowTechStack] = useState(false);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const colors = ['#00ff88', '#ffd700', '#ff1464', '#00bfff', '#8a2be2'];
    const [colorIndex, setColorIndex] = useState(0);


    const cycleColor = () => {
        const nextIndex = (colorIndex + 1) % colors.length;
        setColorIndex(nextIndex);
        setPrimaryColor(colors[nextIndex]);
    };
    const projects: Project[] = [
        {
            id: '1',
            name: 'Shopify Shop Management',
            status: 'completed',
            description: 'Shopify app made using TypeScript, NestJS, Redis and some more technologies.',
            tags: ['Shopify', 'GraphQL','NodeJS','TypeScript', 'NestJS', 'MVC', 'Redis', 'BullMQ', 'PostgresSQL', 'JWT'],
            deploymentType: null,
            githubUrl: 'https://github.com/Abhirup27/shopify_app',
        },
        {
            id: '2',
            name: 'Pomodoro Timer Chrome Extension',
            status: 'completed',
            description: 'A productivity app made using React and TypeScript, deployed as a chrome extension',
            tags: ['React','Vite', 'TypeScript', 'Chrome Extension', 'Vercel'],
            deploymentType: 'chrome-extension',
            githubUrl: 'https://github.com/Abhirup27/pomodoro-react-app',
            chromeStoreUrl: 'https://chromewebstore.google.com/detail/tomato-timer/ncllalegdjcfkajbppdfbiejifkiddbl'
        },
        {
            id: '3',
            name: 'AI assisted Note Taking',
            status: 'progress',
            description: 'A full stack app which aims to leverage LLM APIs to assist people making effective notes, remind them of the tasks they have to do, and help them in their learning. Collaborative note making is also a feature I plan to add using web sockets.',
            tags: ['OpenRouter API', 'TypeScript','React', 'MVC', 'Web Sockets' ],
            deploymentType: null,
            githubUrl: 'https://github.com/Abhirup27/note-taking-app'
        },
        {
            id: '7',
            name: 'Golf Tournament Web App',
            status: 'completed',
            description: 'A free gig in which I had to make a web app which was used in a tournament of 72 players. The admin sets all the necessary details for the upcoming tournament and players can register, input their rating. During the match the registered players can login start entering their strokes. A live scoreboard is also shown with the points. The admin page has all the controls.',
            tags: ['JavaScript', 'EJS', 'Tailwind CSS', 'ngrok'],
            deploymentType: null,
            githubUrl: 'https://github.com/Abhirup27/golf-tournament-app'
        }
    ];

    const techStackData: TechStackData = {
        frontend: [
            { name: 'React', level: 'beginner', description: 'Building interactive UIs with hooks and state management' },
            { name: 'TypeScript', level: 'intermediate', description: 'Type-safe JavaScript development' },
            { name: 'JavaScript', level: 'advanced', description: 'Modern ES6+ features and DOM manipulation' },
            { name: 'HTML5', level: 'intermediate', description: 'Semantic markup and accessibility' },
            { name: 'CSS3', level: 'intermediate', description: 'Flexbox, Grid, animations, and responsive design' },
            { name: 'Tailwind CSS', level: 'beginner', description: 'Utility-first CSS framework' },
            { name: 'Vite', level: 'beginner', description: 'Modern build tool and development server' },
        ],
        backend: [
            { name: 'Node.js', level: 'intermediate', description: 'Server-side JavaScript runtime' },
            { name: 'TypeScript', level: 'intermediate', description: 'Type-safe JavaScript development' },
            { name: 'NestJS', level: 'intermediate', description: 'Progressive Node.js framework for scalable applications' },
            { name: 'Express.js', level: 'intermediate', description: 'Fast, unopinionated web framework' },
            { name: 'GraphQL', level: 'beginner', description: 'Query language for APIs' },
            { name: 'REST APIs', level: 'intermediate', description: 'RESTful service architecture' },
            { name: 'Redis', level: 'beginner', description: 'In-memory data structure store' },
            { name: 'BullMQ', level: 'beginner', description: 'Queue management system' },
        ],
        database: [
            { name: 'PostgreSQL', level: 'intermediate', description: 'Relational database management system' },
            { name: 'MongoDB', level: 'beginner', description: 'NoSQL document database' },
            { name: 'Redis', level: 'beginner', description: 'In-memory key-value store' },
            { name: 'SQL', level: 'intermediate', description: 'Structured Query Language' },
        ]
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProjectClick = (id: string) => {
        setExpandedProject(expandedProject === id ? null : id);
    };

    const handleColorChange = (color: string) => {
        setPrimaryColor(color);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleTechStack = () => {
        setShowTechStack(!showTechStack);
    };

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(20, prev + 1));
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(12, prev - 1));
    };

    // 6. Improved link handling for mobile
    const handleLinkClick = (url: string, event?: React.MouseEvent | React.TouchEvent) => {
        if (event) {
            event.stopPropagation();
        }

        // Better mobile handling
        if (isMobile) {
            // Use location.href for better mobile compatibility
            window.location.href = url;
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            //const landscape = window.innerHeight < window.innerWidth;
            setIsMobile(mobile);
           // setIsLandscape(landscape);

            // Adjust sidebar visibility based on screen size
            if (mobile) {
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('orientationchange', () => {
            setTimeout(checkMobile, 100); // Delay to ensure dimensions are updated
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('orientationchange', checkMobile);
        };
    }, []);

    useEffect(() => {
        const originalText = 'Abhirup Bhattacharyya';
        let i = 0;

        // Faster typing on mobile for better UX
        const typingSpeed = isMobile ? 50 : 100;

        const typeWriter = () => {
            if (i < originalText.length) {
                setHeaderText(originalText.substring(0, i + 1));
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        };

        const timer = setTimeout(typeWriter, 500);
        return () => clearTimeout(timer);
    }, [isMobile]);
    // Set base font size for the document
    useEffect(() => {
        const baseFontSize = isMobile ? 14 : 16;
        document.documentElement.style.fontSize = `${Math.max(baseFontSize, fontSize)}px`;
    }, [fontSize, isMobile]);

    // Hide sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate CSS variables based on primary color
    // const cssVariables = {
    //     '--primary-color': primaryColor,
    //     '--primary-color-rgb': hexToRgb(primaryColor),
    //     '--primary-color-transparent': `${primaryColor}40`,
    //     '--primary-color-darker': darkenColor(primaryColor, 20),
    //     '--grid-color': `${primaryColor}15`,
    //     '--glow-color': `${primaryColor}80`,
    // } as React.CSSProperties;

    // Icon components
    const GitHubIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    );

    const VercelIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L24 24H0L12 0z"/>
        </svg>
    );

    const ChromeExtensionIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 8.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5zm7 7c0 1.93-1.57 3.5-3.5 3.5S8.5 17.43 8.5 15.5 10.07 12 12 12s3.5 1.57 3.5 3.5z"/>
        </svg>
    );

    const renderTechStackSection = (title: string, items: TechStackItem[]) => (
        <div className={styles.techStackSection}>
            <h3 className={styles.techStackSectionTitle}>{title}</h3>
            <div className={styles.techStackGrid}>
                {items.map((item, index) => (
                    <div key={index} className={styles.techStackItem}>
                        <div className={styles.techStackItemHeader}>
                            <span className={styles.techStackItemName}>{item.name}</span>
                            <span className={`${styles.techStackItemLevel} ${styles['level-' + item.level]}`}>
                                {item.level}
                            </span>
                        </div>
                        {item.description && (
                            <p className={styles.techStackItemDescription}>{item.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
    const renderProjectItem = (project: Project) => (
        <div
            key={project.id}
            className={`${styles.projectItem} ${expandedProject === project.id ? styles.expanded : ''}`}
            onClick={() => handleProjectClick(project.id)}
            //onTouchStart={(e) => handleProjectTouch(project.id, e)}
            // Add mobile-specific attributes
            role="button"
            tabIndex={0}
            aria-expanded={expandedProject === project.id}
        >
            <div className={styles.projectInfo}>
                <span className={styles.projectName}>
                    {project.name}
                </span>
                <span className={`${styles.projectStatus} ${styles['status-' + project.status]}`}>
                    {project.status === 'completed' && 'Completed'}
                    {project.status === 'planning' && 'Planning'}
                    {project.status === 'progress' && 'In Progress'}
                </span>
            </div>

            <div className={styles.projectActions}>
                {/* GitHub Link */}
                {project.githubUrl && (
                    <button
                        className={styles.actionBtn}
                        onClick={(e) => handleLinkClick(project!.githubUrl!, e)}
                        onTouchStart={(e) => e.stopPropagation()}
                        title="View on GitHub"
                        aria-label="View on GitHub"
                    >
                        <GitHubIcon />
                    </button>
                )}

                {/* Deployment buttons with improved mobile handling */}
                {project.deploymentType === 'vercel' && project.liveUrl && (
                    <button
                        className={styles.actionBtn}
                        onClick={(e) => handleLinkClick(project.liveUrl!, e)}
                        onTouchStart={(e) => e.stopPropagation()}
                        title="View Live Site"
                        aria-label="View Live Site"
                    >
                        <VercelIcon />
                    </button>
                )}

                {project.deploymentType === 'chrome-extension' && project.chromeStoreUrl && (
                    <button
                        className={styles.actionBtn}
                        onClick={(e) => handleLinkClick(project.chromeStoreUrl!, e)}
                        onTouchStart={(e) => e.stopPropagation()}
                        title="View in Chrome Store"
                        aria-label="View in Chrome Store"
                    >
                        <ChromeExtensionIcon />
                    </button>
                )}
            </div>

            {/* Mobile-optimized expanded content */}
            {expandedProject === project.id && project.description && (
                <div className={styles.projectDescription}>
                    <p>{project.description}</p>
                    <div className={styles.projectTags}>
                        {project.tags?.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className={styles.projectLinks}>
                        {project.deploymentType === 'vercel' && project.liveUrl && (
                            <button
                                className={styles.deploymentButton}
                                onClick={(e) => handleLinkClick(project.liveUrl!, e)}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                🚀 Deployed on Vercel
                            </button>
                        )}
                        {project.deploymentType === 'chrome-extension' && project.chromeStoreUrl && (
                            <button
                                className={styles.deploymentButton}
                                onClick={(e) => handleLinkClick(project.chromeStoreUrl!, e)}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                🔌 View Chrome Extension
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // 8. Add mobile-specific header description
    const getHeaderDescription = () => {
        if (isMobile) {
            return (
                <p>
                    <span className={styles.highlight}>MCA graduate</span> with expertise in web development,
                    networks, and operating systems. Passionate about building
                    <span className={styles.highlight}> robust web applications</span> and solving
                    complex technical challenges.
                </p>
            );
        }
        return (
            <p>
                Graduated with an <span className={styles.highlight}>MCA postgraduate degree</span>, with strong expertise in web application development, computer networks, and operating systems.
                Experienced in building robust, user-friendly web applications through <span className={styles.highlight}>hands-on project development.</span>
                Passionate about leveraging technical knowledge to solve complex challenges in web development and game development.
                Previously contributed to an open-source community game project on GitHub.
            </p>
        );
    };

    const getMobileCSSVariables = () => {
        const baseVariables = {
            '--primary-color': primaryColor,
            '--primary-color-rgb': hexToRgb(primaryColor),
            '--primary-color-transparent': `${primaryColor}40`,
            '--primary-color-darker': darkenColor(primaryColor, 20),
            '--grid-color': `${primaryColor}15`,
            '--glow-color': `${primaryColor}80`,
        };

        if (isMobile) {
            return {
                ...baseVariables,
                '--mobile-padding': '0.5rem',
                '--mobile-font-size': '0.9rem',
                '--mobile-header-size': '1.8rem',
            } as CSSProperties;
        }

        return baseVariables as CSSProperties;
    };
    return (
        <div className={styles.container} style={getMobileCSSVariables()}>
            {/* Sidebar or Toggle Button */}
            {isSidebarVisible ? !isMobile ? (
                <Sidebar
                    onColorChange={handleColorChange}
                    onToggleSidebar={toggleSidebar}
                    onFontIncrease={increaseFontSize}
                    onFontDecrease={decreaseFontSize}
                />
            ): <MobileSidebar activeChannel={'activeChannel'} onChannelClick={()=> {}} onColorChange={cycleColor} onToggleNav={toggleSidebar} />
                : !isMobile ? (
                <button
                    className={styles.sidebarToggle}
                    onClick={toggleSidebar}
                    aria-label="Open sidebar"
                >
                    ☰
                </button>
            ) : (
                    <button
                        className={styles.mobileNavToggle}
                        onClick={toggleSidebar}
                        aria-label="Open sidebar"
                    >
                        ☰
                    </button>
                ) }

            {/* Background Effects */}
            <div className={styles.terminalBg}></div>
            <div className={styles.terminalLines}></div>
            <div className={styles.vignetteOverlay}></div>
            <div className={styles.crtEffect}></div>

            {/* Main Content */}
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                {!showTechStack ? (
                    <>
                        <header className={styles.header}>
                            <h1 ref={headerRef} aria-hidden="true" className={styles.placeholder}>
                                Abhirup Bhattacharyya
                            </h1>

                            <h1 ref={headerRef}>{headerText}</h1>

                            {getHeaderDescription()}

                            <div className={styles.buttons}>
                                <button className={styles.btn} onClick={toggleTechStack}>
                                    View Tech Stack
                                </button>
                            </div>
                        </header>

                        <section className={styles.projectSection}>
                            <div className={styles.projectHeader}>
                                <h2 className={styles.projectTitle}>Project Index</h2>
                                <div className={styles.projectStats}>
                                    <div className={styles.stat}>
                                        <div className={styles.statusIndicator}></div>
                                        <span>System Active</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span>$ /root/project-1-cat project.manifest.md</span>
                                    </div>
                                    <button className={styles.btn} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        New Project
                                    </button>
                                </div>
                            </div>

                            <div className={styles.projectFilters}>
                                <div className={styles.filterGroup}>
                                    <span>PROJECT STATUS</span>
                                    <div className={styles.statusFilters}>
                                        <button className={styles.btn} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                            3 Completed
                                        </button>
                                        <button className={styles.btn} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                            1 In Progress
                                        </button>
                                        <button className={styles.btn} style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                            1 Planning
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.filterGroup}>
                                    <input
                                        type="text"
                                        className={styles.searchBox}
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className={styles.btn} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        Filters
                                    </button>
                                </div>
                            </div>

                            <div className={styles.projectGrid}>
                                {filteredProjects.map(value => renderProjectItem(value))}
                            </div>
                        </section>
                    </>
                ) :  (
                    <div className={styles.techStackContainer}>
                        <header className={styles.header}>
                            <h1 ref={headerRef} aria-hidden="true" className={styles.placeholder}>
                                Abhirup Bhattacharyya
                            </h1>
                            <h1 ref={headerRef}>{headerText}</h1>

                            {getHeaderDescription()}

                            <div className={styles.buttons}>
                                <button className={styles.btn} onClick={toggleTechStack}>
                                    View Projects
                                </button>
                            </div>
                        </header>

                        <section className={styles.techStackContent}>
                            {renderTechStackSection('Frontend', techStackData.frontend)}
                            {renderTechStackSection('Backend', techStackData.backend)}
                            {renderTechStackSection('Database', techStackData.database)}
                        </section>
                    </div>
                )}

                <footer className={styles.footer}>
                    <p>&copy; 2025 Abhirup Bhattacharyya.</p>
                    <div className={styles.socialLinks}>
                        <a href="https://github.com/Abhirup27/" className={styles.socialLink}>GitHub</a>
                        <a href="https://www.linkedin.com/in/abroop/" className={styles.socialLink}>LinkedIn</a>
                        <a href="https://x.com/ab27roop" className={styles.socialLink}>Twitter</a>
                        <a href="#" className={styles.socialLink}>Discord</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

// Helper functions for color manipulation
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '0, 255, 136'; // Default to green
}

function darkenColor(hex: string, percent: number): string {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default App;