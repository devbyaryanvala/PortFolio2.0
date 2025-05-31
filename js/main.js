// Proto/js/main.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Cache ---
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
    const visitorCountElement = document.getElementById('visitor-count');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const chiptuneMusic = document.getElementById('chiptune-music');
    const konamiStatus = document.getElementById('konami-code-status');
    const currentYearSpan = document.getElementById('current-year');

    const CRT_THEME_PATH = 'css/crt-theme.css';
    const FLAT_THEME_PATH = 'css/flat-theme.css';

    // --- Initial Setup ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Dial-Up Simulation ---
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
                    dialUpOverlay.classList.add('hidden'); // Use class for fade effect
                    body.style.overflow = ''; // Restore scroll
                    typeWelcomeMessage();
                    initializeScrollAnimations();
                    // Focus management: move focus to main content after overlay
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
        body.style.overflow = 'hidden'; // Prevent scroll during dialup
    }

    // --- Welcome Message Typing Effect ---
    const welcomeMessageLines = [
        "Hello, World!", "> Initializing portfolio sequence...", "> Loading retro modules...",
        "> System.out.println(\"Welcome to my digital domain!\");", " ", "C:\\Users\\Guest> DIR",
        "  ABOUT.ME        <DIR>", "  PROJECTS.EXE    <DIR>", "  SKILLS.DAT      <DIR>",
        "  RESUME.PDF      <FILE>", "  CONTACT.HTML    <FORM>", " ",
        "> Ready. Navigate using the links above or scroll down."
    ];
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    function typeWelcomeMessage() {
        if (!welcomeTextElement) return;
        welcomeTextElement.innerHTML = ''; // Clear previous content

        function typeLine() {
            if (currentLineIndex < welcomeMessageLines.length) {
                if (currentCharIndex < welcomeMessageLines[currentLineIndex].length) {
                    welcomeTextElement.innerHTML += welcomeMessageLines[currentLineIndex].charAt(currentCharIndex);
                    currentCharIndex++;
                    setTimeout(typeLine, 20 + Math.random() * 20); // Slightly faster typing
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

        // Ensure dial-up is finished before typing
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

    // --- Navigation & Active Link Highlighting ---
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Using smooth scroll polyfill or native behavior
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // For fixed header offset, manual calculation might be needed if scrollIntoView isn't enough
                    // window.scrollTo({ top: targetSection.offsetTop - 70, behavior: 'smooth' });
                    updateActiveNavLink(this);
                }
            });
        });

        window.addEventListener('scroll', handleScrollForNav);
        handleScrollForNav(); // Initial check
    }

    function handleScrollForNav() {
        let currentSectionId = '';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // Adjusted offset for fixed header
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

    // --- Theme Toggler ---
    function setupThemeToggler() {
        if (!themeToggleBtn || !themeLink || !body) return;

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('crt-theme') ? 'flat' : 'crt';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme || 'crt'); // Default to CRT if no theme saved
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

    // --- Project Modal Logic ---
    const projectDetailsData = {
        proj1: {
            title: "Project Showcase - Deep Dive",
            description: "<p>This is <strong>Project Showcase</strong>. It was developed using cutting-edge technology from 1998, including <em>HTML</em> and an Access NON-EXISTING Database.</p><p>Key Features:</p><ul><li>Animations</li><li>Simple UI</li><li>Optimized for 800x600 resolution(NOT REALLY)</li></ul><p><a href='https://project.aryanvala.site' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>View Live (Somwhere in the internet)</a> or <a href='https://github.com/devbyaryanvala/Project_Showcase' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>GitHub Repo</a></p>",
            image: "assets/images/project1-large.png"
        },
        proj2: {
            title: "Old Portfolio - Deep Dive",
            description: "<p>The <strong>OLD Portfolio website</strong> is an ambitious project to bring back the glory days When i first started Coding. Built with HTML and CSS/ThreeJS.</p><p>Currently supports:</p><ul><li>Mobile (partial)</li><li>Desktop PCs With 720p res or higher (Working)</li></ul><p>Challenges included Learning ThreeJS from scratch.</p><p><a href='https://oldportfolio.aryanvala.site' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>Live View (Somwhere in the internet)</a> or <a href='https://github.com/devbyaryanvala/testhome' class='old-hyperlink' target='_blank' rel='noopener noreferrer'>GitHub Repo</a></p>",
            image: "assets/images/project2-large.png"
        }
    };

    function setupProjectModal() {
        if (!projectModal || !modalTitle || !modalBody || !closeModalBtn) return;

        projectItems.forEach(item => {
            item.addEventListener('click', () => openProjectModal(item.dataset.projectId));
            item.addEventListener('keydown', (e) => { // Accessibility: open with Enter/Space
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(item.dataset.projectId);
                }
            });
        });

        closeModalBtn.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (event) => { // Close on backdrop click
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
        document.addEventListener('keydown', (e) => { // Close with Escape key
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    let lastFocusedElement = null; // For accessibility: store last focused element

    function openProjectModal(projectId) {
        const details = projectDetailsData[projectId];
        if (details && projectModal && modalTitle && modalBody) {
            lastFocusedElement = document.activeElement; // Store current focus

            modalTitle.textContent = `${details.title.toUpperCase()}.TXT`;
            let bodyContent = '';
            if (details.image) {
                bodyContent += `<img src="${details.image}" alt="${details.title} screenshot" style="max-width:100%; margin-bottom:15px; border: 1px solid #555; border-radius: 3px;">`;
            }
            bodyContent += details.description;
            modalBody.innerHTML = bodyContent;

            projectModal.style.display = 'flex'; // Use flex for centering
            setTimeout(() => projectModal.classList.add('active'), 10); // Trigger transition
            body.style.overflow = 'hidden'; // Prevent background scroll
            closeModalBtn?.focus(); // Focus on close button for accessibility
        }
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            body.style.overflow = ''; // Restore background scroll
            setTimeout(() => {
                projectModal.style.display = 'none';
                if (lastFocusedElement) {
                    lastFocusedElement.focus(); // Restore focus
                }
            }, 300); // Match CSS animation duration
        }
    }

    // --- Skills Progress Bar Animation ---
    function initializeScrollAnimations() {
        animateSkillsOnScroll();
        // Add other scroll-based animations here if any
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
        }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }); // Trigger a bit earlier

        skillFills.forEach(item => {
            observer.observe(item);
        });
    }

    // --- Contact Form ---
    function setupContactForm() {
        if (!contactForm || !formStatus) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.className = ''; // Reset classes
            formStatus.style.color = body.classList.contains('flat-theme') ? '#007bff' : '#ffff00'; // Theme-aware color

            // Simulate form submission
            setTimeout(() => {
                const name = contactForm.elements.name.value.trim();
                const email = contactForm.elements.email.value.trim();
                const message = contactForm.elements.message.value.trim();

                if (name && email && message) {
                    // Basic email validation (consider a more robust library for production)
                    if (!/^\S+@\S+\.\S+$/.test(email)) {
                        formStatus.textContent = 'ERROR: Please enter a valid email address.';
                        formStatus.classList.add('error'); // For flat theme specific error color
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

    // --- Visitor Counter ---
    function updateVisitorCounter() {
        if (!visitorCountElement) return;
        let currentCount = localStorage.getItem('visitorCountPortfolio'); // Use a more specific key
        if (currentCount === null) {
            currentCount = Math.floor(Math.random() * 500) + 123; // Start from a base
        } else {
            currentCount = parseInt(currentCount) + 1;
        }
        localStorage.setItem('visitorCountPortfolio', currentCount);
        visitorCountElement.textContent = currentCount.toString().padStart(6, '0');
    }

    // --- Music Toggle ---
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
                    isMusicPlaying = !isMusicPlaying; // Toggle back if play failed
                });
            }
            isMusicPlaying = !isMusicPlaying;
        });
        chiptuneMusic.addEventListener('ended', () => { // Handle looping if `loop` attribute isn't enough
            if(isMusicPlaying) chiptuneMusic.play().catch(e => console.warn("Loop playback failed", e));
        });
    }

    // --- Konami Code Easter Egg ---
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
                    konamiCodeIndex = 0; // Reset
                    setTimeout(() => konamiStatus.style.display = 'none', 3000);
                }
            } else {
                konamiCodeIndex = 0; // Reset on wrong key
            }
        });
    }

    function activateKonamiBonusVisuals() {
        console.log("Konami Code Activated! Prepare for awesomeness!");
        body.classList.add('konami-flash-active');
        setTimeout(() => body.classList.remove('konami-flash-active'), 1000); // Duration of 5 flashes * 0.2s
    }

    // --- Initialize ---
    if (dialUpOverlay && !dialUpOverlay.classList.contains('hidden')) {
        simulateDialUp();
    } else {
        // If dial-up is skipped or already done
        dialUpOverlay?.classList.add('hidden'); // Ensure it's hidden
        typeWelcomeMessage();
        initializeScrollAnimations();
    }
    setupNavigation();
    setupThemeToggler();
    setupProjectModal();
    setupContactForm();
    updateVisitorCounter();
    setupMusicToggle();
    setupKonamiCodeListener();

});