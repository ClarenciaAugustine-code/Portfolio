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

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .slide-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    if (el.classList.contains('slide-up') || el.classList.contains('fade-in-up'))
        el.style.transform = 'translateY(28px)';
    else if (el.classList.contains('fade-in-left'))
        el.style.transform = 'translateX(-28px)';
    else if (el.classList.contains('fade-in-right'))
        el.style.transform = 'translateX(28px)';
    observer.observe(el);
});

// ===== PROJECT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const val = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                card.style.animation = 'none';
                const match = val === 'all' || card.getAttribute('data-category') === val;
                setTimeout(() => {
                    card.classList.toggle('hide', !match);
                    if (match) card.style.animation = 'fadeIn 0.5s ease-out forwards';
                }, 10);
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== SKILL BAR ANIMATION =====
const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'progressAnimation 1.5s ease-out forwards';
            skillObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.animation = 'none';
    skillObs.observe(bar);
});

// ===== TYPEWRITER (home page only) =====
const typedEl = document.querySelector('.hero .typed');
if (typedEl) {
    const roles = ['Front-End Developer', 'UI/UX Designer', 'ML & NLP Explorer', 'Problem Solver'];
    let ti = 0, ci = 0, deleting = false;
    const type = () => {
        const full = roles[ti];
        typedEl.textContent = deleting ? full.substring(0, --ci) : full.substring(0, ++ci);
        let delay = deleting ? 50 : 90;
        if (!deleting && ci === full.length) { delay = 2000; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % roles.length; delay = 500; }
        setTimeout(type, delay);
    };
    type();
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position:fixed; top:0; left:0; width:0%; height:3px;
    background:linear-gradient(90deg,#4D86F7,#6AA0FF);
    z-index:10000; transition:width 0.1s ease; pointer-events:none;
`;
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    progressBar.style.width = ((window.pageYOffset / (h.scrollHeight - h.clientHeight)) * 100) + '%';
});

// ===== LAZY LOAD IMAGES =====
document.querySelectorAll('img[data-src]').forEach(img => {
    new IntersectionObserver(([e], obs) => {
        if (e.isIntersecting) { img.src = img.dataset.src; img.removeAttribute('data-src'); obs.unobserve(img); }
    }).observe(img);
});

// ===== PAGE FADE IN =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// ===== CERTIFICATE MODAL =====
const certificateData = {
    techfest: {
        image: 'Asset/TechFest.png',
        name: 'TechFest 2025 — UI/UX Design',
        issuer: 'Himpunan Teknik Informatika, BINUS University',
        date: '2025',
        description: 'Awarded for outstanding participation and achievement in TechFest 2025, demonstrating excellence in UI/UX design across web and mobile experiences.',
        skills: ['UI/UX', 'Figma', 'Innovation', 'Problem Solving', 'Team Collaboration']
    },
    study2challenge: {
        image: 'Asset/Study2Challenge.png',
        name: 'Study2Challenge Competition',
        issuer: 'BINUS Student Learning Community (BSLC)',
        date: '2025',
        description: 'Certificate from the Study2Challenge competition, earned for designing and building Niat Baik — a web platform for sharing kindness and connecting people who want to help others.',
        skills: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Problem Solving', 'Team Collaboration']
    }
};

const modal    = document.getElementById('certificateModal');
const closeBtn = document.getElementById('closeModal');

const fillCert = (id) => {
    const d = certificateData[id]; if (!d) return;
    const s = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };
    const img = document.getElementById('certImage');
    if (img) { img.src = d.image; img.alt = d.name; }
    s('certName', d.name); s('certIssuer', d.issuer);
    s('certDate', d.date); s('certDescription', d.description);
    const sk = document.getElementById('certSkills');
    if (sk) {
        sk.innerHTML = '';
        (d.skills || []).forEach(skill => {
            const sp = document.createElement('span');
            sp.className = 'tag'; sp.textContent = skill;
            sk.appendChild(sp);
        });
    }
};

const openModal  = () => { if (!modal) return; modal.classList.add('show');    document.body.style.overflow = 'hidden'; };
const closeModal = () => { if (!modal) return; modal.classList.remove('show'); document.body.style.overflow = 'auto'; };

document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const id = card.getAttribute('data-cert-id');
        if (id) fillCert(id);
        openModal();
    });
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) closeModal();
});

// ===== CAROUSEL (about page) =====
(function () {
    const track     = document.getElementById('carouselTrack');
    const dotsEl    = document.getElementById('carouselDots');
    const prevBtn   = document.getElementById('prevBtn');
    const nextBtn   = document.getElementById('nextBtn');
    const currentEl = document.getElementById('currentSlide');
    const totalEl   = document.getElementById('totalSlides');
    if (!track || !dotsEl) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const total  = slides.length;
    let current = 0, autoTimer = null;
    if (totalEl) totalEl.textContent = total;

    dotsEl.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
    });

    const goTo = (idx) => {
        current = ((idx % total) + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        if (currentEl) currentEl.textContent = current + 1;
        dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        resetAuto();
    };
    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    const startAuto = () => { autoTimer = setInterval(next, 4000); };
    const resetAuto = () => { clearInterval(autoTimer); startAuto(); };
    startAuto();

    const container = track.closest('.carousel-track-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoTimer));
        container.addEventListener('mouseleave', startAuto);
    }

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });
})();

// ===== BACKGROUND MUSIC =====
// Trik: simpan timestamp di localStorage. Saat halaman baru load,
// langsung set currentTime ke posisi terakhir + estimasi waktu yang berlalu.
// Kalau user sudah pernah unmute → langsung unmute otomatis.
(function () {
    const MUSIC_SRC   = 'LANY - XXL (Official Music Video).mp3';
    const KEY_MUTED   = 'music_muted';
    const KEY_TIME    = 'music_time';
    const KEY_TS      = 'music_timestamp'; // waktu sistem saat posisi disimpan
    const DURATION    = 214; // durasi lagu dalam detik (LANY XXL ~3:34)

    const audio = document.createElement('audio');
    audio.src     = MUSIC_SRC;
    audio.loop    = true;
    audio.volume  = 0.35;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    // Hitung posisi lagu sekarang berdasarkan waktu yang berlalu
    const savedTime = parseFloat(localStorage.getItem(KEY_TIME) || '0');
    const savedTS   = parseFloat(localStorage.getItem(KEY_TS)   || '0');
    const elapsed   = savedTS ? (Date.now() / 1000 - savedTS) : 0;
    const resumeAt  = savedTS ? (savedTime + elapsed) % DURATION : 0;

    // Apakah user sudah pernah unmute sebelumnya?
    const wasMuted = localStorage.getItem(KEY_MUTED) !== 'false';
    audio.muted = wasMuted;

    // Simpan posisi setiap detik
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem(KEY_TIME, audio.currentTime);
        localStorage.setItem(KEY_TS, Date.now() / 1000);
    });

    // Buat tombol
    const btn = document.createElement('button');
    btn.id = 'musicBtn';
    btn.setAttribute('aria-label', 'Toggle music');
    document.body.appendChild(btn);

    let isMuted = wasMuted;
    const updateBtn = () => {
        btn.innerHTML = `<span class="music-icon">${isMuted ? '🔇' : '🔊'}</span><span class="music-label">XXL — LANY</span>`;
        btn.classList.toggle('music-unmuted', !isMuted);
        audio.muted = isMuted;
    };
    updateBtn();

    // Start audio saat halaman siap
    const startAudio = () => {
        const doPlay = () => {
            if (resumeAt > 0) audio.currentTime = resumeAt;
            audio.play().catch(() => {});
        };
        audio.readyState >= 1 ? doPlay()
            : audio.addEventListener('loadedmetadata', doPlay, { once: true });
    };
    window.addEventListener('load', startAudio);

    // Toggle mute
    btn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (audio.paused) audio.play().catch(() => {});
        localStorage.setItem(KEY_MUTED, isMuted);
        updateBtn();
    });
})();

// ===== CONSOLE =====
console.log('%c👋 Hello Developer!', 'color:#6AA0FF;font-size:18px;font-weight:bold;');
console.log('%cCheck out Clarencia\'s portfolio!', 'color:#9ca3af;font-size:13px;');
