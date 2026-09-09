/* ================================================================
   РЕСПЕКТ — нерудные материалы
   Система: токены → база → компоненты → секции
   ================================================================ */

/* ── Токены ─────────────────────────────────────────────────── */
:root {
  /* Палитра: тёмный уголь + один красный акцент */
  --ink:       #101012;
  --ink-2:     #16161a;
  --ink-3:     #1d1d22;
  --night:     #0b0b0d;
  --paper:     #f6f5f2;
  --paper-2:   #ecebe7;
  --grey-3:    #83837f;
  --grey-4:    #5c5c58;
  --grey-5:    #3a3a38;
  --red:       #e11b22;
  --red-2:     #c41218;
  --red-deep:  #7f0d12;
  --white:     #ffffff;
  --border:    rgba(255,255,255,.1);
  --border-2:  rgba(255,255,255,.16);

  /* Типографика */
  --font-head: 'Unbounded', sans-serif;
  --font-body: 'Onest', sans-serif;

  /* Кривые движения */
  --ease-ui:    cubic-bezier(0.77, 0, 0.18, 1);
  --ease-large: cubic-bezier(0.625, 0.05, 0, 1);
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-shtr:  cubic-bezier(0.76, 0, 0.24, 1);

  /* Габариты */
  --container: 1320px;
  --pad: 48px;
  --header-h: 76px;

  /* Срезанные углы (TGK Auto) */
  --cut-sm: 8px;
  --cut-md: 14px;
}

/* ── Сброс ──────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  background: var(--night);
  color: var(--paper);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  min-width: 1440px;
  overflow-x: hidden;
}

img { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }
input { font: inherit; }

::selection { background: var(--red); color: #fff; }

/* ── Утилиты ────────────────────────────────────────────────── */
.section {
  position: relative;
  min-height: 100vh;
  padding: 120px clamp(var(--pad), 5vw, 96px);
  overflow: hidden;
}
.section-label {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 20px;
}
.section-title {
  font-family: var(--font-head);
  font-size: clamp(44px, 4.4vw, 64px);
  font-weight: 900;
  line-height: .92;
  letter-spacing: -.02em;
  text-transform: uppercase;
}

/* ── КнопкиFlat, без тени, без магнита ──────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .02em;
  padding: 17px 30px;
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
  transition: background .3s var(--ease-ui),
              color .3s var(--ease-ui),
              border-color .3s var(--ease-ui);
  line-height: 1;
  white-space: nowrap;
}
.btn--sm { padding: 12px 20px; font-size: 13px; }
.btn--lg { padding: 19px 34px; font-size: 15px; }
.btn--primary {
  background: linear-gradient(135deg, var(--red) 0%, var(--red-2) 100%);
  color: #fff;
}
.btn--primary:hover { background: linear-gradient(135deg, var(--red-2) 0%, var(--red-deep) 100%); }
.btn--ghost {
  background: transparent;
  color: var(--paper);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25);
}
.btn--ghost:hover { box-shadow: inset 0 0 0 1px rgba(255,255,255,.5); }

/* ── Прелоадер ──────────────────────────────────────────────── */
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--night);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .5s var(--ease-ui), visibility .5s;
}
.preloader.is-hidden { opacity: 0; visibility: hidden; }
.preloader__inner { display: flex; flex-direction: column; gap: 24px; width: 340px; }
.preloader__logo {
  font-family: var(--font-head);
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -.02em;
  text-align: center;
}
.preloader__bar-wrap {
  height: 2px;
  background: rgba(255,255,255,.14);
  overflow: hidden;
}
.preloader__bar {
  height: 100%;
  width: 0%;
  background: var(--red);
  transition: width .1s linear;
}
.preloader__count {
  font-family: var(--font-head);
  font-size: 12px;
  font-weight: 700;
  color: var(--grey-3);
  text-align: right;
  letter-spacing: .1em;
}

