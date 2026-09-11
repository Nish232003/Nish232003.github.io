/* ==========================================================================
   NISHITA JAIN - NETFLIX-INSPIRED PORTFOLIO JAVASCRIPT
   Profile Switching, Audio Effects, Horizontal Sliders, Interactive Scanner
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Audio and Sound Handling ---
  const netflixAudio = document.getElementById('netflixAudio');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  let isMuted = false;

  function playNetflixSound() {
    if (netflixAudio && !isMuted) {
      netflixAudio.currentTime = 0;
      netflixAudio.volume = 0.85;
      netflixAudio.play().catch(err => console.log('Audio autoplay prevented:', err));
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        audioIcon.className = 'fas fa-volume-mute';
        showToast('Sound Muted');
      } else {
        audioIcon.className = 'fas fa-volume-up';
        showToast('Sound Enabled');
        playNetflixSound();
      }
    });
  }

  // --- 2. Profile Selection & Personalization System ---
  const profileScreen = document.getElementById('profileScreen');
  const directBrowseBtn = document.getElementById('directBrowseBtn');
  const navActiveAvatar = document.getElementById('navActiveAvatar');
  const alertAvatarImg = document.getElementById('alertAvatarImg');
  const alertText = document.getElementById('alertText');
  const topPicksTitle = document.getElementById('topPicksTitle');
  const topPicksRow = document.getElementById('topPicksRow');
  const exitToProfilesBtn = document.getElementById('exitToProfilesBtn');
  const alertChangeBtn = document.getElementById('alertChangeBtn');

  const profilesData = {
    recruiter: {
      name: 'Recruiter',
      avatar: 'assets/blue.png',
      summary: 'Browsing as <strong>Recruiter</strong> — Prioritizing production ML impact, business ROI, and verified credentials.',
      topPicksTitle: 'Top Picks for Recruiter',
      picks: [
        {
          id: 'marketlens',
          title: 'Marketlens-ecommerce-roi',
          badge: 'Featured ROI',
          badgeColor: '',
          bannerClass: 'card-banner-marketlens',
          icon: 'fas fa-chart-line',
          pill: 'ROI Platform',
          match: '99% Match',
          tags: ['ROAS', 'Plotly', '8 Dashboards', 'Live Demo']
        },
        {
          id: 'vaighai',
          title: 'Vaighai Agro: CRM Scoring',
          badge: 'Internship',
          badgeColor: 'green',
          bannerClass: 'card-banner-experience',
          icon: 'fas fa-database',
          match: '99% Match',
          tags: ['Power Automate', 'Dynamics 365', '456 Deals']
        },
        {
          id: 'fakejob',
          title: 'fake_job_detector',
          badge: '98% Accuracy',
          badgeColor: 'green',
          bannerClass: 'card-banner-fraud',
          icon: 'fas fa-user-shield',
          pill: 'NLP Fraud Detection',
          match: '98% Match',
          tags: ['TF-IDF', 'XGBoost', 'Streamlit App']
        },
        {
          id: 'amazon',
          title: 'Amazon ML Scholar 2026',
          badge: 'Top 3K',
          badgeColor: '',
          bannerClass: 'card-banner-award',
          icon: 'fas fa-award',
          match: '99% Match',
          tags: ['Selected', '1.3L+ Applicants', 'Deep Learning']
        },
        {
          id: 'thinkai',
          title: 'ThinkAI: Safety Vision',
          badge: 'Computer Vision',
          badgeColor: 'green',
          bannerClass: 'card-banner-experience',
          icon: 'fas fa-video',
          match: '98% Match',
          tags: ['PyTorch', 'YOLOv11', 'Industrial Safety']
        }
      ]
    },
    guest: {
      name: 'Guest',
      avatar: 'assets/yellow.png',
      summary: 'Browsing as <strong>Guest</strong> — Explore the full portfolio freely. No profile selected.',
      topPicksTitle: 'Recommended for You',
      picks: [
        {
          id: 'marketlens',
          title: 'Marketlens-ecommerce-roi',
          badge: 'Featured',
          badgeColor: '',
          bannerClass: 'card-banner-marketlens',
          icon: 'fas fa-chart-line',
          pill: 'ROI Platform',
          match: '99% Match',
          tags: ['ROAS', 'Plotly', '8 Dashboards', 'Live Demo']
        },
        {
          id: 'fakejob',
          title: 'fake_job_detector',
          badge: '98% Accuracy',
          badgeColor: 'green',
          bannerClass: 'card-banner-fraud',
          icon: 'fas fa-user-shield',
          pill: 'NLP Fraud Detection',
          match: '98% Match',
          tags: ['TF-IDF', 'XGBoost', 'Streamlit App']
        },
        {
          id: 'art1',
          title: 'Vivid Chromatic Portrait',
          badge: 'Art',
          badgeColor: '',
          img: 'assets/art1.png',
          bannerClass: 'card-banner-art-cover',
          icon: 'fas fa-palette',
          pill: 'Expressionism',
          match: '97% Match',
          tags: ['Acrylic', 'Portrait', 'Color Theory']
        },
        {
          id: 'amazon',
          title: 'Amazon ML Scholar 2026',
          badge: 'Top 3K',
          badgeColor: '',
          bannerClass: 'card-banner-award',
          icon: 'fas fa-award',
          match: '99% Match',
          tags: ['Selected', '1.3L+ Applicants', 'Deep Learning']
        },
        {
          id: 'medium1',
          title: 'My Writing on Medium',
          badge: 'Blog',
          badgeColor: '',
          bannerClass: 'card-banner-blog',
          icon: 'fab fa-medium',
          pill: 'Tech Writing',
          match: '95% Match',
          tags: ['AI/ML', 'Data Science', 'Medium']
        }
      ]
    },
    developer: {
      name: 'Developer',
      avatar: 'assets/grey.png',
      summary: 'Browsing as <strong>Developer</strong> — Deep-diving into system architectures, pipelines, LeetCode, and code repos.',
      topPicksTitle: 'Top Picks for Developer',
      picks: [
        {
          id: 'fakejob',
          title: 'fake_job_detector',
          badge: 'NLP Pipeline',
          badgeColor: 'green',
          bannerClass: 'card-banner-fraud',
          icon: 'fas fa-user-shield',
          pill: 'NLP Fraud Detection',
          match: '99% Match',
          tags: ['TF-IDF Vectors', 'XGBoost', 'Streamlit Cloud']
        },
        {
          id: 'satellite',
          title: 'satellite-data-analysis',
          badge: 'CartoDEM & GIS',
          badgeColor: '',
          bannerClass: 'card-banner-satellite',
          icon: 'fas fa-satellite',
          pill: 'CartoDEM & NDVI',
          match: '96% Match',
          tags: ['Raster Analysis', 'NDVI Indices', 'Python GIS']
        },
        {
          id: 'soilsync',
          title: 'Soil-Sync',
          badge: 'IoT & ML',
          badgeColor: '',
          bannerClass: 'card-banner-soilsync',
          icon: 'fas fa-seedling',
          pill: 'IoT Telemetry',
          match: '95% Match',
          tags: ['Random Forest', 'NPK Sensors', 'Tableau']
        },
        {
          id: 'marketlens',
          title: 'Marketlens-ecommerce-roi',
          badge: 'Flask & Plotly',
          badgeColor: '',
          bannerClass: 'card-banner-marketlens',
          icon: 'fas fa-chart-line',
          pill: 'ROI Platform',
          match: '98% Match',
          tags: ['Non-linear Diminishing ROI', 'Hybrid NLP']
        },
        {
          id: 'sabudh',
          title: 'Sabudh 3D GANs Trainee',
          badge: 'Deep Learning',
          badgeColor: 'green',
          bannerClass: 'card-banner-experience',
          icon: 'fas fa-cubes',
          match: '97% Match',
          tags: ['3D Reconstruction', 'GANs', 'Face Mesh']
        }
      ]
    },
    stalker: {
      name: 'Stalker',
      avatar: 'assets/red.png',
      summary: 'Browsing as <strong>Stalker</strong> — Exploring Nishita’s creative soul, oil paintings, traditional Indian folk art, and Medium essays.',
      topPicksTitle: 'Top Picks for Stalker',
      picks: [
        {
          id: 'art1',
          title: 'Vivid Chromatic Portrait',
          badge: 'Original Portrait',
          badgeColor: '',
          img: 'assets/art1.png',
          match: '99% Match',
          tags: ['Portraiture', 'Mixed Media on Board']
        },
        {
          id: 'medium1',
          title: 'A Letter to the Self I Barely Recognize',
          badge: 'Medium Essay',
          badgeColor: '',
          bannerClass: 'card-banner-art-cover',
          icon: 'fab fa-medium',
          match: '98% Match',
          tags: ['Personal Growth', 'Inner Reflection']
        },
        {
          id: 'art2',
          title: 'Monocle Parisian Café',
          badge: 'Watercolor & Ink',
          badgeColor: 'green',
          img: 'assets/art2.png',
          match: '98% Match',
          tags: ['Plein Air Sketch', 'Café Vignette']
        },
        {
          id: 'robinhood',
          title: 'Robin Hood Army Volunteering',
          badge: 'Social Impact',
          badgeColor: '',
          bannerClass: 'card-banner-award',
          icon: 'fas fa-hand-holding-heart',
          match: '97% Match',
          tags: ['Community Welfare', 'Food Surplus']
        },
        {
          id: 'medium2',
          title: 'The Doorbell Sounds, The Room Fills Up...',
          badge: 'Medium Essay',
          badgeColor: '',
          bannerClass: 'card-banner-art-cover',
          icon: 'fab fa-medium',
          match: '96% Match',
          tags: ['Observation', 'Human Patterns']
        }
      ]
    },
    adventurer: {
      name: 'Adventurer',
      avatar: 'assets/yellow.png',
      summary: 'Browsing as <strong>Adventurer</strong> — Complete all-access binge pass to projects, code, arts, and honors.',
      topPicksTitle: 'Binge-Worthy Picks for Adventurer',
      picks: [
        {
          id: 'marketlens',
          title: 'Marketlens-ecommerce-roi',
          badge: 'Blockbuster',
          badgeColor: '',
          bannerClass: 'card-banner-marketlens',
          icon: 'fas fa-chart-line',
          pill: 'ROI Platform',
          match: '99% Match',
          tags: ['Full-Stack ML', 'Plotly', 'Flask']
        },
        {
          id: 'fakejob',
          title: 'fake_job_detector',
          badge: '98% Accuracy',
          badgeColor: 'green',
          bannerClass: 'card-banner-fraud',
          icon: 'fas fa-user-shield',
          pill: 'NLP Fraud Detection',
          match: '98% Match',
          tags: ['NLP', 'TF-IDF', 'XGBoost']
        },
        {
          id: 'art1',
          title: 'Vivid Chromatic Portrait',
          badge: 'Original Art',
          badgeColor: '',
          img: 'assets/art1.png',
          match: '99% Match',
          tags: ['Portraiture', 'Mixed Media']
        },
        {
          id: 'amazon',
          title: 'Amazon ML Scholar 2026',
          badge: 'Honor',
          badgeColor: '',
          bannerClass: 'card-banner-award',
          icon: 'fas fa-award',
          match: '99% Match',
          tags: ['Top 3K', 'Machine Learning']
        },
        {
          id: 'vaighai',
          title: 'Vaighai Agro Products',
          badge: 'Industry Intern',
          badgeColor: 'green',
          bannerClass: 'card-banner-experience',
          icon: 'fas fa-database',
          match: '98% Match',
          tags: ['Dynamics 365', 'ETL Pipelines']
        }
      ]
    }
  };

  function renderTopPicks(profileKey) {
    const data = profilesData[profileKey] || profilesData.recruiter;
    topPicksTitle.textContent = data.topPicksTitle;
    alertAvatarImg.src = data.avatar;
    alertText.innerHTML = data.summary;
    navActiveAvatar.src = data.avatar;

    topPicksRow.innerHTML = '';
    data.picks.forEach(item => {
      const card = document.createElement('div');
      card.className = 'netflix-card';
      card.setAttribute('data-modal', item.id);

      let thumbContent = '';
      if (item.img) {
        thumbContent = `<img src="${item.img}" alt="${item.title}" loading="lazy">`;
      } else {
        thumbContent = `
          <div class="card-banner-art ${item.bannerClass || 'card-banner-experience'}">
            <i class="${item.icon || 'fas fa-star'}"></i>
            ${item.pill ? `<span class="banner-pill">${item.pill}</span>` : `<span>${item.title}</span>`}
          </div>`;
      }

      const badgeClass = item.badgeColor === 'green' ? 'card-badge green' : 'card-badge';

      card.innerHTML = `
        <div class="card-thumbnail">
          <span class="${badgeClass}">${item.badge}</span>
          ${thumbContent}
        </div>
        <div class="card-info">
          <h4 class="card-title">${item.title}</h4>
          <div class="card-meta-row">
            <span class="card-meta-match">${item.match}</span>
            <span class="card-meta-tag">Featured</span>
            <span class="card-meta-tag">HD</span>
          </div>
          <div class="card-tags">
            ${item.tags.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openModalById(item.id);
      });

      topPicksRow.appendChild(card);
    });
  }

  function selectProfile(profileKey) {
    playNetflixSound();
    localStorage.setItem('netflix_profile', profileKey);
    renderTopPicks(profileKey);

    profileScreen.classList.add('hidden');
    showToast(`Watching as ${profilesData[profileKey].name}`);
  }

  // Profile clicks on "Who's Watching?" screen
  document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', () => {
      const profile = card.getAttribute('data-profile');
      selectProfile(profile);
    });
  });

  if (directBrowseBtn) {
    directBrowseBtn.addEventListener('click', () => {
      selectProfile('guest');
    });
  }

  // Profile switcher inside dropdown
  document.querySelectorAll('.profile-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const profile = item.getAttribute('data-switch');
      selectProfile(profile);
    });
  });

  if (exitToProfilesBtn) {
    exitToProfilesBtn.addEventListener('click', () => {
      profileScreen.classList.remove('hidden');
    });
  }

  if (alertChangeBtn) {
    alertChangeBtn.addEventListener('click', () => {
      profileScreen.classList.remove('hidden');
    });
  }

  // Check saved profile
  const savedProfile = localStorage.getItem('netflix_profile');
  if (savedProfile && profilesData[savedProfile]) {
    renderTopPicks(savedProfile);
  } else {
    renderTopPicks('recruiter');
  }

  // --- 3. Horizontal Slider Chevron Buttons ---
  document.querySelectorAll('.slider-arrow').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      const rowId = arrow.getAttribute('data-row');
      const row = document.getElementById(rowId);
      if (!row) return;

      const scrollAmount = 550;
      if (arrow.classList.contains('left')) {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });

  // --- 4. Interactive NLP Scam Scanner Simulator ---
  const scannerTextInput = document.getElementById('scannerTextInput');
  const scanJobBtn = document.getElementById('scanJobBtn');
  const clearScanBtn = document.getElementById('clearScanBtn');
  const scoreVal = document.getElementById('scoreVal');
  const scoreLabel = document.getElementById('scoreLabel');
  const scoreHeadline = document.getElementById('scoreHeadline');
  const scoreSummary = document.getElementById('scoreSummary');
  const triggerChips = document.getElementById('triggerChips');
  const presetBtns = document.querySelectorAll('.preset-btn');

  const presets = {
    scam: "URGENT HIRING: Data Entry Specialist. Earn $500 to $800 daily! No prior experience needed. Work 2 hours/day from home. For immediate onboarding, send your bank details and wire transfer fee to our HR Manager on Telegram: @quick_wire_agent.",
    legit: "Role: Senior Data Scientist / ML Engineer. Requirements: 2+ years of experience with Python, PyTorch, and Scikit-Learn. Candidate will design, benchmark, and deploy computer vision safety surveillance pipelines (YOLOv11) and automate multi-table ETL data models.",
    suspicious: "Immediate Clerk opening. Flexible shifts. Contact hiring coordinator via WhatsApp only. Registration security deposit required before dispatching laptop equipment."
  };

  function runNLPScan() {
    const text = (scannerTextInput.value || '').toLowerCase();
    if (!text.trim()) {
      showToast('Please enter text to scan');
      return;
    }

    const redFlags = [
      { word: 'wire transfer', weight: 35 },
      { word: 'telegram', weight: 30 },
      { word: 'whatsapp', weight: 20 },
      { word: 'deposit', weight: 25 },
      { word: 'fee', weight: 25 },
      { word: '$500', weight: 15 },
      { word: '$800', weight: 15 },
      { word: 'no experience', weight: 20 },
      { word: 'urgent', weight: 15 },
      { word: 'daily', weight: 10 }
    ];

    const legitFlags = ['pytorch', 'python', 'scikit-learn', 'candidate', 'requirements', 'pipeline', 'computer vision', 'data science', 'benchmark'];

    let score = 5;
    let foundChips = [];

    redFlags.forEach(item => {
      if (text.includes(item.word)) {
        score += item.weight;
        foundChips.push({ word: item.word, type: 'danger' });
      }
    });

    legitFlags.forEach(word => {
      if (text.includes(word)) {
        score = Math.max(3, score - 20);
        foundChips.push({ word: word, type: 'safe' });
      }
    });

    score = Math.min(99, Math.max(2, score));
    scoreVal.textContent = `${score}%`;

    if (score >= 70) {
      scoreLabel.textContent = 'High Fraud Risk';
      scoreLabel.style.color = '#e50914';
      scoreVal.style.color = '#e50914';
      scoreHeadline.textContent = '⚠️ Flagged as Highly Fraudulent';
      scoreSummary.textContent = 'High density of red-flag linguistic markers detected (unverified payment transfers, off-platform messaging apps, unverified deposit fees).';
    } else if (score >= 35) {
      scoreLabel.textContent = 'Suspicious / Unverified';
      scoreLabel.style.color = '#f59e0b';
      scoreVal.style.color = '#f59e0b';
      scoreHeadline.textContent = '⚡ Moderately Suspicious Patterns';
      scoreSummary.textContent = 'Contains informal recruitment phrases or unverified contact methods. Exercise caution before submitting personal documentation.';
    } else {
      scoreLabel.textContent = 'Legitimate / Verified';
      scoreLabel.style.color = '#46d369';
      scoreVal.style.color = '#46d369';
      scoreHeadline.textContent = '✅ Valid Professional Characteristics';
      scoreSummary.textContent = 'Semantic structure matches standard technical job listings with realistic requirements, tools, and professional phrasing.';
    }

    triggerChips.innerHTML = '';
    foundChips.forEach(chip => {
      const span = document.createElement('span');
      span.className = chip.type === 'danger' ? 'chip-danger' : 'chip-safe';
      span.textContent = chip.word;
      triggerChips.appendChild(span);
    });

    showToast(`Scan complete: ${score}% Fraud Risk Score`);
  }

  if (scannerTextInput) {
    scannerTextInput.value = presets.scam;
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const presetKey = btn.getAttribute('data-preset');
        scannerTextInput.value = presets[presetKey] || '';
        runNLPScan();
      });
    });
  }

  if (scanJobBtn) scanJobBtn.addEventListener('click', runNLPScan);
  if (clearScanBtn) {
    clearScanBtn.addEventListener('click', () => {
      scannerTextInput.value = '';
      scoreVal.textContent = '0%';
      scoreLabel.textContent = 'Ready to Scan';
      scoreHeadline.textContent = 'Paste Job Text Above';
      scoreSummary.textContent = 'Heuristic model evaluates semantic representations with sub-second TF-IDF feature extraction.';
      triggerChips.innerHTML = '';
    });
  }

  // --- 5. Netflix Title Modal Details Dictionary ---
  const modalData = {
    marketlens: {
      title: 'Marketlens-ecommerce-roi',
      badge: 'Production Analytics',
      year: '2026',
      match: '99% Match',
      desc: 'End-to-end marketing intelligence platform that ingests multi-table e-commerce sales and advertising data, computes real-time ROAS, CAC, and LTV/CAC across channels, and generates non-linear budget saturation curves with hybrid NLP AI recommendations.',
      techStack: 'Python, Flask, Plotly, Pandas, Hybrid NLP',
      metric: '8 Interactive Visual Dashboards & Diminishing ROI Curves',
      category: 'Analytics & BI / Machine Learning',
      status: 'Live on Render & GitHub',
      nodes: ['Multi-Table Ingestion', 'ETL Data Cleaner', 'ROAS / CAC Engine', 'Non-linear Saturation', 'Plotly Dashboard', 'Hybrid NLP Advisor'],
      actions: [
        { label: 'Live Demo', icon: 'fas fa-external-link-alt', url: 'https://marketlens-ecommerce-roi.onrender.com/' },
        { label: 'View Code', icon: 'fab fa-github', url: 'https://github.com/Nish232003/Marketlens-ecommerce-roi' }
      ]
    },
    fakejob: {
      title: 'fake_job_detector',
      badge: '98% Accuracy',
      year: '2026',
      match: '98% Match',
      desc: 'Engineered a fraud detection system over 17,880 job postings using NLP pipelines and TF-IDF text embeddings to extract semantic representations from multi-field job text. Flagged 866 fraudulent listings with 98% accuracy using XGBoost (82% F1-score). Deployed on Streamlit Cloud with sub-second inference.',
      techStack: 'Python, NLP, TF-IDF, XGBoost, Streamlit, Scikit-Learn',
      metric: '98% Accuracy, 82% F1-score across 17,880 postings',
      category: 'Natural Language Processing & Machine Learning',
      status: 'Deployed on Streamlit Cloud & GitHub',
      nodes: ['Job Text Corpus', 'Text Preprocessor', 'TF-IDF Vectorizer', 'XGBoost Classifier', 'Streamlit UI Inference'],
      actions: [
        { label: 'View Code', icon: 'fab fa-github', url: 'https://github.com/Nish232003/fake_job_detector' }
      ]
    },
    soilsync: {
      title: 'Soil-Sync',
      badge: '85% Accuracy',
      year: '2025',
      match: '95% Match',
      desc: 'Built an end-to-end IoT-ML pipeline in Python to process soil sensor telemetry (NPK, moisture, pH) and classify soil fertility status. Achieved 85% prediction accuracy with Random Forest and Logistic Regression. Engineered interactive Tableau dashboards for agricultural soil monitoring.',
      techStack: 'Python, IoT Sensors, Random Forest, Tableau, Scikit-Learn',
      metric: '85% Prediction Accuracy on NPK telemetry',
      category: 'IoT & Telemetry / Machine Learning',
      status: 'Completed & Visualized on Tableau',
      nodes: ['NPK & pH Sensors', 'Telemetry Pipeline', 'Feature Engineering', 'Random Forest Model', 'Tableau Agriculture Visuals'],
      actions: [
        { label: 'View Repository', icon: 'fab fa-github', url: 'https://github.com/Nish232003/Soil-Sync' }
      ]
    },
    satellite: {
      title: 'satellite-data-analysis',
      badge: 'GIS & Remote Sensing',
      year: '2025',
      match: '92% Match',
      desc: 'Geospatial raster analysis using CartoDEM and satellite imagery. Implemented digital elevation modeling (DEM), hillshade calculation, slope and aspect analysis, along with NDVI time-series computation for agricultural vegetation health monitoring.',
      techStack: 'Python, GIS, NDVI, CartoDEM, Geospatial Raster',
      metric: 'Sub-pixel DEM & NDVI Vegetation Index Maps',
      category: 'Geospatial & Computer Vision',
      status: 'Completed Research & Analysis',
      nodes: ['CartoDEM Ingestion', 'Terrain Rasterization', 'Hillshade & Slope Calc', 'NDVI Index Mapping', 'GIS Visualization'],
      actions: [
        { label: 'View Repository', icon: 'fab fa-github', url: 'https://github.com/Nish232003/Satellite_analysis' }
      ]
    },
    safecity: {
      title: 'safecity_crime_data_analysis',
      badge: 'Geospatial Analytics',
      year: '2024',
      match: '90% Match',
      desc: 'Geospatial and longitudinal crime analytics across 36 Indian states and union territories (2001–2018). Developed visual pipelines to evaluate state-wise crime density, regional clustering, and historical safety trend trajectories.',
      techStack: 'Python, Data Analytics, Geospatial, Data Visualization',
      metric: '18-Year Longitudinal Analysis of 36 States',
      category: 'Data Analytics & Public Safety',
      status: 'Completed Analytical Pipeline',
      nodes: ['State Crime Records', 'Data Normalization', 'Geospatial Density Mapping', 'Longitudinal Trajectories', 'Safety Heatmaps'],
      actions: [
        { label: 'View Repository', icon: 'fab fa-github', url: 'https://github.com/Nish232003/safecity_crime_data_analysis' }
      ]
    },
    vaighai: {
      title: 'Vaighai Agro Products — Data Engineer Intern',
      badge: 'Data Engineering',
      year: '2026',
      match: '99% Match',
      desc: 'Integrated into the corporate enterprise IT wing. Built automated CRM health scoring frameworks and data quality pipelines across 456 live sales deals using Microsoft Dynamics 365, Power Automate, and advanced Excel ETL workflows.',
      techStack: 'Microsoft Dynamics 365, Power Automate, Excel ETL, Data Pipelines',
      metric: '456 Live Deals Automated & Standardized',
      category: 'Work Experience / Enterprise Data Engineering',
      status: 'Completed Internship',
      nodes: ['Raw CRM Ingestion', 'Dynamics 365 Rules', 'Power Automate Triggers', 'Health Scoring Model', 'Executive Analytics'],
      actions: []
    },
    thinkai: {
      title: 'ThinkAI India Consulting — Python/ML Intern',
      badge: 'Computer Vision',
      year: '2025',
      match: '98% Match',
      desc: 'Trained and fine-tuned state-of-the-art YOLOv11 and YOLOv8 deep learning models in PyTorch using Roboflow image datasets for real-time industrial safety compliance and personal protective equipment (PPE) surveillance.',
      techStack: 'PyTorch, YOLOv11, YOLOv8, Roboflow, OpenCV, Python',
      metric: 'Real-Time Edge Computer Vision Detection',
      category: 'Work Experience / Deep Learning & Vision',
      status: 'Completed Internship',
      nodes: ['Industrial Video Stream', 'Roboflow Annotation', 'YOLOv11 PyTorch Training', 'Inference Optimization', 'Safety Violation Alert'],
      actions: []
    },
    sabudh: {
      title: 'Sabudh Foundation — Software & Data Engineering Trainee',
      badge: 'Deep Learning Trainee',
      year: '2024',
      match: '95% Match',
      desc: 'Conducted exploratory research and experimentation in 3D Generative Adversarial Networks (3D GANs) for facial mesh reconstruction, biometric modeling, and synthetic data augmentation under research mentorship.',
      techStack: 'Python, PyTorch, 3D GANs, Mesh Generation, Deep Learning',
      metric: '3D Facial Point Mesh Generation',
      category: 'Trainee / Generative Deep Learning',
      status: 'Completed Training',
      nodes: ['2D Face Photos', 'Mesh Landmarks', '3D GAN Generator', 'Discriminator Loss', 'Synthesized 3D Mesh'],
      actions: []
    },
    amazon: {
      title: 'Amazon ML Summer School 2026 Scholar',
      badge: 'Top 3K in India',
      year: '2026',
      match: '99% Match',
      desc: 'Selected among the top 3,000 students nationwide from over 130,000 applicants for intensive training on foundation models, deep learning architectures, scalable machine learning systems, and generative AI under Amazon scientists.',
      techStack: 'Deep Learning, LLMs, Scalable ML Systems, Transformers',
      metric: 'Top 2.3% Selection Rate out of 1.3L+ Applicants',
      category: 'Academic Honor & Fellowship',
      status: 'Selected Scholar',
      nodes: ['All-India Competitive Exam', 'Curriculum Selection', 'Amazon Scientist Mentorship', 'Foundation Models Lab'],
      actions: []
    },
    vit: {
      title: 'Integrated M.Tech in CSE (Data Science) — VIT Bhopal',
      badge: 'CGPA: 8.37 / 10',
      year: '2022 – 2027',
      match: '96% Match',
      desc: 'Pursuing a 5-year integrated masters degree focused on mathematical statistics, machine learning, deep learning, algorithms, and distributed data systems. Maintaining a strong 8.37 CGPA while conducting hands-on project research.',
      techStack: 'Data Science, Computer Science, Machine Learning, Applied Statistics',
      metric: 'CGPA 8.37 / 10',
      category: 'Higher Education',
      status: 'Student (2022 – 2027)',
      nodes: ['Mathematical Foundations', 'Algorithm Engineering', 'Deep Learning Core', 'M.Tech Thesis Capstone'],
      actions: []
    },
    dsclub: {
      title: 'Data Science Club — VIT Bhopal',
      badge: 'Student Leadership',
      year: '2023 – Present',
      match: '92% Match',
      desc: 'Active core member of Data Science Club VIT Bhopal. Organized national-level 24-hour hackathons, led hands-on machine learning bootcamps for 200+ students, and coordinated peer coding challenges.',
      techStack: 'Event Leadership, Technical Mentorship, Hackathon Organization',
      metric: '200+ Students Mentored & 2 Major Hackathons',
      category: 'Leadership & Community',
      status: 'Active Core Member',
      nodes: ['Technical Workshops', 'Peer Mentoring', '24-hr Hackathon Organizing', 'ML Study Circles'],
      actions: []
    },
    robinhood: {
      title: 'Robin Hood Army — Social Volunteer',
      badge: 'Community Impact',
      year: '2023 – Present',
      match: '95% Match',
      desc: 'Volunteer contributing to community food surplus redistribution, educational drives for underprivileged children, and local impact initiatives across underserved neighborhoods.',
      techStack: 'Community Organizing, Logistics Coordination, Education Outreach',
      metric: 'Surplus Food Redistribution & Youth Teaching',
      category: 'Social Impact & Service',
      status: 'Active Volunteer',
      nodes: ['Food Surplus Mapping', 'Distribution Logistics', 'Community Teaching', 'Volunteer Drives'],
      actions: []
    },
    ibmai: {
      title: 'IBM AI Engineering Professional Certificate',
      badge: 'Professional Specialization',
      year: '2024',
      match: '99% Match',
      desc: 'Rigorous multi-course specialization covering deep neural networks, machine learning algorithms, computer vision, PyTorch, Keras, and Apache Spark for scalable AI deployment.',
      techStack: 'PyTorch, Keras, TensorFlow, Scikit-Learn, Deep Learning',
      metric: '6-Course Professional AI Specialization Completed',
      category: 'Industry Certification',
      status: 'Verified Credential',
      nodes: ['Machine Learning with Python', 'Deep Learning & Neural Networks', 'PyTorch & Keras Models', 'Capstone Project'],
      actions: []
    },
    ibmda: {
      title: 'IBM Data Analyst Professional Certificate',
      badge: 'Professional Specialization',
      year: '2024',
      match: '97% Match',
      desc: 'Comprehensive data analytics credential encompassing relational database queries (SQL), advanced Excel modeling, data visualization dashboards, and Python ETL pipelines.',
      techStack: 'SQL, Python, Excel ETL, Cognos Analytics, Pandas',
      metric: 'End-to-End Data Analysis Specialization',
      category: 'Industry Certification',
      status: 'Verified Credential',
      nodes: ['SQL & Relational Databases', 'Python Data Analysis', 'Interactive Dashboards', 'Comprehensive Capstone'],
      actions: []
    },
    medium1: {
      title: 'A Letter to the Self I Barely Recognize',
      badge: 'Medium Publication',
      year: 'Aug 2025',
      match: '98% Match',
      desc: 'Published personal reflection essay exploring personal evolution, perseverance through academic and creative hurdles, and finding voice across analytical and artistic realms.',
      techStack: 'Creative Writing, Philosophy, Personal Growth',
      metric: 'Featured Essay on Medium',
      category: 'Publications & Reflections',
      status: 'Published Article',
      nodes: ['Introspection', 'Drafting & Narrative', 'Editorial Polish', 'Medium Publication'],
      actions: [
        { label: 'Read on Medium', icon: 'fab fa-medium', url: 'https://medium.com/@work.nishitajain' }
      ]
    },
    medium2: {
      title: 'The Doorbell Sounds, The Room Fills Up...',
      badge: 'Medium Publication',
      year: 'Aug 2025',
      match: '95% Match',
      desc: 'Observational essay analyzing human behavioral patterns, situational awareness, and subconscious social dynamics observed across everyday life environments.',
      techStack: 'Behavioral Observation, Essayistic Writing',
      metric: 'Published Article on Medium',
      category: 'Publications & Reflections',
      status: 'Published Article',
      nodes: ['Observation', 'Pattern Recognition', 'Narrative Synthesis', 'Medium Publication'],
      actions: [
        { label: 'Read on Medium', icon: 'fab fa-medium', url: 'https://medium.com/@work.nishitajain' }
      ]
    }
  };

  const titleModal = document.getElementById('titleModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalMatch = document.getElementById('modalMatch');
  const modalYear = document.getElementById('modalYear');
  const modalBadge = document.getElementById('modalBadge');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalMetric = document.getElementById('modalMetric');
  const modalCategory = document.getElementById('modalCategory');
  const modalStatus = document.getElementById('modalStatus');
  const modalArchFlow = document.getElementById('modalArchFlow');
  const modalActionButtons = document.getElementById('modalActionButtons');

  // Art Gallery Lightbox Elements
  const artLightbox = document.getElementById('artLightbox');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMedium = document.getElementById('lightboxMedium');

  function openModalById(id) {
    if (id && id.startsWith('art')) {
      const artCard = document.querySelector(`.art-card[data-img*="${id}"]`);
      if (artCard && artLightbox && lightboxImg) {
        lightboxImg.src = artCard.getAttribute('data-img');
        lightboxTitle.textContent = artCard.getAttribute('data-title');
        lightboxMedium.textContent = artCard.getAttribute('data-medium');
        artLightbox.classList.add('active');
        return;
      }
    }
    const data = modalData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalMatch.textContent = data.match;
    modalYear.textContent = data.year;
    modalBadge.textContent = data.badge;
    modalDescription.textContent = data.desc;
    modalTechStack.textContent = data.techStack;
    modalMetric.textContent = data.metric;
    modalCategory.textContent = data.category;
    modalStatus.textContent = data.status;

    // Architecture Nodes
    modalArchFlow.innerHTML = '';
    if (data.nodes && data.nodes.length) {
      data.nodes.forEach((node, i) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'arch-node';
        nodeEl.textContent = node;
        modalArchFlow.appendChild(nodeEl);

        if (i < data.nodes.length - 1) {
          const arrow = document.createElement('span');
          arrow.className = 'arch-arrow';
          arrow.innerHTML = '➔';
          modalArchFlow.appendChild(arrow);
        }
      });
    }

    // Action buttons
    modalActionButtons.innerHTML = '';
    if (data.actions && data.actions.length) {
      data.actions.forEach(act => {
        const a = document.createElement('a');
        a.href = act.url;
        a.target = '_blank';
        a.className = 'btn-netflix btn-netflix-play';
        a.innerHTML = `<i class="${act.icon}"></i> ${act.label}`;
        modalActionButtons.appendChild(a);
      });
    }

    titleModal.classList.add('active');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      titleModal.classList.remove('active');
    });
  }

  // Cards with data-modal attribute
  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      openModalById(modalId);
    });
  });

  // Billboard More Info Button
  const moreInfoHeroBtn = document.getElementById('moreInfoHeroBtn');
  if (moreInfoHeroBtn) {
    moreInfoHeroBtn.addEventListener('click', () => {
      openModalById('marketlens');
    });
  }

  // --- 6. ATS Resume Modal ---
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const openResumeHeroBtn = document.getElementById('openResumeHeroBtn');
  const openResumeNavBtn = document.getElementById('openResumeNavBtn');
  const openResumeFooterBtn = document.getElementById('openResumeFooterBtn');

  function openResume() {
    resumeModal.classList.add('active');
  }

  if (openResumeHeroBtn) openResumeHeroBtn.addEventListener('click', openResume);
  if (openResumeNavBtn) {
    openResumeNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  }
  if (openResumeFooterBtn) {
    openResumeFooterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  }
  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  // --- 7. Art Gallery Lightbox ---
  document.querySelectorAll('.art-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const medium = card.getAttribute('data-medium');

      lightboxImg.src = img;
      lightboxTitle.textContent = title;
      lightboxMedium.textContent = medium;
      artLightbox.classList.add('active');
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', () => {
      artLightbox.classList.remove('active');
    });
  }

  // Close modals on clicking backdrop
  [titleModal, resumeModal, artLightbox].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // --- 8. Search Functionality ---
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchContainer = document.getElementById('searchContainer');
  const navSearchInput = document.getElementById('navSearchInput');

  if (searchToggleBtn && searchContainer && navSearchInput) {
    searchToggleBtn.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        navSearchInput.focus();
      }
    });

    navSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;

      document.querySelectorAll('.netflix-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
          card.style.borderColor = '#e50914';
        } else {
          card.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        }
      });
    });
  }

  // --- 9. Navbar Scroll Effect ---
  const netflixNavbar = document.getElementById('netflixNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      netflixNavbar.classList.add('scrolled');
    } else {
      netflixNavbar.classList.remove('scrolled');
    }
  });

  // --- 10. Toast Helper ---
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
