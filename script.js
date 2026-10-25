// Initialize when DOM content is loaded
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        const menuSpans = menuToggle.querySelectorAll('span');
        const setMenuOpen = (isOpen) => {
            navMenu.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            menuSpans[1].style.opacity = isOpen ? '0' : '1';
            menuSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenuOpen(!navMenu.classList.contains('open'));
        });
        
        // Close menu on navigation click
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuOpen(false);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });
        
        // Close menu if clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                setMenuOpen(false);
            }
        });
    }
    
    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    
    // Trigger once on load then on scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // 4. Active Navigation Links on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // offset header
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 5. Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = '<span class="logo-dot"></span> Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    submitBtn.innerHTML = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)';
                    submitBtn.style.color = '#fff';
                    contactForm.reset();
                } else {
                    submitBtn.innerHTML = 'Failed to Send ✗';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                    submitBtn.style.color = '#fff';
                }
            } catch {
                submitBtn.innerHTML = 'Failed to Send ✗';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                submitBtn.style.color = '#fff';
            }

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }
});
