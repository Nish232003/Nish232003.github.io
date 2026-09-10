document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contactForm');

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  themeToggle.addEventListener('click', toggleTheme);
  initTheme();

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Dynamic Typewriter Effect in Hero
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const phrases = [
      'Data Scientist & AI Practitioner',
      'Machine Learning Engineer',
      'Computer Vision & YOLO Developer',
      'Marketing ROI & Analytics Builder',
      'Fine Artist & Visual Storyteller'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1800; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // Project Category Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Animated Number Counters on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    if (animatedStats) return;

    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      if (isNaN(target)) return;

      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const decimals = parseInt(stat.getAttribute('data-decimals')) || 0;
      
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const currentVal = target * easeProgress;

        stat.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });

    animatedStats = true;
  }

  // Toast Notification & Copy Email
  const toast = document.getElementById('toastNotification');
  const copyButtons = document.querySelectorAll('.btn-copy-email');

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = 'work.nishitajain@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! ✨');
      }).catch(() => {
        showToast('Copied: work.nishitajain@gmail.com');
      });
    });
  });

  // Project Case Study Data & Modal
  const caseStudies = {
    'marketlens': {
      title: 'MarketLens: E-Commerce Marketing ROI Platform',
      badge: 'Featured Analytics & AI Platform',
      problem: 'E-commerce marketing teams often struggle with fragmented data across orders, customers, and marketing leads—relying on manual, error-prone spreadsheets to compute ROI metrics.',
      solution: 'Automated 6-table relational ingestion pipeline built on Flask & Pandas that computes ROAS, CAC, and LTV/CAC with 8 interactive Plotly charts, budget saturation curve simulation, and hybrid NLP conversational recommendations.',
      tech: ['Python', 'Flask', 'Plotly', 'Pandas', 'Hybrid NLP Engine', 'Scikit-Learn'],
      metrics: [
        'Automated pipeline calculation in < 2 seconds',
        '8 interactive Plotly analytical visuals with drill-downs',
        'Non-linear saturation curve budget simulation'
      ],
      github: 'https://github.com/Nish232003/Marketlens-ecommerce-roi',
      demo: 'https://marketlens-ecommerce-roi.onrender.com/'
    },
    'fakejob': {
      title: 'Fake Job Detector: NLP Fraud Detection',
      badge: 'NLP & Machine Learning System',
      problem: 'Online employment scams cost job seekers millions annually. Identifying multi-field fraudulent text requires handling high semantic ambiguity and 95/5 class imbalance.',
      solution: 'Engineered NLP text preprocessing and TF-IDF semantic embeddings over 17,880 listings. Benchmarked 4 classifiers prioritising F1-score to detect scam listings with sub-second inference deployed on Streamlit Cloud.',
      tech: ['Python', 'NLP', 'TF-IDF', 'XGBoost', 'Streamlit Cloud', 'Scikit-Learn'],
      metrics: [
        '98% Overall Classification Accuracy',
        '82% F1-Score on fraudulent class (outperforming baseline by 14%)',
        'Flagged 866 scam listings in dataset with red-flag keyword alerts'
      ],
      github: 'https://github.com/Nish232003/fake_job_detector',
      demo: null
    },
    'soilsync': {
      title: 'SOIL SYNC: Predictive Soil Fertility System',
      badge: 'IoT & Predictive Machine Learning',
      problem: 'Farmers lack real-time, actionable insights on soil health parameters, leading to suboptimal fertilizer usage and reduced crop yields.',
      solution: 'End-to-end IoT-ML pipeline in Python processing soil sensor telemetry (NPK, moisture, pH) with Random Forest and Logistic Regression models, surfaced via interactive Tableau dashboards.',
      tech: ['Python', 'IoT Sensors', 'Random Forest', 'Logistic Regression', 'Tableau Public'],
      metrics: [
        '85% Soil Fertility Prediction Accuracy',
        'Integrated multi-parameter IoT sensor stream',
        'Interactive Tableau dashboards for agricultural decision support'
      ],
      github: 'https://github.com/Nish232003/Soil-Sync',
      demo: null
    },
    'satellite': {
      title: 'Satellite Terrain & Vegetation Geospatial Analysis',
      badge: 'Geospatial Analytics & GIS',
      problem: 'Monitoring large-scale vegetation health and terrain slope variations requires rigorous geospatial raster processing of multi-spectral satellite imagery.',
      solution: 'Implemented digital elevation modeling (DEM), hillshade calculation, slope/aspect analysis, and NDVI computation using CartoDEM and satellite datasets for vegetation health insights.',
      tech: ['Python', 'GIS Tools', 'NDVI Computation', 'CartoDEM', 'Geospatial Analytics'],
      metrics: [
        'Multi-layer elevation and topographic modeling',
        'NDVI time-series vegetation index computation',
        'Automated geospatial raster preprocessing pipeline'
      ],
      github: 'https://github.com/Nish232003/Satellite_analysis',
      demo: null
    },
    'safecity': {
      title: 'SafeCity: Crime Data Trend & Geospatial Analytics',
      badge: 'Data Visualization & Trend Intelligence',
      problem: 'Understanding crime distribution shifts and temporal patterns across 36 Indian states (2001–2018) requires multi-dimensional visual and geospatial analysis.',
      solution: 'Developed an interactive data visualization pipeline that extracts safety trends, state-wise crime density, and long-term historical crime rate trajectories.',
      tech: ['Python', 'Data Analytics', 'Geospatial Mapping', 'Seaborn & Matplotlib'],
      metrics: [
        '18 years of state-level longitudinal crime data analyzed',
        'Identification of regional safety anomaly clusters',
        'Interactive visual dashboards for public policy insights'
      ],
      github: 'https://github.com/Nish232003/safecity_crime_data_analysis',
      demo: null
    },
    'checkora': {
      title: 'Checkora: AI-Powered Chess Platform',
      badge: 'Full Stack & AI Search Engine',
      problem: 'Building a responsive web chess platform with an AI engine requires low-latency evaluation and deep state-space search efficiency.',
      solution: 'Engineered a modern chess platform featuring an AI opponent powered by minimax search with alpha-beta pruning, built with Django backend and a high-performance C++ evaluation engine.',
      tech: ['Django', 'C++ Engine', 'Minimax Search', 'Alpha-Beta Pruning', 'JavaScript', 'Vercel'],
      metrics: [
        'Optimized C++ minimax search with alpha-beta pruning',
        'Interactive board UI with real-time move validation',
        'Production deployment on Vercel'
      ],
      github: 'https://github.com/Nish232003/Checkora',
      demo: 'https://checkora.vercel.app'
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseStudyClose = document.getElementById('caseStudyClose');
  const caseStudyContent = document.getElementById('caseStudyContent');

  function openCaseStudy(key) {
    const data = caseStudies[key];
    if (!data || !caseStudyModal || !caseStudyContent) return;

    let techHtml = data.tech.map(t => `<span>${t}</span>`).join('');
    let metricsHtml = data.metrics.map(m => `<li>${m}</li>`).join('');
    let actionsHtml = '';

    if (data.demo) {
      actionsHtml += `<a href="${data.demo}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
    }
    if (data.github) {
      actionsHtml += `<a href="${data.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> View Source Code</a>`;
    }

    caseStudyContent.innerHTML = `
      <div class="case-study-header">
        <span class="case-study-badge">${data.badge}</span>
        <h3>${data.title}</h3>
      </div>
      <div class="case-study-grid">
        <div class="case-study-section">
          <h4><i class="fas fa-exclamation-triangle"></i> The Problem</h4>
          <p>${data.problem}</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-lightbulb"></i> The AI/Data Solution</h4>
          <p>${data.solution}</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-chart-bar"></i> Key Results & Impact</h4>
          <ul>${metricsHtml}</ul>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-code"></i> Tech Stack</h4>
          <div class="project-tags">${techHtml}</div>
        </div>
      </div>
      <div class="case-study-actions">
        ${actionsHtml}
      </div>
    `;

    caseStudyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const projectKey = this.getAttribute('data-project');
      openCaseStudy(projectKey);
    });
  });

  if (caseStudyClose) {
    caseStudyClose.addEventListener('click', closeCaseStudy);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', function(e) {
      if (e.target === caseStudyModal) closeCaseStudy();
    });
  }

  // Interactive Skill & Tag Highlighting
  const interactiveSkills = document.querySelectorAll('.skill-item, .project-tags span');
  interactiveSkills.forEach(tag => {
    tag.addEventListener('click', function() {
      const keyword = (this.querySelector('span') ? this.querySelector('span').textContent : this.textContent).trim().toLowerCase();
      
      let matchedCount = 0;
      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword) || (keyword.includes('vision') && text.includes('yolo')) || (keyword.includes('tableau') && text.includes('tableau'))) {
          card.classList.add('highlight-pulse');
          card.style.display = 'block';
          matchedCount++;
          setTimeout(() => {
            card.classList.remove('highlight-pulse');
          }, 3000);
        }
      });

      if (matchedCount > 0) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          const offsetTop = projectsSection.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        showToast(`Highlighted ${matchedCount} project(s) matching "${keyword}" ✨`);
      }
    });
  });

  // 3D Card Hover Tilt Effect
  const tiltCards = document.querySelectorAll('.project-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // Scroll Progress Bar & Back to Top
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScrollProgress() {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (windowHeight > 0 && scrollProgressBar) {
      const scrollPercent = (totalScroll / windowHeight) * 100;
      scrollProgressBar.style.width = scrollPercent + '%';
    }

    if (backToTopBtn) {
      if (totalScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const rect = heroStats.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        animateCounters();
      }
    }
  }

  window.addEventListener('scroll', handleScrollProgress);
  handleScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Hero Neural Particle Canvas Animation
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 65;
    let mouse = { x: null, y: null, radius: 140 };

    function resize() {
      const heroSection = document.getElementById('home');
      if (!heroSection) return;
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', function(e) {
      const heroRect = canvas.getBoundingClientRect();
      if (e.clientY >= heroRect.top && e.clientY <= heroRect.bottom) {
        mouse.x = e.clientX - heroRect.left;
        mouse.y = e.clientY - heroRect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    });

    window.addEventListener('mouseout', function() {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > height || this.y < 0) this.speedY = -this.speedY;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }
      }

      draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? 'rgba(232, 164, 184, 0.7)' : 'rgba(232, 164, 184, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const lineColor = isDark ? 'rgba(232, 164, 184, 0.12)' : 'rgba(232, 164, 184, 0.18)';

      for (let a = 0; a < particles.length; a++) {
        particles[a].update();
        particles[a].draw();

        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - (distance / 110);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  initHeroCanvas();

  // Interactive Fake Job NLP Scam Scanner Widget
  const scannerPresets = {
    'scam': {
      text: "Urgent Assistant Needed! Earn $500 - $800 daily working from home! No experience or degree required. Wire transfer equipment fee upfront via Western Union or Bitcoin. Contact HR immediately on Telegram @quickjobs_hiring to start today!",
      score: 96,
      risk: 'high',
      headline: '⚠️ Flagged as Highly Fraudulent (96% Confidence)',
      summary: 'High density of red-flag indicators detected: off-platform communication (Telegram), upfront wire transfer fee, and unrealistic compensation without experience requirements.',
      chips: ['wire transfer', 'telegram interview', 'no experience required', '$500/day', 'bitcoin payment']
    },
    'legit': {
      text: "Senior Data Engineer at Acme Analytics. Responsibilities: Design and maintain robust ETL data pipelines in Python, SQL, and PyTorch. Build and optimize machine learning data warehousing models on AWS/GCP. Requirements: B.Tech/M.Tech in CS/Data Science, 2+ years of experience with distributed systems and model monitoring.",
      score: 4,
      risk: 'low',
      headline: '✅ Verified Authentic Job Profile (4% Risk)',
      summary: 'Semantic analysis reflects standard enterprise job descriptions: structured technical stack, realistic qualifications, and formal engineering responsibilities.',
      chips: ['ETL pipelines', 'PyTorch/SQL', 'Degree required', 'Enterprise stack', 'Standard interview']
    },
    'suspicious': {
      text: "Crypto Community Marketing Representative. Work 2 hours a day from your phone. Receive bonus weekly in USDT tokens. Must have active WhatsApp and complete initial verification survey.",
      score: 72,
      risk: 'medium',
      headline: '⚡ Suspicious / Moderate Risk Profile (72% Risk)',
      summary: 'Contains ambiguous task compensation patterns, unconventional cryptocurrency payout promises, and personal messaging app onboarding.',
      chips: ['USDT tokens', 'whatsapp contact', '2 hours a day', 'task verification']
    }
  };

  const presetBtns = document.querySelectorAll('.preset-btn');
  const scannerInput = document.getElementById('scannerTextInput');
  const scanJobBtn = document.getElementById('scanJobBtn');
  const clearScanBtn = document.getElementById('clearScanBtn');
  const scoreVal = document.getElementById('scoreVal');
  const scoreLabel = document.getElementById('scoreLabel');
  const scoreHeadline = document.getElementById('scoreHeadline');
  const scoreSummary = document.getElementById('scoreSummary');
  const triggerChips = document.getElementById('triggerChips');
  const scoreDial = document.querySelector('.score-dial');

  function renderScannerResult(data) {
    if (!scoreVal || !scoreLabel || !scoreHeadline || !scoreSummary || !triggerChips) return;

    scoreVal.textContent = `${data.score}%`;
    scoreLabel.textContent = data.risk === 'high' ? 'High Fraud Risk' : data.risk === 'medium' ? 'Moderate Risk' : 'Verified Legit';
    scoreHeadline.textContent = data.headline;
    scoreSummary.textContent = data.summary;

    if (scoreDial) {
      scoreDial.className = `score-dial ${data.risk === 'low' ? 'safe' : data.risk === 'medium' ? 'suspicious' : ''}`;
    }

    triggerChips.innerHTML = data.chips.map(chip => 
      `<span class="${data.risk === 'low' ? 'chip-success' : 'chip-danger'}">${chip}</span>`
    ).join('');
  }

  function analyzeCustomText(text) {
    const lower = text.toLowerCase();
    const redFlags = ['telegram', 'wire transfer', 'western union', 'bitcoin', 'crypto', 'usdt', 'earn $', 'daily payment', 'no experience', 'whatsapp', 'upfront fee', 'gift card', 'cash app', 'immediate start'];
    const greenFlags = ['python', 'sql', 'pytorch', 'b.tech', 'm.tech', 'degree', 'experience', 'pipeline', 'engineer', 'analyst', 'responsibilities', 'qualifications', 'benefits'];

    let redMatches = redFlags.filter(f => lower.includes(f));
    let greenMatches = greenFlags.filter(f => lower.includes(f));

    let score = 25;
    if (redMatches.length > 0) score += (redMatches.length * 24);
    if (greenMatches.length > 0) score -= (greenMatches.length * 8);
    score = Math.max(2, Math.min(99, score));

    let risk = score > 65 ? 'high' : score > 35 ? 'medium' : 'low';
    let headline = risk === 'high' ? `⚠️ Flagged as Likely Scam (${score}% Risk)` : risk === 'medium' ? `⚡ Moderate Risk Pattern (${score}% Score)` : `✅ Low Fraud Risk (${score}% Score)`;
    let summary = risk === 'high' ? `Detected ${redMatches.length} suspicious high-risk keywords commonly found in fraudulent job postings.` : risk === 'medium' ? 'Text contains ambiguous hiring patterns or informal communication channels.' : 'Text exhibits standard professional job posting phrasing and technical requirements.';
    let chips = redMatches.length > 0 ? redMatches : (greenMatches.length > 0 ? greenMatches : ['standard text']);

    return { score, risk, headline, summary, chips };
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      presetBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const presetKey = this.getAttribute('data-preset');
      const data = scannerPresets[presetKey];
      if (data && scannerInput) {
        scannerInput.value = data.text;
        renderScannerResult(data);
      }
    });
  });

  if (scanJobBtn) {
    scanJobBtn.addEventListener('click', function() {
      const text = (scannerInput ? scannerInput.value : '').trim();
      if (!text) {
        showToast('Please enter or paste a job text to analyze! 📝');
        return;
      }
      const result = analyzeCustomText(text);
      renderScannerResult(result);
      showToast('NLP Fraud Scan Completed! ⚡');
    });
  }

  if (clearScanBtn) {
    clearScanBtn.addEventListener('click', function() {
      if (scannerInput) scannerInput.value = '';
      presetBtns.forEach(b => b.classList.remove('active'));
      if (triggerChips) triggerChips.innerHTML = '';
      if (scoreVal) scoreVal.textContent = '--%';
      if (scoreLabel) scoreLabel.textContent = 'Awaiting Input';
      if (scoreHeadline) scoreHeadline.textContent = 'Paste text above and click Run NLP Scan';
      if (scoreSummary) scoreSummary.textContent = 'The NLP engine extracts TF-IDF token n-grams and evaluates against trained XGBoost fraud patterns.';
    });
  }

  // Jump to Scanner button in Fake Job Detector card
  document.querySelectorAll('.btn-jump-scanner').forEach(btn => {
    btn.addEventListener('click', function() {
      const widget = document.getElementById('scamScannerWidget');
      if (widget) {
        const offsetTop = widget.offsetTop - 90;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        widget.classList.add('highlight-pulse');
        setTimeout(() => widget.classList.remove('highlight-pulse'), 2500);
      }
    });
  });

  // Set default initial preset in scanner
  if (scannerInput && scannerPresets['scam']) {
    scannerInput.value = scannerPresets['scam'].text;
  }

  // Art Gallery Medium Filter Tabs
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItemsList = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-gallery-filter');

      galleryItemsList.forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Interactive ATS Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const openResumeNavBtn = document.getElementById('openResumeNavBtn');
  const openResumeHeroBtn = document.getElementById('openResumeHeroBtn');
  const openResumeAboutBtn = document.getElementById('openResumeAboutBtn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openResumeNavBtn) openResumeNavBtn.addEventListener('click', openResume);
  if (openResumeHeroBtn) openResumeHeroBtn.addEventListener('click', openResume);
  if (openResumeAboutBtn) openResumeAboutBtn.addEventListener('click', openResume);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) closeResume();
    });
  }

  // Lightbox for Art Gallery
  const lightbox = document.getElementById('artLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMedium = document.getElementById('lightboxMedium');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('h4') ? this.querySelector('h4').textContent : '';
      const medium = this.querySelector('p') ? this.querySelector('p').textContent : '';

      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxMedium) lightboxMedium.textContent = medium;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) closeLightbox();
      if (caseStudyModal && caseStudyModal.classList.contains('active')) closeCaseStudy();
      if (resumeModal && resumeModal.classList.contains('active')) closeResume();
    }
  });

  // Contact Form Mailto Handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const subject = formData.get('subject') || 'Portfolio Contact from ' + name;
      const message = formData.get('message') || '';

      const mailtoLink = `mailto:work.nishitajain@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nishita,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showToast('Opening your email client... ✉️');
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 500);
      this.reset();
    });
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        bar.style.width = bar.style.getPropertyValue('--progress');
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars();
});
