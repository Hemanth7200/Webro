document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    lucide.createIcons();

    // Sticky Header & Active Link Tracking
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Reveal Animations on Scroll with Staggering
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay if it's part of a grid
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('portfolio-grid') || parent.classList.contains('pricing-grid-4'))) {
                    const index = Array.from(parent.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Portfolio Tabs Filtering (Simple Visual Placeholder)
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Add a "blink" effect to the grid when filtering
            const grid = document.querySelector('.portfolio-grid');
            grid.style.opacity = '0';
            setTimeout(() => {
                grid.style.opacity = '1';
            }, 300);
        });
    });

    // FAQ Accordion (if exists)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            if (nav.classList.contains('mobile-active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
                nav.style.padding = '30px';
                nav.style.borderBottom = '1px solid #333';
                
                const ul = nav.querySelector('ul');
                ul.style.flexDirection = 'column';
                ul.style.gap = '20px';
            } else {
                nav.style.display = 'none';
            }
        });
    }

    // Handle Form Submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<span><i data-lucide="loader-2" class="spin"></i> Sending...</span>';
            lucide.createIcons();
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<span><i data-lucide="check-circle"></i> Sent!</span>';
                lucide.createIcons();
                btn.style.background = '#ffffff';
                btn.style.color = '#000000';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1800);
        });
    }

    // Parallax Effect for Video Overlay
    window.addEventListener('scroll', () => {
        const overlay = document.querySelector('.video-overlay');
        const scroll = window.scrollY;
        if (overlay) {
            overlay.style.opacity = 0.4 + (scroll / 2000);
        }
    });

    // Add CSS for the spin animation if missing
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .spin {
            animation: spin 1s linear infinite;
            display: inline-block;
        }
        .nav.mobile-active {
            display: block !important;
            animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
