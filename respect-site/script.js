/* ================================================================
   РЕСПЕКТ — script.js
   Прелоадер → шапка → reveal → параллакс → галерея → марки → форма
   ================================================================ */

'use strict';

/* ── Утилиты ─────────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. Прелоадер ────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = qs('#preloader');
  const bar       = qs('#preloaderBar');
  const count     = qs('#preloaderCount');
  if (!preloader) return;

  let progress = 0;
  const MAX_DURATION = 3800; // ms, не более 4 с по TZ
  const STEP = 100 / (MAX_DURATION / 30);

  const tick = () => {
    progress = Math.min(100, progress + STEP * (0.6 + Math.random() * 0.8));
    bar.style.width   = progress + '%';
    count.textContent = Math.floor(progress);
    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(hide, 200);
    }
  };

  const hide = () => {
    preloader.classList.add('is-hidden');
    document.body.style.overflow = '';
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  };

  document.body.style.overflow = 'hidden';
  requestAnimationFrame(tick);

  // Страховка: убрать прелоадер как только всё загрузилось
  window.addEventListener('load', () => {
    if (progress < 100) { progress = 100; bar.style.width = '100%'; count.textContent = '100'; setTimeout(hide, 300); }
  });
})();


/* ── 2. Шапка: фон при скролле ───────────────────────────────── */
(function initHeader() {
  const header = qs('#header');
  if (!header) return;

  const update = () => {
    const scrolled = window.scrollY > 60;
    header.style.background = scrolled
      ? 'rgba(11,11,13,.96)'
      : 'rgba(11,11,13,.72)';
    header.style.borderBottomColor = scrolled
      ? 'rgba(255,255,255,.16)'
      : 'rgba(255,255,255,.1)';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── 3. Плавный скролл по якорям ────────────────────────────── */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = qs(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 76;
  const top = target.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top, behavior: 'smooth' });
});


/* ── 4. Reveal-анимации через IntersectionObserver ───────────── */
(function initReveal() {
  const options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        observer.unobserve(el);
      }
    });
  }, options);

  // Карточки — каскадная задержка внутри родителя
  const cardGroups = qsa('.catalog__grid, .about__features, .reviews__grid, .guarantee-row, .process__steps');
  cardGroups.forEach(group => {
    const cards = qsa('[data-reveal-card]', group);
    cards.forEach((card, i) => {
      card.dataset.revealDelay = i * 90;
      observer.observe(card);
    });
  });

  // Обычные reveal (не в grid-группах)
  qsa('[data-reveal]').forEach(el => observer.observe(el));

  // Шаги процесса
  qsa('[data-step]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .9s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms, transform .9s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`;
    observer.observe(el);
  });
  // При observe data-step нужен отдельный листенер
  const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        stepObserver.unobserve(entry.target);
      }
    });
  }, options);
  qsa('[data-step]').forEach(el => stepObserver.observe(el));
})();


