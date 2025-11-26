'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const dialUpOverlay = document.getElementById('dial-up-overlay');
    const dialUpProgressBar = dialUpOverlay ? dialUpOverlay.querySelector('.progress-bar-dialup') : null;
    const dialUpFill = dialUpOverlay ? dialUpOverlay.querySelector('.progress-bar-fill-dialup') : null;
    const dialUpStatus = document.getElementById('dial-up-status');
    const welcomeTextElement = document.getElementById('welcome-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeLink = document.getElementById('theme-link');
    const body = document.body;
    const projectItems = document.querySelectorAll('.project-item');
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalBody = document.getElementById('modal-project-body');
    const closeModalBtn = projectModal ? projectModal.querySelector('.close-modal-btn') : null;
    const skillFills = document.querySelectorAll('.skill-item .progress-fill');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const chiptuneMusic = document.getElementById('chiptune-music');
    const konamiStatus = document.getElementById('konami-code-status');
    const currentYearSpan = document.getElementById('current-year');
    const easterEggToggleBtn = document.getElementById('easter-egg-toggle-btn'); // Easter Egg Button

    // New Easter Egg Modal elements
    const easterEggModal = document.getElementById('easter-egg-modal');
    const modalEasterEggTitle = document.getElementById('modal-easter-egg-title');
    const modalEasterEggBody = document.getElementById('modal-easter-egg-body');
    const closeEasterEggModalBtn = easterEggModal ? easterEggModal.querySelector('.close-modal-btn') : null;


    const CRT_THEME_PATH = 'css/crt-theme.css';
    const FLAT_THEME_PATH = 'css/flat-theme.css';

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    function simulateDialUp() {
        if (!dialUpOverlay || !dialUpFill || !dialUpStatus || !dialUpProgressBar) return;

        let progress = 0;
        const statuses = [
            "Initializing Modem...", "Checking COM1 Port...", "Dialing ISP_Number_555-1995...",
            "ATTEMPT 1...", "Verifying Username/Password...", "Sending encrypted handshake...",
            "Handshaking...", "Receiving server ACK...", "Connected at 56kbps!"
        ];
        let statusIndex = 0;
        dialUpStatus.textContent = statuses[statusIndex];
        dialUpProgressBar.setAttribute('aria-valuenow', progress);

        const interval = setInterval(() => {
            progress += Math.random() * 5 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                dialUpFill.style.width = `${progress}%`;
                dialUpStatus.textContent = statuses[statuses.length - 1];
                dialUpProgressBar.setAttribute('aria-valuenow', progress);
                setTimeout(() => {
                    dialUpOverlay.classList.add('hidden');
                    body.style.overflow = '';
                    typeWelcomeMessage();
                    initializeScrollAnimations();
                    document.getElementById('main-content')?.focus();
                }, 1000);
            } else {
                dialUpFill.style.width = `${progress}%`;
                dialUpProgressBar.setAttribute('aria-valuenow', Math.floor(progress));
                const nextStatusThreshold = (statusIndex + 1) * (100 / statuses.length);
                if (progress >= nextStatusThreshold && statusIndex < statuses.length - 2) {
                    statusIndex++;
                    dialUpStatus.textContent = statuses[statusIndex];
                }
            }
        }, 150);
        body.style.overflow = 'hidden';
    }

    const welcomeMessageLines = [
        "Hello, World!", "> Initializing portfolio sequence...", "> Loading retro modules...",
        "> System.out.println(\"Welcome to my digital domain!\");", " ", "C:\\Users\\Guest> DIR",
        "  ABOUT.ME        <DIR>", "  PROJECTS.EXE    <DIR>", "  SKILLS.DAT      <DIR>",
        "  RESUME.PDF      <FILE>", "  CONTACT.HTML    <FORM>", " ",
        "> Ready. Navigate using the links above or scroll down."
    ];
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    function typeWelcomeMessage() {
        if (!welcomeTextElement) return;
        welcomeTextElement.innerHTML = '';

        function typeLine() {
            if (currentLineIndex < welcomeMessageLines.length) {
                if (currentCharIndex < welcomeMessageLines[currentLineIndex].length) {
                    welcomeTextElement.innerHTML += welcomeMessageLines[currentLineIndex].charAt(currentCharIndex);
                    currentCharIndex++;
                    setTimeout(typeLine, 20 + Math.random() * 20);
                } else {
                    welcomeTextElement.innerHTML += '\n';
                    currentLineIndex++;
                    currentCharIndex = 0;
                    setTimeout(typeLine, 80 + Math.random() * 80);
                }
            } else {
                welcomeTextElement.parentElement.querySelector('.blinking-cursor')?.style.display !== 'none';
            }
        }

        if (dialUpOverlay && !dialUpOverlay.classList.contains('hidden')) {
            const checkDialUpDone = setInterval(() => {
                if (dialUpOverlay.classList.contains('hidden')) {
                    clearInterval(checkDialUpDone);
                    typeLine();
                }
            }, 100);
        } else {
            typeLine();
        }
    }

    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    updateActiveNavLink(this);
                }
            });
        });

        window.addEventListener('scroll', handleScrollForNav);
        handleScrollForNav();
    }

    function handleScrollForNav() {
        let currentSectionId = '';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    function updateActiveNavLink(activeLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function setupThemeToggler() {
        if (!themeToggleBtn || !themeLink || !body) return;

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('crt-theme') ? 'flat' : 'crt';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme || 'crt');
    }

    function applyTheme(themeName) {
        if (themeName === 'flat') {
            themeLink.setAttribute('href', FLAT_THEME_PATH);
            body.classList.remove('crt-theme');
            body.classList.add('flat-theme');
        } else {
            themeLink.setAttribute('href', CRT_THEME_PATH);
            body.classList.remove('flat-theme');
            body.classList.add('crt-theme');
        }
    }

    const projectDetailsData = {
        proj1: {
            title: "Project Showcase - Deep Dive",
            description: "<p>This is <strong>Project Showcase</strong>. It was developed using cutting-edge technology from 1998, including <em>HTML</em> and an Access NON-EXISTING Database.</p><p>Key Features:</p><ul><li>Animations</li><li>Simple UI</li><li>Optimized for 800x600 resolution(NOT REALLY)</li></ul><p><a href='https://project.aryanvala.online' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>View Live (Somwhere in the internet)</a> or <a href='https://github.com/devbyaryanvala/Project_Showcase' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>GitHub Repo</a></p>",
            image: "assets/images/project1-large.png"
        },
        proj2: {
            title: "Old Portfolio - Deep Dive",
            description: "<p>The <strong>OLD Portfolio website</strong> is an ambitious project to bring back the glory days When i first started Coding. Built with HTML and CSS/ThreeJS.</p><p>Currently supports:</p><ul><li>Mobile (partial)</li><li>Desktop PCs With 720p res or higher (Working)</li></ul><p>Challenges included Learning ThreeJS from scratch.</p><p><a href='https://oldportfolio.aryanvala.online' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>Live View (Somwhere in the internet)</a> or <a href='https://github.com/devbyaryanvala/testhome' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>GitHub Repo</a></p>",
            image: "assets/images/project2-large.png"
        }
    };

    function setupProjectModal() {
        if (!projectModal || !modalTitle || !modalBody || !closeModalBtn) return;

        projectItems.forEach(item => {
            item.addEventListener('click', () => openProjectModal(item.dataset.projectId));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(item.dataset.projectId);
                }
            });
        });

        closeModalBtn.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    let lastFocusedElement = null;

    function openProjectModal(projectId) {
        const details = projectDetailsData[projectId];
        if (details && projectModal && modalTitle && modalBody) {
            lastFocusedElement = document.activeElement;

            modalTitle.textContent = `${details.title.toUpperCase()}.TXT`;
            let bodyContent = '';
            if (details.image) {
                bodyContent += `<img src="${details.image}" alt="${details.title} screenshot" style="max-width:100%; margin-bottom:15px; border: 1px solid #555; border-radius: 3px;">`;
            }
            bodyContent += details.description;
            modalBody.innerHTML = bodyContent;

            projectModal.style.display = 'flex';
            setTimeout(() => projectModal.classList.add('active'), 10);
            body.style.overflow = 'hidden';
            closeModalBtn?.focus();
        }
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            body.style.overflow = '';
            setTimeout(() => {
                projectModal.style.display = 'none';
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                }
            }, 300);
        }
    }

    // New: Functions to open and close Easter Egg Modal
    function openEasterEggModal() {
        if (easterEggModal && modalEasterEggTitle && modalEasterEggBody) {
            lastFocusedElement = document.activeElement; // Save focus

            // Content is already static within the HTML, no dynamic population needed here.
            easterEggModal.style.display = 'flex';
            setTimeout(() => easterEggModal.classList.add('active'), 10);
            body.style.overflow = 'hidden'; // Prevent scrolling body
            closeEasterEggModalBtn?.focus(); // Focus close button for accessibility
        }
    }

    function closeEasterEggModal() {
        if (easterEggModal) {
            easterEggModal.classList.remove('active');
            body.style.overflow = ''; // Restore body scrolling
            setTimeout(() => {
                easterEggModal.style.display = 'none';
                if (lastFocusedElement) {
                    lastFocusedElement.focus(); // Restore focus to the last element
                }
            }, 300); // Match CSS transition duration
        }
    }

    function initializeScrollAnimations() {
        animateSkillsOnScroll();
    }

    function animateSkillsOnScroll() {
        if (!skillFills || skillFills.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const skillFill = entry.target;
                    const level = skillFill.dataset.skillLevel;
                    const progressBar = skillFill.closest('.progress-bar-old');

                    skillFill.style.transitionDelay = `${index * 0.1}s`;
                    skillFill.style.width = level;
                    skillFill.textContent = level;
                    if (progressBar) {
                        progressBar.setAttribute('aria-valuenow', parseInt(level));
                    }
                    observer.unobserve(skillFill);
                }
            });
        }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

        skillFills.forEach(item => {
            observer.observe(item);
        });
    }

    function setupContactForm() {
        if (!contactForm || !formStatus) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.className = '';
            formStatus.style.color = body.classList.contains('flat-theme') ? '#007bff' : '#ffff00';

            setTimeout(() => {
                const name = contactForm.elements.name.value.trim();
                const email = contactForm.elements.email.value.trim();
                const message = contactForm.elements.message.value.trim();

                if (name && email && message) {
                    if (!/^\S+@\S+\.\S+$/.test(email)) {
                        formStatus.textContent = 'ERROR: Please enter a valid email address.';
                        formStatus.classList.add('error');
                        formStatus.style.color = '#ff0000';
                        return;
                    }
                    formStatus.textContent = 'Message Sent! Thanks for reaching out, old-timer!';
                    formStatus.style.color = body.classList.contains('flat-theme') ? 'var(--neon-green)' : '#39ff14';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'ERROR: All fields are required. Please try again.';
                    formStatus.classList.add('error');
                    formStatus.style.color = '#ff0000';
                }
            }, 1500);
        });
    }

    let isMusicPlaying = false;
    function setupMusicToggle() {
        if (!musicToggleBtn || !chiptuneMusic) return;

        musicToggleBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                chiptuneMusic.pause();
                musicToggleBtn.title = "Play Music";
                musicToggleBtn.setAttribute('aria-pressed', 'false');
            } else {
                chiptuneMusic.play().then(() => {
                    musicToggleBtn.title = "Pause Music";
                    musicToggleBtn.setAttribute('aria-pressed', 'true');
                }).catch(error => {
                    console.warn("Chiptune playback failed. User interaction might be required first.", error);
                    isMusicPlaying = !isMusicPlaying;
                });
            }
            isMusicPlaying = !isMusicPlaying;
        });

        chiptuneMusic.addEventListener('ended', () => {
            if(isMusicPlaying) chiptuneMusic.play().catch(e => console.warn("Loop playback failed", e));
        });
    }

    const konamiCodeSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodeIndex = 0;

    function setupKonamiCodeListener() {
        if (!konamiStatus) return;
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === konamiCodeSequence[konamiCodeIndex].toLowerCase()) {
                konamiCodeIndex++;
                if (konamiCodeIndex === konamiCodeSequence.length) {
                    konamiStatus.style.display = 'block';
                    activateKonamiBonusVisuals();
                    konamiCodeIndex = 0;
                    setTimeout(() => konamiStatus.style.display = 'none', 3000);
                }
            } else {
                konamiCodeIndex = 0;
            }
        });
    }

    function activateKonamiBonusVisuals() {
        console.log("Konami Code Activated! Prepare for awesomeness!");
        body.classList.add('konami-flash-active');
        setTimeout(() => body.classList.remove('konami-flash-active'), 1000);
    }

    // New: Setup Easter Egg button click listener
    if (easterEggToggleBtn) {
        easterEggToggleBtn.addEventListener('click', () => {
            openEasterEggModal(); // Open the new modal
        });
    }

    // New: Close Easter Egg Modal using its close button or overlay click
    if (closeEasterEggModalBtn) {
        closeEasterEggModalBtn.addEventListener('click', closeEasterEggModal);
    }
    if (easterEggModal) {
        easterEggModal.addEventListener('click', (event) => {
            if (event.target === easterEggModal) {
                closeEasterEggModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && easterEggModal.classList.contains('active')) {
                closeEasterEggModal();
            }
        });
    }


    if (dialUpOverlay && !dialUpOverlay.classList.contains('hidden')) {
        simulateDialUp();
    } else {
        dialUpOverlay?.classList.add('hidden');
        typeWelcomeMessage();
        initializeScrollAnimations();
    }

    setupNavigation();
    setupThemeToggler();
    setupProjectModal();
    setupContactForm();
    setupMusicToggle();
    setupKonamiCodeListener();
});