/* ── Шапка ──────────────────────────────────────────────────── */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: var(--header-h);
  background: rgba(11,11,13,.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: background .3s var(--ease-ui), border-color .3s var(--ease-ui);
}
.header__inner {
  max-width: var(--container);
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--pad);
  display: flex;
  align-items: center;
  gap: 40px;
}
.header__logo {
  font-family: var(--font-head);
  font-size: 21px;
  font-weight: 900;
  letter-spacing: -.02em;
  text-transform: uppercase;
}
.header__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--grey-3);
  letter-spacing: .03em;
}
.header__sep { color: var(--red); }
.header__nav {
  display: flex;
  gap: 30px;
  margin-left: auto;
}
.header__nav-link {
  font-size: 13.5px;
  letter-spacing: .02em;
  color: var(--paper);
  position: relative;
  padding: 6px 0;
  transition: color .25s var(--ease-ui);
}
.header__nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 0; height: 2px;
  background: var(--red);
  transition: width .35s var(--ease-ui);
}
.header__nav-link:hover { color: var(--white); }
.header__nav-link:hover::after { width: 100%; }
.header__right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.header__phone {
  font-family: var(--font-head);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -.01em;
  transition: color .25s;
}
.header__phone:hover { color: var(--red); }

/* ── Hero ───────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding: var(--header-h) var(--pad) 96px;
}
.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.hero__bg-img {
  position: absolute;
  inset: -8%;
  width: 116%;
  height: 116%;
  object-fit: cover;
  will-change: transform;
  transform: scale(1.04);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg,
      rgba(11,11,13,.55) 0%,
      rgba(11,11,13,.15) 35%,
      rgba(11,11,13,.9) 100%);
}
.hero__corners {
  position: absolute;
  inset: var(--header-h) 0 auto 0;
  display: flex;
  justify-content: space-between;
  padding: 24px var(--pad);
  pointer-events: none;
}
.hero__corner {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 12px;
  letter-spacing: .04em;
  opacity: 0;
  animation: cornerIn .9s var(--ease-out) forwards;
}
.hero__corner--tl { animation-delay: 1.3s; }
.hero__corner--tr { text-align: right; animation-delay: 1.5s; }
.hero__corner--br { text-align: right; }
.hero__corner-label {
  text-transform: uppercase;
  color: rgba(255,255,255,.5);
  font-size: 11px;
  letter-spacing: .14em;
}
.hero__corner-value { font-weight: 500; color: var(--paper); }
@keyframes cornerIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: var(--container);
  margin: 0 auto;
  width: 100%;
}
.hero__title {
  font-family: var(--font-head);
  font-size: clamp(64px, 7vw, 108px);
  font-weight: 900;
  line-height: .88;
  letter-spacing: -.035em;
  text-transform: uppercase;
  margin-bottom: 40px;
}
.hero__line {
  display: block;
  overflow: hidden;
  opacity: 0;
  transform: translateY(110%);
}
.hero__line--accent { color: var(--red); }
.hero__line[data-reveal] { animation: lineUp 1s var(--ease-large) forwards; }
.hero__line[data-reveal]:nth-child(1) { animation-delay: .2s; }
.hero__line[data-reveal]:nth-child(2) { animation-delay: .34s; }
.hero__line[data-reveal]:nth-child(3) { animation-delay: .48s; }
.hero__line[data-reveal]:nth-child(4) { animation-delay: .62s; }
@keyframes lineUp {
  from { opacity: 0; transform: translateY(110%); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero__sub {
  font-size: clamp(16px, 1.4vw, 20px);
  color: rgba(255,255,255,.85);
  max-width: 460px;
  margin-bottom: 40px;
  opacity: 0;
  animation: subIn 1s var(--ease-out) .85s forwards;
}
@keyframes subIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero__actions {
  display: flex;
  gap: 14px;
  opacity: 0;
  animation: subIn 1s var(--ease-out) 1s forwards;
}
.hero__scroll {
  position: absolute;
  right: var(--pad);
  bottom: 40px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 3;
}
.hero__scroll-line {
  width: 1px;
  height: 46px;
  background: linear-gradient(to bottom, var(--red), transparent);
  animation: scrollFloat 2s var(--ease-ui) infinite;
}
.hero__scroll-text {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .16em;
  color: var(--grey-3);
}
@keyframes scrollFloat {
  0%, 100% { transform: scaleY(1); opacity: .4; }
  50% { transform: scaleY(1.2); opacity: 1; }
}

/* ── Каталог ────────────────────────────────────────────────── */
.catalog {
  background: var(--night);
}
.catalog__head {
  max-width: var(--container);
  margin: 0 auto 64px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 40px;
  align-items: end;
}
.catalog__desc {
  font-size: 16px;
  color: var(--grey-3);
  max-width: 400px;
  line-height: 1.7;
}
.catalog__grid {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
.mat-card {
  position: relative;
  background: var(--ink-2);
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
  overflow: hidden;
  transition: background .35s var(--ease-ui);
}
.mat-card__media {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.mat-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .7s var(--ease-large), opacity .4s var(--ease-ui);
}
.mat-card:hover .mat-card__img { transform: scale(1.05); }
.mat-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 24px;
  background: linear-gradient(180deg, rgba(11,11,13,0) 20%, rgba(11,11,13,.95) 100%);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .35s var(--ease-ui), transform .35s var(--ease-ui);
}
.mat-card:hover .mat-card__overlay {
  opacity: 1;
  transform: translateY(0);
}
.mat-card__overlay p {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--paper);
}
.mat-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mat-card__name {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -.01em;
  text-transform: uppercase;
}
.mat-card__short {
  font-size: 13px;
  color: var(--grey-3);
}
.mat-card__foot {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.mat-card__price {
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 700;
  color: var(--red);
}
.mat-card__link {
  font-size: 13px;
  font-weight: 600;
  color: var(--grey-3);
  transition: color .25s, transform .25s var(--ease-ui);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.mat-card__link:hover { color: var(--white); }

/* ── О компании ─────────────────────────────────────────────── */
.about {
  background: var(--paper);
  color: var(--ink);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  padding-top: 0;
  padding-bottom: 0;
  align-items: center;
  min-height: auto;
}
.about__media-col {
  position: relative;
  height: 100%;
  padding: 120px 48px 120px 0;
}
.about__img-wrap {
  height: 62vh;
  min-height: 480px;
  overflow: hidden;
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
}
.about__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.about__stats {
  position: absolute;
  left: 0; right: 48px; bottom: -30px;
  display: flex;
  gap: 40px;
  padding: 24px 36px;
  background: var(--night);
  color: var(--paper);
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
  box-shadow: 0 20px 50px -20px rgba(0,0,0,.4);
  overflow: hidden;
}
.about__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.about__stat-num {
  font-family: var(--font-head);
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -.02em;
  color: var(--red);
}
.about__stat-num sup { font-size: 18px; }
.about__stat-label {
  font-size: 12px;
  color: var(--grey-3);
  letter-spacing: .04em;
}
.about__content-col {
  padding: 120px 0 120px 40px;
}
.about__text {
  font-size: 17px;
  line-height: 1.75;
  color: var(--grey-4);
  margin-top: 28px;
  max-width: 520px;
}
.about__features {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid rgba(0,0,0,.12);
  max-width: 520px;
}
.feat {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 22px 0;
  border-bottom: 1px solid rgba(0,0,0,.12);
}
.feat__num {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
  padding-top: 3px;
}
.feat__text {
  font-size: 15.5px;
  color: var(--ink);
  font-weight: 500;
  line-height: 1.5;
}

/* ── Процесс ────────────────────────────────────────────────── */
.process {
  background: var(--night);
}
.process__top {
  max-width: var(--container);
  margin: 0 auto 72px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
}
.process__intro {
  font-size: 16px;
  color: var(--grey-3);
  max-width: 380px;
  line-height: 1.7;
  padding-bottom: 6px;
}
.process__steps {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.process__step {
  position: relative;
  background: var(--ink-2);
  padding: 32px 28px 40px;
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
  transition: background .35s var(--ease-ui), transform .35s var(--ease-ui);
  min-height: 260px;
  display: flex;
  flex-direction: column;
}
.process__step:hover {
  background: var(--ink-3);
  transform: translateY(-4px);
}
.process__step-index {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  color: var(--red);
  margin-bottom: auto;
}
.process__step-title {
  font-family: var(--font-head);
  font-size: 19px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 32px 0 12px;
  letter-spacing: -.01em;
}
.process__step-desc {
  font-size: 14px;
  color: var(--grey-3);
  line-height: 1.65;
}
.process__truck-band {
  max-width: var(--container);
  margin: 72px auto 0;
  height: 300px;
  overflow: hidden;
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
}
.process__truck-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease-large);
}
.process__truck-band:hover .process__truck-img { transform: scale(1.03); }

/* ── Галерея ────────────────────────────────────────────────── */
.gallery {
  background: var(--ink);
  color: var(--paper);
  padding-left: 0;
  padding-right: 0;
}
.gallery__head {
  max-width: var(--container);
  margin: 0 auto 48px;
  padding: 0 var(--pad);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 48px;
}
.gallery__nav {
  display: flex;
  align-items: center;
  gap: 18px;
}
.gallery__arrow {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--paper);
  border: 1px solid rgba(255,255,255,.2);
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
  transition: background .3s var(--ease-ui), border-color .3s, color .3s;
}
.gallery__arrow:hover { background: var(--red); border-color: var(--red); color: #fff; }
.gallery__counter {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  color: var(--grey-3);
  letter-spacing: .1em;
  min-width: 70px;
  text-align: center;
}
.gallery__viewport {
  overflow: hidden;
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
}
.gallery__viewport:active { cursor: grabbing; }
.gallery__track {
  display: flex;
  gap: 60px;
  padding: 0 var(--pad);
  will-change: transform;
  transition: transform .7s var(--ease-large);
}
.gallery__slide {
  position: relative;
  flex-shrink: 0;
  width: calc((var(--container) - 60px) / 2);
  height: 62vh;
  min-height: 460px;
  overflow: hidden;
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
}
.gallery__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .9s var(--ease-large);
}
.gallery__slide:hover img { transform: scale(1.04); }
.gallery__caption {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 40px 28px 24px;
  background: linear-gradient(180deg, transparent, rgba(11,11,13,.92));
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gallery__caption-tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--red);
}
.gallery__caption-title {
  font-family: var(--font-head);
  font-size: 18px;
  font-weight: 700;
}
.gallery__caption-sub {
  font-size: 13px;
  color: var(--grey-3);
}
.gallery__progress {
  height: 2px;
  background: rgba(255,255,255,.08);
  margin-top: 56px;
  max-width: var(--container);
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - var(--pad) * 2);
}
.gallery__progress-fill {
  height: 100%;
  width: 20%;
  background: var(--red);
  transition: width .5s var(--ease-ui);
}
.gallery--dragging .gallery__track { transition: none; }

