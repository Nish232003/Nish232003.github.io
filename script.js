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
    }
  });

  // Contact Form Mailto Handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      const mailtoLink = `mailto:work.nishitajain@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.location.href = mailtoLink;
      showToast('Opening email client... ✉️');
      this.reset();
    });
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
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
