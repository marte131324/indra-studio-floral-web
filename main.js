document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Ensure menu icon is dark when opened if not scrolled
        if(!navbar.classList.contains('scrolled') && hamburger.classList.contains('active')){
            Array.from(hamburger.children).forEach(bar => bar.style.backgroundColor = 'var(--text-primary)');
        } else if (!navbar.classList.contains('scrolled')) {
            Array.from(hamburger.children).forEach(bar => bar.style.backgroundColor = 'var(--bg-white)');
        }
    });

    navLinks.forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (!navbar.classList.contains('scrolled')) {
            Array.from(hamburger.children).forEach(bar => bar.style.backgroundColor = 'var(--bg-white)');
        }
    }));

    // 3. Parallax Hero Effect
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroBg && scrollPosition < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up, .fade-in');
    
    const obvOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
                // If the element is a container for fade-up-items (like hero)
                const children = entry.target.querySelectorAll('.fade-up-item');
                if(children.length > 0) {
                    children.forEach(child => child.classList.add('visible'));
                }
            }
        });
    }, obvOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Fire hero animations immediately
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('visible');
        document.querySelectorAll('.hero-content .fade-up-item').forEach(el => el.classList.add('visible'));
    }, 100);

    // 5. Contact Form WhatsApp Redirect
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value; // Optional to send to WP, but good for validation
            const topic = document.getElementById('topic').value;
            const message = document.getElementById('message').value;

            const text = `¡Hola Indra Studio Floral! Vengo de su página Web. 🌿\n\n*Nombre:* ${name}\n*Interés:* ${topic}\n*Mensaje:* ${message}\n*Contacto:* ${email}`;
            const waUrl = `https://wa.me/522282393575?text=${encodeURIComponent(text)}`;
            
            window.open(waUrl, '_blank');
            contactForm.reset();
        });
    }
});