/* ── Отзывы ─────────────────────────────────────────────────── */
.reviews {
  background: var(--paper);
  color: var(--ink);
}
.reviews__head {
  max-width: var(--container);
  margin: 0 auto 56px;
}
.reviews__grid {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.review-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,.08);
  padding: 32px;
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform .4s var(--ease-ui), box-shadow .4s var(--ease-ui);
}
.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 50px -24px rgba(0,0,0,.18);
}
.review-card__top {
  display: flex;
  align-items: center;
  gap: 14px;
}
.review-card__avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 700;
  background: var(--ink);
  color: #fff;
  clip-path: polygon(
    8px 0, 100% 0,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    0 100%, 0 8px
  );
}
.review-card__meta { flex: 1; }
.review-card__name {
  font-weight: 600;
  font-size: 15px;
}
.review-card__role {
  font-size: 12.5px;
  color: var(--grey-4);
}
.review-card__stars {
  color: var(--red);
  letter-spacing: 2px;
  flex-shrink: 0;
}
.review-card__text {
  font-size: 14.5px;
  color: var(--grey-4);
  line-height: 1.7;
}
.guarantee-row {
  max-width: var(--container);
  margin: 72px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
.guarantee-card {
  background: var(--ink);
  color: var(--paper);
  padding: 36px 32px;
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
}
.guarantee-card__label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--red);
  margin-bottom: 14px;
}
.guarantee-card__val {
  font-family: var(--font-head);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -.02em;
  margin-bottom: 14px;
}
.guarantee-card p {
  font-size: 13.5px;
  color: var(--grey-3);
  line-height: 1.6;
}

