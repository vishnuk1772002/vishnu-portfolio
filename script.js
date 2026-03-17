document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const header = document.getElementById('header');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                mobileMenuBtn.innerHTML = '<i class="ri-close-line"></i>';
                header.classList.add('bg-bg-dark');
            } else {
                // Close menu
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
                if (window.scrollY < 50) {
                    header.classList.remove('bg-bg-dark');
                }
            }
        });

        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
            });
        });
    }

    /* ==========================================================================
       2. Sticky Header Effect & Smooth Scroll
       ========================================================================== */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'bg-bg-dark/95');
            header.classList.remove('bg-bg-dark/80');
        } else {
            header.classList.remove('scrolled', 'bg-bg-dark/95');
            header.classList.add('bg-bg-dark/80');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    /* ==========================================================================
       3. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       4. Contact Form Mock Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
            btn.disabled = true;

            // Mock API Call
            setTimeout(() => {
                formStatus.classList.remove('hidden');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    /* ==========================================================================
       5. Dynamic Year in Footer
       ========================================================================== */
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
