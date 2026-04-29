window.addEventListener("load", () => {
  setTimeout(() => {
    const introEl = document.getElementById("intro");
    if (introEl) introEl.style.display = "none";
    document.body.style.overflow = "auto";
  }, 5500);
});

document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling while intro is playing
    document.body.style.overflow = "hidden";
    
    // Initialize Lucide Icons
    lucide.createIcons();

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle (Basic implementation)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        
        const ul = nav.querySelector('ul');
        ul.style.flexDirection = 'column';
        ul.style.gap = '20px';
    });

    // Handle Form Submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
            lucide.createIcons();
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check-circle-2"></i> Message Sent!';
                lucide.createIcons();
                btn.style.background = '#10B981';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // Interactive 3D Card Hover Effect for Hero Section
    const heroCard = document.getElementById('hero-card');
    if (heroCard) {
        document.addEventListener('mousemove', (e) => {
            // Only apply if we are near the top of the page
            if (window.scrollY > window.innerHeight) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            heroCard.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }
});