/* ── Форма заявки ───────────────────────────────────────────── */
.order {
  background: var(--night);
  display: flex;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 120px;
}
.order__wrap {
  max-width: var(--container);
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.order__sub {
  font-size: 17px;
  color: var(--grey-3);
  line-height: 1.7;
  max-width: 420px;
  margin-top: 28px;
}
.order__props {
  display: flex;
  gap: 60px;
  margin-top: 48px;
}
.order__prop { display: flex; flex-direction: column; gap: 4px; }
.order__prop-val {
  font-family: var(--font-head);
  font-size: 30px;
  font-weight: 900;
  color: var(--red);
}
.order__prop-label {
  font-size: 12px;
  color: var(--grey-3);
  text-transform: uppercase;
  letter-spacing: .1em;
}
.order__form {
  background: var(--ink-2);
  padding: 48px;
  clip-path: polygon(
    var(--cut-md) 0, 100% 0,
    100% calc(100% - var(--cut-md)),
    calc(100% - var(--cut-md)) 100%,
    0 100%, 0 var(--cut-md)
  );
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.field__label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--grey-3);
}
.field__input {
  width: 100%;
  background: var(--ink-3);
  border: 1px solid var(--border);
  color: var(--paper);
  font-size: 16px;
  padding: 17px 20px;
  clip-path: polygon(
    6px 0, 100% 0,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%, 0 6px
  );
  outline: none;
  transition: border-color .25s var(--ease-ui), background .25s var(--ease-ui);
}
.field__input::placeholder { color: var(--grey-4); }
.field__input:focus {
  border-color: var(--red);
  background: var(--ink);
}
.order__form.is-invalid .field__input--bad {
  border-color: var(--red);
}
.order__agree {
  font-size: 12px;
  color: var(--grey-4);
  line-height: 1.5;
}
.order__agree a {
  color: var(--grey-3);
  text-decoration: underline;
}

