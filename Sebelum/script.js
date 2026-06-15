// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .slide-up'
);

animatedElements.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    if (el.classList.contains('slide-up') || el.classList.contains('fade-in-up')) {
        el.style.transform = 'translateY(28px)';
    } else if (el.classList.contains('fade-in-left')) {
        el.style.transform = 'translateX(-28px)';
    } else if (el.classList.contains('fade-in-right')) {
        el.style.transform = 'translateX(28px)';
    }
    
    observer.observe(el);
});

// ===== PROJECT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                
                if (filterValue === 'all') {
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.style.animation = 'fadeIn 0.5s ease-out forwards';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        setTimeout(() => {
                            card.classList.remove('hide');
                            card.style.animation = 'fadeIn 0.5s ease-out forwards';
                        }, 10);
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
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

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'progressAnimation 1.5s ease-out forwards';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.animation = 'none';
    skillObserver.observe(bar);
});

// ===== PARALLAX (removed: caused layout jank on the hero) =====

// ===== CURSOR GLOW (removed: distracting on a minimal layout) =====

// ===== DYNAMIC TYPING EFFECT (Optional for Hero) =====
const typeWriter = (element, texts, speed = 100) => {
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    const type = () => {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentText;
        
        let typeSpeed = speed;
        if (isDeleting) typeSpeed /= 2;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    };
    
    type();
};

// Apply typing effect to the hero role line (home page)
const typedRole = document.querySelector('.hero .typed');
if (typedRole) {
    const roles = ['Front-End Developer', 'UI/UX Designer', 'ML & NLP Explorer', 'Problem Solver'];
    typeWriter(typedRole, roles, 90);
}

// ===== CARD TILT (removed: kept the layout calm and minimal) =====

// ===== SCROLL PROGRESS INDICATOR =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4D86F7 0%, #6AA0FF 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===== LAZY LOAD IMAGES =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Hello Developer!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Feel free to reach out!', 'color: #9ca3af; font-size: 14px;');

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CERTIFICATE MODAL (data-driven) =====
// To add a new certificate:
//   1. On the project card use: class="project-card certificate-card"
//      data-category="design" data-cert-id="YOUR_ID"
//   2. Add a matching entry to certificateData below (same YOUR_ID).
//   3. Put the certificate image in your asset folder and point `image` to it.
const certificateData = {
    techfest: {
        image: 'asset/TechFest.png',
        name: 'TechFest 2025 — UI/UX Design',
        issuer: 'Himpunan Teknik Informatika, BINUS University',
        date: '2025',
        description: 'Awarded for outstanding participation and achievement in TechFest 2025, demonstrating excellence in UI/UX design across web and mobile experiences.',
        skills: ['UI/UX', 'Figma', 'Innovation', 'Problem Solving', 'Team Collaboration']
    },
    study2challenge: {
        image: 'asset/Study2Challenge.png',
        name: 'Study2Challenge Competition',
        issuer: 'BINUS Student Learning Community (BSLC)',                      
        date: '2025',             
        description: 'Certificate from the Study2Challenge competition, earned for designing and building Niat Baik — a web platform for sharing kindness and connecting people who want to help others.',
        skills: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Problem Solving', 'Team Collaboration']
    }
};

const modal = document.getElementById('certificateModal');
const closeBtn = document.getElementById('closeModal');
const certificateCards = document.querySelectorAll('.certificate-card');

const fillCertificate = (id) => {
    const data = certificateData[id];
    if (!data) return;
    const set = (elId, value) => {
        const el = document.getElementById(elId);
        if (el) el.textContent = value;
    };
    const img = document.getElementById('certImage');
    if (img) { img.src = data.image; img.alt = data.name + ' certificate'; }
    set('certName', data.name);
    set('certIssuer', data.issuer);
    set('certDate', data.date);
    set('certDescription', data.description);
    const skillsEl = document.getElementById('certSkills');
    if (skillsEl) {
        skillsEl.innerHTML = '';
        (data.skills || []).forEach(skill => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = skill;
            skillsEl.appendChild(span);
        });
    }
};

const openModal = () => {
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
};

if (certificateCards.length > 0) {
    certificateCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const id = card.getAttribute('data-cert-id');
            if (id) fillCertificate(id);
            openModal();
        });
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeModal();
    }
});