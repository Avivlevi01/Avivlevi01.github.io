(() => {
  'use strict';

  /* ================= CONFIG ================= */
  const EMAIL = 'avivlevi01@gmail.com';
  const WA_NUMBER = '972527503577';
  // Optional: paste a Formspree (or similar) endpoint here, e.g. 'https://formspree.io/f/xxxxxxx'
  // to receive messages straight to your inbox without opening the visitor's mail app.
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwnKayP6BIgAChKBg3mqEMS649JdTRqzwxejbIA4qgGAioXt-QriwD7bB8v_7bne7Vx3Q/exec';   // owner's Google Apps Script web app: emails the message; falls back to mailto: if it fails

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = (fn) => { try { return fn(); } catch (_) { return null; } };

  /* ================= i18n (Hebrew is the default markup) ================= */
  const EN = {
    skip: 'Skip to content',
    brand: 'Aviv Levi', brand2: 'Aviv Levi', brand3: 'Aviv Levi',
    'nav.about': 'About', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.journey': 'Journey', 'nav.contact': 'Contact', 'nav.cv': 'Resume',
    'hero.status': 'Open to opportunities',
    'hero.hello': 'Hi, I’m',
    'hero.name': 'Aviv Levi',
    'hero.sub': 'Software developer, Computer Science graduate with honors and a veteran of a technology unit. I bring a systems-level understanding from the worlds of NOC and communications, fast learning and a hunger to deliver. I’m looking for an advanced environment where I can build, challenge myself, and succeed together with the team.',
    'hero.cta1': 'Let’s talk', 'hero.cta2': 'Download resume (PDF)',
    'hero.loc': 'Tel Aviv · Ramat Gan · Givatayim',
    'st.gpa': 'GPA · B.Sc. Computer Science (HIT)',
    'st.lang': 'Programming languages: Python, JavaScript, TypeScript, Java, C#, C++, C',
    'st.proj': 'Featured projects',
    'st.ops': 'Operational experience in mission-critical systems',
    'about.title': 'About me',
    'about.who': 'Junior Full-Stack Developer · HIT graduate',
    'about.p1': 'I’m Aviv, a junior developer who loves challenges, people and solving problems. I completed a B.Sc. in Computer Science at HIT (GPA 86+), including an Erasmus+ semester at the University of Innsbruck in Austria.',
    'about.p2': 'Before I started developing, I worked at the heart of mission-critical systems: managing network incidents in the IDF Intelligence Corps and in an operations center at the Ministry of National Security. There I learned responsibility, precision and working under pressure — and that’s what I bring to software development.',
    'about.p3': 'I don’t have professional development experience yet, and I’m upfront about it. What I do have: a strong foundation, a real portfolio on GitHub, and a huge drive to learn and make an impact.',
    'vision.t': 'The vision',
    'vision.q': 'The world is evolving, and I want to evolve with it. I see today’s era as an opportunity to create bigger things, and I’m here to move forward with progress and create value.',
    'vision.s': 'This is only the beginning. The sky is the limit.',
    'vision.l1': 'First preference: Tel Aviv · Ramat Gan · Givatayim',
    'vision.l2': 'Second preference: the rest of Gush Dan',
    'vision.l3': 'Open to hybrid and remote work',
    'proj.title': 'Projects',
    'proj.sub': 'Personal and academic projects. These aren’t live products with users — they’re a portfolio that shows how I think, build and test. And it’s only the beginning.',
    'p1.d': 'A FastAPI todo app with a complete automated test suite: UI (E2E) tests and REST API tests (full CRUD plus negative cases like 404). Page Object pattern with data-testid locators, isolated fixtures, cross-browser runs (Chromium, Firefox, WebKit) and GitHub Actions CI on every push.',
    'p.code': 'View code on GitHub',
    'p2.wip': 'In progress',
    'p2.d': 'A two-player card game inspired by Dominion, written in Python. Each player has its own strategy (random buying versus buying the most expensive card), and 100 games decide the winner. The focus is architecture: separating game logic from player strategy and managing state across multiple classes. The README openly documents the known issues too, because that’s how real engineering works.',
    'p4.d': 'A private web app for friends to track fitness personal records: log weight, reps, time and distance, see a progress chart that flags new personal bests, a per-exercise leaderboard and a workout timer. Built with FastAPI and PostgreSQL in a single Docker container, with Alembic migrations, pytest tests, invite-code registration and a bilingual UI with RTL support.',
    'p3.d': 'Final project for a machine learning course at the University of Innsbruck (Erasmus+), built together with a classmate. A comparison of a CNN and logistic regression for classifying sign language into 36 classes.',
    'p3.priv': 'Code is private for academic integrity',
    'more.t': 'More from my notebook',
    'm1.t': 'Titanic statistical analysis', 'm1.d': 'Data exploration and statistics on the Titanic passengers, to understand which factors affected survival.',
    'm.nogit': 'No GitHub repo yet',
    'm2.t': 'Physics: open windows & fuel use', 'm2.d': 'Research into a physics theory on how much opening car windows affects fuel consumption, using calculations and Python code.',
    'm3.t': 'The next project is on its way', 'm3.d': 'I’m always building. More projects will land here — follow along on GitHub.',
    'skills.title': 'Skills & technologies',
    'sk.lang': 'Programming languages', 'sk.be': 'Backend & APIs', 'sk.qa': 'Testing & quality', 'sk.dev': 'DevOps & tools', 'sk.con': 'Concepts', 'sk.hum': 'Spoken languages',
    'sk.he': 'Hebrew (native)', 'sk.en': 'English (high proficiency)',
    'bring.t': 'What I bring with me',
    'b1.t': 'Systems thinking', 'b1.d': 'Years of monitoring and investigating faults in critical networks taught me how the parts of a system affect one another.',
    'b2.t': 'A quality mindset', 'b2.d': 'My test suite runs automatically on every push. I write code that proves it works.',
    'b3.t': 'Communication & documentation', 'b3.d': 'I wrote SOPs, worked with R&D and DevOps teams, and trained new operators.',
    'b4.t': 'Fast learning', 'b4.d': 'From IDF Python and networking courses to a degree and an Erasmus+ semester abroad: I get into new things and move fast.',
    'j.title': 'My journey', 'j.exp': 'Experience', 'j.edu': 'Education',
    'j1.org': 'Ministry of National Security',
    'j1.a': 'Operated complex mission-critical C2 systems in a dynamic 24/7 emergency-response environment, working methodically under pressure.',
    'j1.b': 'Improved cross-system workflows and authored precise Standard Operating Procedures (SOPs).',
    'j1.c': 'Led onboarding programs and direct training for incoming operators.',
    'j2.org': 'IDF · Intelligence Corps · Sapir Array',
    'j2.a': 'Monitored core network systems 24/7, detecting and isolating faults in critical infrastructure.',
    'j2.b': 'Investigated and resolved tier-2/3 incidents under strict SLAs: gathering evidence, documenting findings and validating fixes with R&D and DevOps teams.',
    'j2.c': 'Led a shift team; completed internal IDF Network Administration and Python programming courses.',
    'j3.a': 'Personalized tutoring for middle and high school students.',
    'e2.t': 'Academic exchange semester (Erasmus+)', 'e2.org': 'University of Innsbruck, Austria',
    'e2.a': 'Including a final machine learning project (sign language classification).',
    'e1.t': 'B.Sc. in Computer Science', 'e1.org': 'HIT · Holon Institute of Technology',
    'e1.a': 'GPA 86+. Strong foundation in Python, JavaScript, TypeScript, Java and C#.',
    'reco.title': 'What others say',
    'reco.q1': 'Throughout his time at the center, Aviv demonstrated exceptional excellence, professionalism and commitment, and contributed significantly to the operations center.',
    'reco.q2': 'Aviv initiates work processes and is always looking for ways to improve, streamline and add value to the organization. He is a personal example for the operators, both in his professional approach and in his personal conduct.',
    'reco.by': 'Avital Leiba, Manager',
    'reco.org': 'Ministry of National Security · Recommendation letter, 24 Nov 2025',
    'reco.cta': 'Read the full letter (PDF)',
    'reco.note': 'Quoted in translation from the original Hebrew letter.',
    'bey.title': 'Beyond the code', 'bey.sub': 'People and challenges drive me, on and off the screen.',
    't1.t': 'MDA volunteer', 't1.d': 'An active Magen David Adom volunteer, and over the years I’ve volunteered in many other places too.',
    't2.t': 'CrossFit & HYROX', 't2.d': 'I’ve competed in both as an amateur. Discipline, persistence and small improvements every session.',
    't3.t': 'Running & climbing', 't3.d': 'One step at a time to the summit. The same approach I bring to code.',
    't4.t': 'Snow, mountains & treks', 't4.d': 'That’s where I recharge — and where the vibe of this page comes from.',
    'c.title': 'Let’s climb together',
    'c.sub': 'Looking for a junior full-stack developer who learns fast, takes ownership and comes from a mission-critical background? I’d love to hear about the role and the team. Leave your details and I’ll get back to you.',
    'f.name': 'Full name', 'f.company': 'Company (optional)', 'f.email': 'Email', 'f.msg': 'Message',
    'f.send': 'Send by email', 'f.wa': 'Send on WhatsApp',
    'sc.k': 'The next summit', 'sc.t': 'A team that dares to climb higher',
    foot: 'Hand-built, inspired by the Alps'
  };

  const T = {
    he: {
      title: 'אביב לוי | Full-Stack Developer', dir: 'rtl', btn: 'EN',
      invalid: 'נא למלא שם, אימייל תקין והודעה.',
      opened: 'אפליקציית האימייל שלך נפתחה עם ההודעה מוכנה. תודה!',
      sent: 'ההודעה נשלחה, תודה! אחזור אליך בהקדם.',
      fail: 'משהו השתבש. אפשר לכתוב לי ישירות ל-' + EMAIL,
      copied: 'הועתק!',
      subject: (n) => 'פנייה מאתר התדמית' + (n ? ' – ' + n : ''),
      wa: (n, c, m) => 'שלום אביב, ' + (n ? 'אני ' + n + (c ? ' מ-' + c : '') + '. ' : 'ראיתי את האתר שלך. ') + (m || 'אשמח לשוחח.')
    },
    en: {
      title: 'Aviv Levi | Full-Stack Developer', dir: 'ltr', btn: 'עב',
      invalid: 'Please fill in your name, a valid email and a message.',
      opened: 'Your email app opened with the message ready. Thank you!',
      sent: 'Message sent, thank you! I’ll get back to you soon.',
      fail: 'Something went wrong. You can email me directly at ' + EMAIL,
      copied: 'Copied!',
      subject: (n) => 'Message from your portfolio' + (n ? ' – ' + n : ''),
      wa: (n, c, m) => 'Hi Aviv, ' + (n ? 'I’m ' + n + (c ? ' from ' + c : '') + '. ' : 'I saw your portfolio. ') + (m || 'I’d love to chat.')
    }
  };

  let lang = 'he';
  // Cache the original Hebrew markup so we can switch back.
  $$('[data-i18n]').forEach((el) => { el.dataset.he = el.innerHTML; });

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    document.documentElement.dir = T[next].dir;
    document.title = T[next].title;
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (next === 'he') el.innerHTML = el.dataset.he;
      else if (EN[k] !== undefined) el.textContent = EN[k];
    });
    $('#langBtn').textContent = T[next].btn;
    safe(() => localStorage.setItem('lang', next));
    $('#formStatus').textContent = '';
  }

  $('#langBtn').addEventListener('click', () => applyLang(lang === 'he' ? 'en' : 'he'));
  const saved = safe(() => localStorage.getItem('lang'));
  if (saved === 'en') applyLang('en');

  /* ================= Nav ================= */
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    nav.classList.toggle('solid', open || window.scrollY > 40);
  });
  $$('#menu a').forEach((a) => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));

  /* ================= Mountains (seeded midpoint displacement) ================= */
  function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ridge(seed, bottomY, height, rough, n = 128) {
    const r = mulberry(seed), h = new Array(n + 1).fill(0);
    h[0] = r(); h[n] = r();
    let step = n, scale = 1;
    while (step > 1) {
      const half = step / 2;
      for (let i = half; i < n; i += step) h[i] = (h[i - half] + h[i + half]) / 2 + (r() * 2 - 1) * scale;
      scale *= rough; step = half;
    }
    const min = Math.min(...h), max = Math.max(...h);
    let d = 'M0 400'; const pts = [];
    for (let i = 0; i <= n; i++) {
      const x = i * 1440 / n, y = bottomY - (h[i] - min) / (max - min) * height;
      pts.push([x, y]); d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return { d: d + ' L1440 400Z', pts };
  }
  const r1 = $('#r1'), r2 = $('#r2'), r3 = $('#r3'), heroWrap = $('#heroHikerWrap');
  const R1 = ridge(7, 330, 270, 0.56), R2 = ridge(21, 345, 190, 0.52), R3 = ridge(5, 372, 70, 0.5);
  r1.setAttribute('d', R1.d); r2.setAttribute('d', R2.d); r3.setAttribute('d', R3.d);

  /* ================= Little hiker sprite (faces right, feet at ~22,53) ================= */
  const HIKER = `<g class="bob">
    <path class="pole" d="M27 27L35 54" stroke="#0A1F5C" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <g class="leg back"><rect x="19" y="34" width="6" height="17" rx="3" fill="#0A1F5C"/><rect x="18" y="48" width="9" height="5" rx="2.5" fill="#06143F"/></g>
    <rect x="9" y="16" width="11" height="17" rx="4.5" fill="#1F5BFF"/>
    <rect x="14" y="15" width="14" height="21" rx="6" fill="#FF8A4C"/>
    <g class="leg front"><rect x="19" y="34" width="6" height="17" rx="3" fill="#123FB8"/><rect x="18" y="48" width="9" height="5" rx="2.5" fill="#06143F"/></g>
    <path class="arm-walk" d="M23 20L28 28" stroke="#E5702F" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <g class="arm-look"><path d="M23 20L31 17L29 9" stroke="#E5702F" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="29" cy="8.5" r="2.6" fill="#F2C9A0"/></g>
    <circle cx="23" cy="9" r="6.5" fill="#F2C9A0"/>
    <path d="M16 9a7 7 0 0 1 14 0z" fill="#fff"/>
    <rect x="16.3" y="7" width="13.4" height="2.4" fill="#1F5BFF"/>
    <circle cx="23" cy="2.2" r="2" fill="#fff"/>
    <circle cx="26.5" cy="11.5" r=".9" fill="#0B1B3A"/>
  </g>`;
  $$('.hiker-slot').forEach((g) => { g.innerHTML = HIKER; });
  const placeHiker = (g, x, y, deg, s, flip) => g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(${flip ? -s : s} ${s}) translate(-22 -53)`);

  /* ================= Scroll: nav, parallax ================= */
  const hero = $('.hero');
  let ticking = false, heroVisible = true;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('solid', y > 40 || menu.classList.contains('open'));
    if (!reduceMotion && y < hero.offsetHeight) {
      [r1, r2, heroWrap, r3].forEach((p) => { p.style.transform = `translateY(${(y * parseFloat(p.dataset.speed)).toFixed(1)}px)`; });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);

  /* ================= Hero: a tiny, quiet hiker climbs the mountains behind the snow ================= */
  (function heroHiker() {
    const slot = $('#heroHiker'), OP = 0.55, S = 0.55;
    const raw = R2.pts, n = raw.length;
    const sm = raw.map((p, i) => { let s = 0, c = 0; for (let k = -3; k <= 3; k++) { const q = raw[i + k]; if (q) { s += q[1]; c++; } } return [p[0], s / c]; });

    // y of the front (white) ridge at a given x, so the hiker never walks "inside" it.
    const front = (x) => { const f = R3.pts, i = Math.min(f.length - 2, Math.max(0, Math.floor(x / 1440 * (f.length - 1)))); const t = (x - f[i][0]) / ((f[i + 1][0] - f[i][0]) || 1); return f[i][1] + (f[i + 1][1] - f[i][1]) * t; };

    // Find peaks, and for each one a climbing route up its left slope and up its right slope.
    const routes = [];
    const collect = (minRise) => {
      routes.length = 0;
      for (let i = 8; i < n - 8; i++) {
        let isPeak = sm[i][0] > 100 && sm[i][0] < 1340;
        for (let k = Math.max(0, i - 10); k <= Math.min(n - 1, i + 10) && isPeak; k++) if (sm[k][1] < sm[i][1]) isPeak = false;
        if (!isPeak) continue;
        for (const side of [-1, 1]) {
          let low = i;
          // walk down the slope from the peak until the first valley, so the route is a pure climb
          for (let k = 1; k <= 60; k++) { const q = i + side * k; if (q < 0 || q >= n) break; if (sm[q][1] >= sm[low][1]) low = q; else if (sm[low][1] - sm[q][1] > 4) break; }
          if (sm[low][1] - sm[i][1] < minRise || Math.abs(low - i) < 12) continue;
          let seg = []; for (let q = low; q !== i + side * -1; q += side * -1) seg.push(raw[q]);
          const k0 = seg.findIndex((p) => p[1] < front(p[0]) - 6);     // first point that is clearly above the front snow ridge
          if (k0 < 0) continue;
          seg = seg.slice(k0);
          if (seg.length < 8) continue;
          const cum = [0]; for (let q = 1; q < seg.length; q++) cum.push(cum[q - 1] + Math.hypot(seg[q][0] - seg[q - 1][0], seg[q][1] - seg[q - 1][1]));
          routes.push({ seg, cum, total: cum[cum.length - 1], flip: side > 0 });
        }
      }
    };
    collect(45); if (routes.length < 4) collect(25);
    if (!routes.length) return;

    const at = (r, d) => {
      let i = 1; while (i < r.cum.length - 1 && r.cum[i] < d) i++;
      const t = (d - r.cum[i - 1]) / ((r.cum[i] - r.cum[i - 1]) || 1), a = r.seg[i - 1], b = r.seg[i];
      const w0 = r.seg[Math.max(0, i - 4)], w1 = r.seg[Math.min(r.seg.length - 1, i + 3)], dx = w1[0] - w0[0] || 0.001;
      return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, ang: Math.max(-35, Math.min(35, Math.atan((w1[1] - w0[1]) / dx) * 180 / Math.PI)) };
    };
    let route = routes[(Math.random() * routes.length) | 0], lastRoute = route;
    const put = (d) => { const p = at(route, Math.min(route.total, Math.max(0, d))); placeHiker(slot, p.x, p.y + 0.6, p.ang * 0.9, S, route.flip); };
    if (reduceMotion) { slot.classList.add('arrived'); put(route.total); slot.style.opacity = OP; return; }

    const SPEED = 28, REST = 3200, FADE = 900, WAIT = 700;       // SPEED in viewBox units per second
    let phase = 'walk', t = 0, last = performance.now();
    const walkMs = () => Math.max(9000, route.total / SPEED * 1000);
    (function frame(now) {
      const dt = Math.min(100, now - last); last = now;
      if (heroVisible) {
        t += dt;
        if (phase === 'walk') {
          slot.classList.add('walk'); slot.classList.remove('arrived');
          const W = walkMs(); put(t / W * route.total);
          slot.style.opacity = OP * Math.min(1, t / 1200);
          if (t >= W) { phase = 'rest'; t = 0; }
        } else if (phase === 'rest') {
          slot.classList.remove('walk'); slot.classList.add('arrived'); put(route.total); slot.style.opacity = OP;
          if (t >= REST) { phase = 'fade'; t = 0; }
        } else if (phase === 'fade') {
          slot.style.opacity = OP * (1 - Math.min(1, t / FADE));
          if (t >= FADE) { phase = 'wait'; t = 0; }
        } else if (t >= WAIT) {                                   // pick a different place to climb from
          do { route = routes[(Math.random() * routes.length) | 0]; } while (routes.length > 1 && route === lastRoute);
          lastRoute = route; slot.classList.remove('arrived'); put(0); phase = 'walk'; t = 0;
        }
      }
      requestAnimationFrame(frame);
    })(last);
  })();

  /* ================= Reveal on scroll + counters ================= */
  $$('.cards, .skill-grid, .bring, .tiles, .mini-cards').forEach((g) => $$('.reveal', g).forEach((el, i) => el.style.setProperty('--d', (i * 0.08) + 's')));

  function countUp(el) {
    const to = +el.dataset.to, suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = to + suffix; return; }
    const t0 = performance.now(), dur = 1200;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // Manual check (instead of IntersectionObserver, which can stall in background / hidden views and leave the page blank).
  let pending = $$('.reveal');
  let revealTimer = null;
  function checkReveal() {
    if (!pending.length) { clearInterval(revealTimer); return; }
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < vh - 40) {
        el.classList.add('in');
        $$('.count', el).forEach(countUp);
        return false;
      }
      return true;
    });
  }
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal);
  window.addEventListener('load', checkReveal);
  document.addEventListener('visibilitychange', checkReveal);
  revealTimer = setInterval(checkReveal, 400);
  checkReveal();

  /* ================= Projects carousel (scroll-snap track, arrows, dots) ================= */
  (function carousel() {
    const track = $('#projCarousel .cards'), bL = $('#carL'), bR = $('#carR'), dotsBox = $('#carDots');
    if (!track || !bL || !bR || !dotsBox) return;
    const cards = Array.from(track.children), rtl = () => document.documentElement.dir === 'rtl';
    const gap = () => parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = () => cards[0].getBoundingClientRect().width + gap();
    const pos = () => Math.abs(track.scrollLeft);                       // distance from the start edge, in both LTR and RTL
    const maxPos = () => track.scrollWidth - track.clientWidth;
    const pages = () => Math.max(1, Math.round(maxPos() / step()) + 1);
    const goTo = (i) => track.scrollTo({ left: (rtl() ? -1 : 1) * Math.min(i * step(), maxPos()), behavior: reduceMotion ? 'auto' : 'smooth' });
    const by = (dir) => track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });   // dir: +1 = view moves right (physical)

    let dots = [];
    function buildDots() {
      const n = pages();
      if (dots.length === n) return;
      dotsBox.textContent = '';
      dots = Array.from({ length: n }, (_, i) => {
        const d = document.createElement('button');
        d.type = 'button'; d.className = 'car-dot';
        d.addEventListener('click', () => goTo(i));
        dotsBox.appendChild(d); return d;
      });
    }
    function update() {
      buildDots();
      const he = document.documentElement.lang === 'he';
      bL.setAttribute('aria-label', he ? (rtl() ? 'הבא' : 'הקודם') : (rtl() ? 'Next' : 'Previous'));
      bR.setAttribute('aria-label', he ? (rtl() ? 'הקודם' : 'הבא') : (rtl() ? 'Previous' : 'Next'));
      track.setAttribute('aria-label', he ? 'פרויקטים' : 'Projects');
      const p = pos(), m = maxPos(), idx = Math.min(dots.length - 1, Math.round(p / step()));
      const atStart = p <= 2, atEnd = p >= m - 2;
      bR.disabled = rtl() ? atStart : atEnd;                              // right arrow moves the view right: toward the start in RTL
      bL.disabled = rtl() ? atEnd : atStart;
      dots.forEach((d, i) => { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); d.setAttribute('aria-label', (he ? 'עמוד ' : 'Page ') + (i + 1)); });
      const t = track.getBoundingClientRect();                            // cards sliding out of view shrink and fade a little
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const v = Math.max(0, Math.min(1, (Math.min(r.right, t.right) - Math.max(r.left, t.left)) / r.width));
        c.style.setProperty('--v', v > 0.97 ? 1 : v.toFixed(3));
      });
    }
    const queue = update;                                                 // scroll events already fire once per frame, so no extra rAF layer
    bR.addEventListener('click', () => by(1));
    bL.addEventListener('click', () => by(-1));
    track.addEventListener('scroll', queue, { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); by(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1); }
    });
    window.addEventListener('resize', queue);
    window.addEventListener('load', queue);
    const lb = $('#langBtn');
    if (lb) lb.addEventListener('click', () => setTimeout(() => { track.scrollTo({ left: 0, behavior: 'auto' }); update(); }, 60));
    update();
    setTimeout(update, 600);                                              // after fonts/layout settle
  })();

  /* ================= Snow (soft, quiet white drops) ================= */
  const canvas = $('#snow');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, flakes = [], dpr = 1;
    const mk = (anywhere) => ({ x: Math.random() * w, y: anywhere ? Math.random() * h : -10, r: Math.random() * 1.6 + .5, vy: Math.random() * .45 + .2, ph: Math.random() * 6.28, a: Math.random() * .3 + .18 });
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flakes = Array.from({ length: Math.round(Math.min(70, w / 16)) }, () => mk(true));
    };
    let t = 0;
    (function frame() {
      if (heroVisible) {
        ctx.clearRect(0, 0, w, h); t += .01;
        for (const f of flakes) {
          f.y += f.vy; f.x += Math.sin(t + f.ph) * .25;
          if (f.y > h + 10) Object.assign(f, mk(false), { x: Math.random() * w });
          ctx.globalAlpha = f.a; ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(frame);
    })();
    resize();
    window.addEventListener('resize', resize);
  }

  /* ================= Summit scene: climb, arrive, look at the next peak ================= */
  (function summit() {
    const scene = $('#scene'), me = $('#summiter'), path = $('#climbPath');
    if (!scene || !me || !path) return;
    const len = path.getTotalLength(), S = 0.95;
    const put = (L, flat) => {
      const p = path.getPointAtLength(L), a = path.getPointAtLength(Math.max(0, L - 6)), b = path.getPointAtLength(Math.min(len, L + 6));
      placeHiker(me, p.x, p.y, flat ? 0 : Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI * 0.85, S);
    };
    const arrive = () => { me.classList.remove('walk'); put(len, true); me.classList.add('arrived'); scene.classList.add('arrived'); };
    put(0);
    const go = () => {
      if (reduceMotion) return arrive();
      me.classList.add('walk');
      const t0 = performance.now(), D = 7000;
      (function step(now) {
        const p = Math.min(1, (now - t0) / D), e = 0.5 - Math.cos(Math.PI * p) / 2;
        put(len * e);
        if (p < 1) requestAnimationFrame(step); else arrive();
      })(t0);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.45 });
      io.observe(scene);
    } else arrive();
  })();

  /* ================= Contact ================= */
  $('#year').textContent = new Date().getFullYear();

  $('#copyMail').addEventListener('click', async () => {
    const ok = await safe(() => navigator.clipboard.writeText(EMAIL));
    const el = $('#copied');
    el.textContent = ok === null ? '' : T[lang].copied;
    setTimeout(() => { el.textContent = ''; }, 1800);
  });

  const form = $('#contactForm'), status = $('#formStatus');
  const val = (n) => form.elements[n].value.trim();
  const say = (msg, bad) => { status.textContent = msg; status.classList.toggle('bad', !!bad); };

  function validate() {
    const bad = [];
    if (!val('name')) bad.push('name');
    if (!/^\S+@\S+\.\S+$/.test(val('email'))) bad.push('email');
    if (!val('message')) bad.push('message');
    ['name', 'email', 'message'].forEach((n) => form.elements[n].classList.toggle('err', bad.includes(n)));
    if (bad.length) { say(T[lang].invalid, true); form.elements[bad[0]].focus(); }
    return !bad.length;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const name = val('name'), company = val('company'), email = val('email'), message = val('message');
    if (FORM_ENDPOINT) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        // text/plain keeps this a "simple" request, so the browser skips the CORS preflight that Apps Script can't answer
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ name, company, email, message, _subject: T[lang].subject(name), _honeypot: form.elements._honeypot.value }) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== 'true') throw new Error(res.status);
        form.reset(); say(T[lang].sent); btn.disabled = false;
        return;
      } catch (_) { btn.disabled = false; /* fall through to the visitor's mail app */ }
    }
    const body = message + '\n\n— ' + name + (company ? ' (' + company + ')' : '') + '\n' + email;
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(T[lang].subject(name)) + '&body=' + encodeURIComponent(body);
    say(T[lang].opened);
  });

  $('#waBtn').addEventListener('click', () => {
    form.elements.name.classList.remove('err');
    const text = T[lang].wa(val('name'), val('company'), val('message'));
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