/* ── Контакты ───────────────────────────────────────────────── */
.contacts {
  background: var(--ink);
  color: var(--paper);
}
.contacts__head {
  max-width: var(--container);
  margin: 0 auto 56px;
}
.contacts__grid {
  max-width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.contacts__block {
  background: var(--ink-2);
  padding: 40px 32px;
  clip-path: polygon(
    var(--cut-sm) 0, 100% 0,
    100% calc(100% - var(--cut-sm)),
    calc(100% - var(--cut-sm)) 100%,
    0 100%, 0 var(--cut-sm)
  );
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 230px;
}
.contacts__block-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--grey-3);
}
.contacts__phone {
  font-family: var(--font-head);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -.01em;
  transition: color .25s;
  word-break: break-word;
}
.contacts__phone:hover { color: var(--red); }
.contacts__detail {
  font-size: 13.5px;
  color: var(--grey-3);
  line-height: 1.7;
  margin-top: auto;
}
.contacts__messengers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}
.contacts__messenger-link {
  font-size: 14px;
  color: var(--grey-3);
  transition: color .25s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.contacts__messenger-link::before {
  content: '';
  width: 6px; height: 6px;
  background: var(--red);
  flex-shrink: 0;
}
.contacts__messenger-link:hover { color: var(--white); }

/* ── Футер ──────────────────────────────────────────────────── */
.footer {
  background: var(--night);
  border-top: 1px solid var(--border);
}
.footer__marquee-band {
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: 0;
  position: relative;
}
.footer__marquee {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}
.footer__marquee-inner {
  display: flex;
  align-items: center;
  padding: 20px 0;
  flex-shrink: 0;
}
.footer__marquee-inner span {
  font-family: var(--font-head);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--grey-3);
  padding: 0 24px;
}
.footer__marquee-sep { color: var(--red) !important; }
.footer__body {
  max-width: var(--container);
  margin: 0 auto;
  padding: 72px var(--pad) 56px;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 80px;
}
.footer__col-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.footer__logo {
  font-family: var(--font-head);
  font-size: 46px;
  font-weight: 900;
  letter-spacing: -.03em;
  text-transform: uppercase;
  color: var(--paper);
  transition: color .4s var(--ease-ui);
  line-height: 1;
}
.footer__logo:hover { color: var(--red); }
.footer__tagline {
  font-size: 14px;
  color: var(--grey-3);
  line-height: 1.7;
}
.footer__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer__col-head {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--grey-3);
  margin-bottom: 8px;
}
.footer__col-link {
  font-size: 14px;
  color: var(--paper);
  transition: color .25s;
}
.footer__col-link:hover { color: var(--red); }
.footer__messengers {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.footer__msg {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--border-2);
  clip-path: polygon(
    6px 0, 100% 0,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%, 0 6px
  );
  transition: background .3s var(--ease-ui), border-color .3s, color .3s;
}
.footer__msg:hover { background: var(--red); border-color: var(--red); color: #fff; }
.footer__col--cta {
  gap: 20px;
}
.footer__cert {
  font-size: 12px;
  color: var(--grey-4);
  line-height: 1.6;
}
.footer__bottom {
  border-top: 1px solid var(--border);
  padding: 20px var(--pad) 32px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-size: 12px;
  color: var(--grey-4);
}
.footer__bottom a:hover { color: var(--paper); }

/* ── Анимации появления ─────────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s var(--ease-out), transform .9s var(--ease-out);
}
[data-reveal].revealed { opacity: 1; transform: translateY(0); }

[data-reveal-card] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s var(--ease-out), transform .9s var(--ease-out);
}
[data-reveal-card].revealed { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  [data-reveal], [data-reveal-card] { opacity: 1; transform: none; }
}
