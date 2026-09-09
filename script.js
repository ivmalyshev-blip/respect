/* ============================================================
   ГК Респект — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     PRELOADER
  ---------------------------------------------------------- */
  const preloader  = document.getElementById('preloader');
  const preBar     = document.querySelector('.pre-bar');
  const preCount   = document.querySelector('.pre-count');
  let progress     = 0;
  let raf;

  function tickPreloader() {
    progress += Math.random() * 3.5 + 0.5;
    if (progress >= 100) {
      progress = 100;
      preBar.style.width  = '100%';
      preCount.textContent = '100';
      setTimeout(() => {
        preloader.classList.add('done');
        preloader.addEventListener('transitionend', () => {
          preloader.remove();
        }, { once: true });
        startPage();
      }, 280);
      return;
    }
    preBar.style.width   = progress + '%';
    preCount.textContent = Math.floor(progress);
    raf = requestAnimationFrame(tickPreloader);
  }
  raf = requestAnimationFrame(tickPreloader);

  // safety timeout — max 4 s
  setTimeout(() => {
    cancelAnimationFrame(raf);
    progress = 100;
    preBar.style.width = '100%';
    preCount.textContent = '100';
    preloader.classList.add('done');
    startPage();
  }, 3800);

  /* ----------------------------------------------------------
     PAGE INIT (called after preloader)
  ---------------------------------------------------------- */
  function startPage() {
    initReveal();
    initHeader();
    initHeroParallax();
    initGallery();
    initFooterGiant();
    initForm();
    initPhoneMask();
  }

  /* ----------------------------------------------------------
     REVEAL ON SCROLL
     sдвиг 28 px, 900 мс, cubic-bezier(0.22, 1, 0.36, 1)
  ---------------------------------------------------------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('visible'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     HEADER — sticky colour switch
  ---------------------------------------------------------- */
  function initHeader() {
    const hdr         = document.getElementById('site-header');
    const lightSections = Array.from(document.querySelectorAll('.section--light'));

    function onScroll() {
      const scrollY  = window.scrollY;
      const onLight  = lightSections.some(sec => {
        const r = sec.getBoundingClientRect();
        return r.top <= 72 && r.bottom > 72;
      });
      hdr.classList.toggle('on-light', onLight);

      // Subtle shadow on scroll
      hdr.style.boxShadow = scrollY > 8
        ? '0 1px 0 rgba(0,0,0,.18)'
        : 'none';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------------------------
     HERO PARALLAX
  ---------------------------------------------------------- */
  function initHeroParallax() {
    const img = document.getElementById('hero-parallax');
    if (!img) return;

    let ticking = false;
    function update() {
      const sy = window.scrollY;
      img.style.transform = `translateY(${sy * 0.35}px)`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     GALLERY — drag + button carousel
  ---------------------------------------------------------- */
  function initGallery() {
    const track    = document.getElementById('gallery-track');
    const wrap     = track && track.parentElement;
    const btnPrev  = document.getElementById('gal-prev');
    const btnNext  = document.getElementById('gal-next');
    const curEl    = document.getElementById('gal-cur');
    const totalEl  = document.getElementById('gal-total');
    const hint     = document.getElementById('drag-hint');
    if (!track) return;

    const items   = track.querySelectorAll('.gal-item');
    const count   = items.length;
    let   current = 0;

    if (totalEl) totalEl.textContent = String(count).padStart(2, '0');

    function getItemWidth() {
      return items[0] ? items[0].offsetWidth + 16 : 616; // 600 + 16 gap
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, count - 1));
      const x = current * getItemWidth();
      track.style.transform = `translateX(-${x}px)`;
      if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');
      btnPrev && (btnPrev.disabled = current === 0);
      btnNext && (btnNext.disabled = current === count - 1);
    }

    btnPrev && btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext && btnNext.addEventListener('click', () => goTo(current + 1));
    goTo(0);

    /* Drag */
    if (!wrap) return;
    let startX = 0, startScrollX = 0, isDragging = false, moved = false;

    wrap.addEventListener('pointerdown', e => {
      isDragging = true; moved = false;
      startX      = e.clientX;
      startScrollX= current * getItemWidth();
      wrap.setPointerCapture(e.pointerId);
      track.style.transition = 'none';
    });

    wrap.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      const raw = startScrollX - dx;
      const clamped = Math.max(0, Math.min(raw, (count - 1) * getItemWidth()));
      track.style.transform = `translateX(-${clamped}px)`;
    });

    wrap.addEventListener('pointerup', e => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      const dx   = e.clientX - startX;
      const half = getItemWidth() / 3;
      if (moved) {
        if (dx < -half)       goTo(current + 1);
        else if (dx > half)   goTo(current - 1);
        else                  goTo(current);
      }
    });

    // Hide hint after first interaction
    wrap.addEventListener('pointerdown', () => {
      if (hint) hint.style.opacity = '0';
    }, { once: true });
  }

  /* ----------------------------------------------------------
     FOOTER — giant text follows cursor
  ---------------------------------------------------------- */
  function initFooterGiant() {
    const zone  = document.getElementById('cursor-zone');
    const giant = document.getElementById('footer-giant');
    if (!zone || !giant) return;

    let targetX = 0, currentX = 0;
    let raf2;

    zone.addEventListener('mousemove', e => {
      const rect  = zone.getBoundingClientRect();
      const relX  = e.clientX - rect.left - rect.width / 2;
      targetX     = relX * 0.06;
    });

    zone.addEventListener('mouseleave', () => { targetX = 0; });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function loop() {
      currentX = lerp(currentX, targetX, 0.08);
      giant.style.transform = `translateX(${currentX}px)`;
      raf2 = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ----------------------------------------------------------
     CONTACT FORM
  ---------------------------------------------------------- */
  function initForm() {
    const form    = document.getElementById('order-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = form.querySelector('#f-name').value.trim();
      const phone = form.querySelector('#f-phone').value.trim();

      // Basic validation
      if (!name || !phone) {
        const empty = !name ? form.querySelector('#f-name') : form.querySelector('#f-phone');
        empty.focus();
        empty.style.borderColor = 'rgba(196,18,48,.8)';
        empty.addEventListener('input', () => (empty.style.borderColor = ''), { once: true });
        return;
      }

      // Simulate submit
      form.style.opacity   = '0';
      form.style.transform = 'translateY(8px)';
      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('show');
      }, 340);
    });
  }

  /* ----------------------------------------------------------
     PHONE MASK  +7 (___) ___-__-__
  ---------------------------------------------------------- */
  function initPhoneMask() {
    const inp = document.getElementById('f-phone');
    if (!inp) return;

    inp.addEventListener('focus', () => {
      if (!inp.value) inp.value = '+7 (';
    });

    inp.addEventListener('input', () => {
      let raw = inp.value.replace(/\D/g, '');
      if (raw.startsWith('7') || raw.startsWith('8')) raw = raw.slice(1);
      raw = raw.slice(0, 10);

      let out = '+7 (';
      if (raw.length >= 1) out += raw.slice(0, 3);
      if (raw.length >= 4) out += ') ' + raw.slice(3, 6);
      if (raw.length >= 7) out += '-' + raw.slice(6, 8);
      if (raw.length >= 9) out += '-' + raw.slice(8, 10);

      inp.value = out;
    });

    inp.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && inp.value === '+7 (') {
        e.preventDefault();
        inp.value = '';
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL-TRIGGERED SECTION NUMBERS (subtle highlight)
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.hdr-nav a');

  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionIO.observe(s));

})();