/* ── 5. Параллакс: Hero и About ─────────────────────────────── */
(function initParallax() {
  const heroBg     = qs('#heroBgImg');
  const aboutImg   = qs('#aboutImg');
  const truckImg   = qs('#truckImg');

  if (!heroBg && !aboutImg && !truckImg) return;

  const onScroll = () => {
    const sy = window.scrollY;

    if (heroBg) {
      // Движение на -30% от высоты прокрутки относительно hero
      const hero = qs('#hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
          const ratio = sy / (hero.offsetHeight || 1);
          heroBg.style.transform = `scale(1.04) translateY(${ratio * 14}%)`;
        }
      }
    }

    if (aboutImg) {
      const section = qs('#about');
      if (section) {
        const rect = section.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          aboutImg.style.transform = `translateY(${(progress - 0.5) * -60}px)`;
        }
      }
    }

    if (truckImg) {
      const band = qs('.process__truck-band');
      if (band) {
        const rect = band.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          truckImg.style.transform = `translateX(${(progress - 0.5) * -40}px) scale(1.04)`;
        }
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── 6. Галерея ─────────────────────────────────────────────── */
(function initGallery() {
  const track    = qs('#galleryTrack');
  const viewport = qs('#galleryViewport');
  const prevBtn  = qs('#galleryPrev');
  const nextBtn  = qs('#galleryNext');
  const curEl    = qs('#galleryCur');
  const progress = qs('#galleryProgress');
  if (!track || !viewport) return;

  const slides    = qsa('.gallery__slide', track);
  const total     = slides.length;
  let   current   = 0;
  let   isDragging = false;
  let   startX     = 0;
  let   dragOffset  = 0;
  let   currentTranslate = 0;

  const slideWidth = () => {
    const slide = slides[0];
    const gap = parseInt(getComputedStyle(track).gap, 10) || 60;
    return slide.offsetWidth + gap;
  };

  const goTo = (index) => {
    current = Math.max(0, Math.min(total - 1, index));
    currentTranslate = -current * slideWidth();
    track.style.transform = `translateX(${currentTranslate}px)`;
    if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');
    if (progress) progress.style.width = `${((current + 1) / total) * 100}%`;
  };

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Drag
  viewport.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    viewport.parentElement.classList.add('gallery--dragging');
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragOffset = e.clientX - startX;
    track.style.transform = `translateX(${currentTranslate + dragOffset}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.parentElement.classList.remove('gallery--dragging');
    track.style.transition = '';
    const threshold = slideWidth() * 0.3;
    if (dragOffset < -threshold) goTo(current + 1);
    else if (dragOffset > threshold) goTo(current - 1);
    else goTo(current);
    dragOffset = 0;
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    const galleryVisible = viewport.getBoundingClientRect().top < window.innerHeight && viewport.getBoundingClientRect().bottom > 0;
    if (!galleryVisible) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });

  goTo(0);
  window.addEventListener('resize', () => goTo(current));
})();


/* ── 7. Марки футера (бесконечная прокрутка) ─────────────────── */
(function initMarquee() {
  const marquee = qs('#footerMarquee');
  if (!marquee) return;

  let pos = 0;
  const speed = 0.5; // px/frame
  let paused = false;

  marquee.addEventListener('mouseenter', () => paused = true);
  marquee.addEventListener('mouseleave', () => paused = false);

  const inners = qsa('.footer__marquee-inner', marquee);
  if (!inners.length) return;

  const tick = () => {
    if (!paused) {
      pos -= speed;
      const w = inners[0].offsetWidth;
      if (Math.abs(pos) >= w) pos += w;
      marquee.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();


/* ── 8. Логотип футера: cursor tracking ─────────────────────── */
(function initFooterLogo() {
  const logo = qs('#footerLogo');
  if (!logo) return;

  logo.addEventListener('mousemove', e => {
    const rect = logo.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    logo.style.transform = `translate(${x}px, ${y}px)`;
  });

  logo.addEventListener('mouseleave', () => {
    logo.style.transition = 'transform .5s cubic-bezier(0.22,1,0.36,1), color .4s';
    logo.style.transform = 'translate(0,0)';
    setTimeout(() => logo.style.transition = '', 500);
  });
})();


/* ── 9. Телефонная маска в форме ────────────────────────────── */
(function initPhoneMask() {
  const input = qs('#fphone');
  if (!input) return;

  input.addEventListener('input', () => {
    let val = input.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;
    val = val.slice(0, 11);

    let result = '+7';
    if (val.length > 1)  result += ' (' + val.slice(1, 4);
    if (val.length >= 4) result += ') ' + val.slice(4, 7);
    if (val.length >= 7) result += '-' + val.slice(7, 9);
    if (val.length >= 9) result += '-' + val.slice(9, 11);

    input.value = result;
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && input.value === '+7') {
      e.preventDefault();
    }
  });

  input.addEventListener('focus', () => {
    if (!input.value) input.value = '+7 (';
  });

  input.addEventListener('blur', () => {
    if (input.value === '+7 (') input.value = '';
  });
})();


/* ── 10. Форма заявки ───────────────────────────────────────── */
(function initForm() {
  const form    = qs('#orderForm');
  if (!form) return;

  const nameIn  = qs('#fname',  form);
  const phoneIn = qs('#fphone', form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    [nameIn, phoneIn].forEach(inp => inp.classList.remove('field__input--bad'));

    if (!nameIn.value.trim() || nameIn.value.trim().length < 2) {
      nameIn.classList.add('field__input--bad');
      valid = false;
    }

    const digits = phoneIn.value.replace(/\D/g, '');
    if (digits.length < 11) {
      phoneIn.classList.add('field__input--bad');
      valid = false;
    }

    if (!valid) {
      form.classList.add('is-invalid');
      return;
    }
    form.classList.remove('is-invalid');

    // Имитация успешной отправки
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Заявка принята ✓';
      btn.style.background = 'linear-gradient(135deg, #27ae60, #219150)';
      nameIn.value  = '';
      phoneIn.value = '';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1000);
  });
})();


/* ── 11. Активный пункт меню при скролле ───────────────────── */
(function initActiveNav() {
  const links    = qsa('.header__nav-link');
  const sections = links.map(l => qs(l.getAttribute('href'))).filter(Boolean);

  const update = () => {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = sections[0];
    sections.forEach(s => { if (s.offsetTop <= mid) active = s; });
    links.forEach(l => {
      const match = l.getAttribute('href') === '#' + (active && active.id);
      l.style.color = match ? 'var(--red)' : '';
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── 12. Смена темы секции по скроллу (about — светлая) ─────── */
(function initThemeSwitch() {
  const about  = qs('#about');
  const reviews = qs('#reviews');
  const header  = qs('#header');
  if (!about || !header) return;

  const lightSections = [about, reviews].filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('header--light');
        header.style.borderBottomColor = 'rgba(0,0,0,.1)';
      }
    });
  }, { threshold: 0.5 });

  const darkObserver = new IntersectionObserver(entries => {
    // Когда выходим из светлой секции — возвращаем тёмную шапку
    const anyLight = lightSections.some(s => {
      const r = s.getBoundingClientRect();
      return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
    });
    if (!anyLight) {
      header.classList.remove('header--light');
      header.style.borderBottomColor = '';
    }
  }, { threshold: 0 });

  lightSections.forEach(s => observer.observe(s));
  lightSections.forEach(s => darkObserver.observe(s));
})();


/* ── 13. Cursor: тонкая индикация на карточках ───────────────── */
(function initCardCursor() {
  const cards = qsa('.mat-card, .gallery__slide');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 5;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(0.22,1,0.36,1), background .35s';
      card.style.transform  = '';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
})();


/* ── 14. Якорь в URL без скачка ─────────────────────────────── */
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
