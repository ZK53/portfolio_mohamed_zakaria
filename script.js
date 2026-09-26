/**
 * =============================================================================
 * MOHAMED ZAKARIA — PERSONAL PORTFOLIO JAVASCRIPT
 * Senior Frontend Architecture & Clean Implementation
 * =============================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. PORTFOLIO DATA (Easy Customization Center)
 * 2. THEME CONTROLLER (Light / Dark Mode with Persistence)
 * 3. NAVIGATION & MOBILE DRAWER (Keyboard & Focus Accessible)
 * 4. HERO ROLE TYPEWRITER (Respects prefers-reduced-motion)
 * 5. SKILLS RENDERER & PROGRESS BAR ANIMATOR
 * 6. TESTIMONIALS CAROUSEL (Arrows, Dots, Touch Swipe & Keyboard)
 * 7. PROJECT DETAILS MODAL
 * 8. CLIPBOARD & TOAST SYSTEM
 * 9. CONTACT FORM VALIDATOR
 * 10. SCROLL REVEAL & ACTIVE NAV OBSERVER
 * 11. AMBIENT CURSOR INTERACTION
 * =============================================================================
 */

'use strict';

/* =============================================================================
   1. PORTFOLIO DATA (CUSTOMIZE YOUR CONTENT HERE)
   =============================================================================
   Feel free to update the information below. All values here feed dynamically
   into the website's components, skills grid, and interactive modals.
   ============================================================================= */
const portfolioData = {
  // Personal & Professional Profile
  personal: {
    name: "Mohamed Zakaria",
    primaryRole: "Flutter Developer",
    roles: [
      "Flutter Developer",
      "Software Engineer",
      "Mobile App Developer"
    ],
    education: {
      degree: "Computer and Systems Engineering",
      institution: "Zagazig University",
      grade: "Very Good"
    },
    experienceLevel: "Entry-level / Junior Flutter Developer",
    cvPath: "assets/cv/Mohamed-Zakaria-CV.pdf",
    email: "YOUR_EMAIL@gmail.com",
    whatsapp: "YOUR_WHATSAPP_NUMBER",
    github: "https://github.com/YOUR_GITHUB_USERNAME",
    linkedin: "https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
  },

  // Skills & Self-Assessed Proficiency (0 - 100)
  // Edit percentages or add new skills here:
  skills: {
    technical: [
      { name: "Flutter", level: 85 },
      { name: "Dart", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "JSON", level: 85 },
      { name: "Cubit / BLoC", level: 80 },
      { name: "MVVM Architecture", level: 80 },
      { name: "Firebase (Auth & Firestore)", level: 75 },
      { name: "SQLite", level: 75 },
      { name: "Shared Preferences", level: 85 },
      { name: "UI/UX Implementation", level: 85 },
      { name: "Git & GitHub", level: 80 },
      { name: "Android SDK", level: 70 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 75 }
    ],
    nonTechnical: [
      { name: "Problem Solving", level: 90 },
      { name: "Continuous Learning", level: 95 },
      { name: "Communication", level: 85 },
      { name: "Teamwork", level: 85 },
      { name: "Adaptability", level: 85 },
      { name: "Time Management", level: 80 }
    ]
  },

  // Featured Projects Data (Populates detail modal & cards)
  projects: {
    news: {
      title: "News App",
      category: "Mobile Application • Flutter",
      image: "assets/images/project-news.svg",
      architecture: "MVVM • Cubit State Management",
      technologies: ["Flutter", "Dart", "REST API", "Cubit", "MVVM", "Shared Preferences"],
      description: "A modern mobile news reader built with clean MVVM architecture and Cubit for reactive, predictable state management. It delivers real-time news articles categorized by topic with offline preference caching.",
      features: [
        "Live RESTful API integration with asynchronous JSON data parsing.",
        "Topic category filtering (Technology, Business, Science, Sports).",
        "Predictable state handling using Cubit with loading, loaded, and error states.",
        "Local preference caching for user settings via Shared Preferences.",
        "Responsive, modern layout adhering to mobile design guidelines."
      ],
      githubUrl: "https://github.com/YOUR_GITHUB_USERNAME/flutter-news-app"
    },
    ecommerce: {
      title: "E-Commerce App",
      category: "Full-Featured Mobile Store",
      image: "assets/images/project-ecommerce.svg",
      architecture: "MVVM • Firebase Cloud Architecture",
      technologies: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Cubit", "MVVM", "Shared Preferences"],
      description: "A full-featured mobile shopping application combining Flutter's fluid UI with Firebase cloud services. Features secure user authentication, real-time product catalogs, cart, wishlist, and profile management.",
      features: [
        "Secure user authentication (Registration, Login, Session Persistence) using Firebase Auth.",
        "Real-time Firestore synchronization for product inventory and category lists.",
        "Dynamic shopping cart and wishlist management with reactive price calculations.",
        "Order placement simulation and user account profile management.",
        "Clean layered structure separating UI, domain logic, and Firebase data sources."
      ],
      githubUrl: "https://github.com/YOUR_GITHUB_USERNAME/flutter-ecommerce-app"
    },
    todo: {
      title: "To-Do App",
      category: "Productivity & Local Database",
      image: "assets/images/project-todo.svg",
      architecture: "MVVM • Offline-First Persistence",
      technologies: ["Flutter", "Dart", "SQLite", "Cubit", "Shared Preferences"],
      description: "A fast, offline-first productivity app engineered with SQLite for reliable local database persistence. Enables seamless task management with full CRUD operations, category filters, and smooth state updates.",
      features: [
        "Full CRUD database operations implemented with SQLite database tables.",
        "Reactive task list filtering by status (All, Completed, Pending, Priority).",
        "Smooth state management powered by Cubit for instant UI responsiveness.",
        "Lightweight user preference caching via Shared Preferences.",
        "Clean UI with task completion streaks and status progress indicators."
      ],
      githubUrl: "https://github.com/YOUR_GITHUB_USERNAME/flutter-todo-app"
    }
  }
};

/* =============================================================================
   2. THEME CONTROLLER (LIGHT & DARK MODES)
   ============================================================================= */
const ThemeManager = (() => {
  const THEME_STORAGE_KEY = 'mz_portfolio_theme';
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeColorMeta = document.getElementById('theme-color-meta');

  // Determine initial theme
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Check operating system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update browser theme-color meta tag
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#192514' : '#03A791');
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  };

  const toggle = () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  const init = () => {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggle);
    }

    // Listen for OS theme preference changes if user hasn't explicitly set one
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  return { init, toggle };
})();

/* =============================================================================
   3. NAVIGATION & MOBILE DRAWER CONTROLLER
   ============================================================================= */
const NavigationManager = (() => {
  const header = document.getElementById('navbar');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  let isDrawerOpen = false;

  const toggleDrawer = (forceState) => {
    isDrawerOpen = typeof forceState === 'boolean' ? forceState : !isDrawerOpen;

    if (mobileToggleBtn) {
      mobileToggleBtn.classList.toggle('open', isDrawerOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isDrawerOpen ? 'true' : 'false');
      mobileToggleBtn.setAttribute('aria-label', isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    if (mobileDrawer) {
      mobileDrawer.classList.toggle('open', isDrawerOpen);
      mobileDrawer.setAttribute('aria-hidden', isDrawerOpen ? 'false' : 'true');
    }

    if (mobileBackdrop) {
      mobileBackdrop.classList.toggle('open', isDrawerOpen);
      mobileBackdrop.setAttribute('aria-hidden', isDrawerOpen ? 'false' : 'true');
    }

    // Prevent body scrolling when mobile drawer is open
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
  };

  const closeDrawer = () => toggleDrawer(false);

  const init = () => {
    // Scroll header elevation effect
    window.addEventListener('scroll', () => {
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // Mobile toggle click
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', () => toggleDrawer());
    }

    // Backdrop click
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeDrawer);
    }

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isDrawerOpen) {
          closeDrawer();
        }
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    });
  };

  return { init, closeDrawer };
})();

/* =============================================================================
   4. HERO ROLE TYPEWRITER (Respects prefers-reduced-motion)
   ============================================================================= */
const HeroTypewriter = (() => {
  const roleTextElement = document.getElementById('hero-role-text');
  const roles = portfolioData.personal.roles;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let timeoutId = null;

  const type = () => {
    if (!roleTextElement) return;

    // If user prefers reduced motion, set static text and stop
    if (isReducedMotion) {
      roleTextElement.textContent = roles[0];
      return;
    }

    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      roleTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      roleTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentCharIndex === currentRole.length) {
      // Pause at complete word
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    timeoutId = setTimeout(type, typeSpeed);
  };

  const init = () => {
    if (roleTextElement) {
      type();
    }
  };

  return { init };
})();

/* =============================================================================
   5. SKILLS RENDERER & PROGRESS BAR ANIMATOR
   ============================================================================= */
const SkillsManager = (() => {
  const techList = document.getElementById('technical-skills-list');
  const nonTechList = document.getElementById('nontechnical-skills-list');
  const filterButtons = document.querySelectorAll('.skills-filter-btn');
  const skillGroups = document.querySelectorAll('.skill-group');

  // Build HTML for a single skill item
  const createSkillItemHTML = (skill) => {
    return `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar-track" aria-hidden="true">
          <div class="skill-bar-fill" data-level="${skill.level}" style="width: 0%;"></div>
        </div>
      </div>
    `;
  };

  // Render skills lists from portfolioData
  const renderSkills = () => {
    if (techList) {
      techList.innerHTML = portfolioData.skills.technical.map(createSkillItemHTML).join('');
    }
    if (nonTechList) {
      nonTechList.innerHTML = portfolioData.skills.nonTechnical.map(createSkillItemHTML).join('');
    }
  };

  // Animate progress bars when scrolled into view
  const animateProgressBars = () => {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
      const targetLevel = bar.getAttribute('data-level');
      if (targetLevel) {
        bar.style.width = `${targetLevel}%`;
      }
    });
  };

  // Setup Category Filtering (All / Technical / Non-technical)
  const setupFiltering = () => {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button state & accessibility attributes
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter visible groups
        skillGroups.forEach(group => {
          const category = group.getAttribute('data-category');
          if (filter === 'all' || filter === category) {
            group.classList.remove('hidden');
          } else {
            group.classList.add('hidden');
          }
        });
      });
    });
  };

  const init = () => {
    renderSkills();
    setupFiltering();

    // Trigger progress fill animation when skills section enters viewport
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      observer.observe(skillsSection);
    }
  };

  return { init };
})();

/* =============================================================================
   6. TESTIMONIALS CAROUSEL (Touch, Arrow Keys, Prev/Next, Dots)
   ============================================================================= */
const TestimonialsCarousel = (() => {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dot');
  const cards = document.querySelectorAll('.testimonial-card');

  let currentIndex = 0;
  const totalSlides = cards.length || 4;
  let touchStartX = 0;
  let touchEndX = 0;

  const updateCarousel = (index) => {
    if (!track) return;

    // Wrap index safely
    currentIndex = (index + totalSlides) % totalSlides;

    // Translate the track horizontally
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dot indicators
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  const nextSlide = () => updateCarousel(currentIndex + 1);
  const prevSlide = () => updateCarousel(currentIndex - 1);

  const init = () => {
    if (!track || totalSlides === 0) return;

    // Button event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Dot indicators click
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-index') || '0', 10);
        updateCarousel(targetIndex);
      });
    });

    // Keyboard navigation (Left / Right Arrow) when focus is within carousel
    const carouselContainer = document.querySelector('.testimonials-carousel-wrapper');
    if (carouselContainer) {
      carouselContainer.setAttribute('tabindex', '0');
      carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      });
    }

    // Touch / Swipe support for mobile
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const diff = touchStartX - touchEndX;
      // Minimum swipe threshold
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
  };

  return { init, updateCarousel };
})();

/* =============================================================================
   7. PROJECT DETAILS MODAL CONTROLLER
   ============================================================================= */
const ProjectModalManager = (() => {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.project-detail-btn');

  const openModal = (projectId) => {
    const project = portfolioData.projects[projectId];
    if (!project || !modal || !modalContent) return;

    // Construct modal body markup
    modalContent.innerHTML = `
      <span class="modal-header-badge">${project.architecture}</span>
      <h3 class="modal-title" id="modal-title">${project.title}</h3>
      <p class="modal-desc">${project.description}</p>
      
      <div class="modal-mockup-wrapper">
        <img src="${project.image}" alt="${project.title} application preview" class="modal-mockup-img" width="600" height="380">
      </div>

      <h4 class="modal-section-title">Key Engineering Features</h4>
      <ul class="modal-features-list">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="project-tech-list" style="margin-bottom: 24px;">
        ${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <a href="${project.githubUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>View Source on GitHub</span>
        </a>
        <button type="button" class="btn btn-outline" id="modal-inner-close">Close Preview</button>
      </div>
    `;

    // Open native dialog
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }

    // Attach inner close button handler
    const innerClose = document.getElementById('modal-inner-close');
    if (innerClose) {
      innerClose.addEventListener('click', closeModal);
    }
  };

  const closeModal = () => {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  };

  const init = () => {
    // Open modal triggers
    detailButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        if (projectId) openModal(projectId);
      });
    });

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          closeModal();
        }
      });
    }
  };

  return { init, openModal, closeModal };
})();

/* =============================================================================
   8. CLIPBOARD & TOAST SYSTEM
   ============================================================================= */
const ToastManager = (() => {
  const container = document.getElementById('toast-container');

  const show = (message, duration = 3000) => {
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger reveal transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }, duration);
  };

  const setupCopyButtons = () => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          show(`Copied "${textToCopy}" to clipboard!`);
        } catch (err) {
          show('Failed to copy to clipboard.');
        }
      });
    });
  };

  const init = () => {
    setupCopyButtons();
  };

  return { init, show };
})();

/* =============================================================================
   9. CONTACT FORM VALIDATION & MAILTO HANDLER
   ============================================================================= */
const ContactFormManager = (() => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const setGroupError = (inputElement, hasError) => {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.toggle('has-error', hasError);
    }
  };

  const init = () => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setGroupError(nameInput, true);
        isValid = false;
      } else {
        setGroupError(nameInput, false);
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setGroupError(emailInput, true);
        isValid = false;
      } else {
        setGroupError(emailInput, false);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setGroupError(subjectInput, true);
        isValid = false;
      } else {
        setGroupError(subjectInput, false);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setGroupError(messageInput, true);
        isValid = false;
      } else {
        setGroupError(messageInput, false);
      }

      if (isValid) {
        const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent(
          `From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`
        )}`;

        // Open user's default email client
        window.location.href = mailtoUrl;

        ToastManager.show('Opening your email client to send message...');
        form.reset();
      }
    });

    // Clear errors on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => setGroupError(input, false));
      }
    });
  };

  return { init };
})();

/* =============================================================================
   10. SCROLL REVEAL & ACTIVE NAVIGATION OBSERVER
   ============================================================================= */
const ScrollObserverManager = (() => {
  const revealItems = document.querySelectorAll('.reveal-item');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const setupRevealObserver = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
  };

  const setupActiveSectionSpy = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');

          // Highlight desktop nav link
          desktopNavLinks.forEach(link => {
            const matches = link.getAttribute('data-section') === currentId;
            link.classList.toggle('active', matches);
          });

          // Highlight mobile nav link
          mobileNavLinks.forEach(link => {
            const matches = link.getAttribute('data-section') === currentId;
            link.classList.toggle('active', matches);
          });
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '-10% 0px -45% 0px'
    });

    sections.forEach(section => observer.observe(section));
  };

  const init = () => {
    setupRevealObserver();
    setupActiveSectionSpy();
  };

  return { init };
})();

/* =============================================================================
   11. AMBIENT CURSOR INTERACTION (Desktop Only, Reduced Motion Safe)
   ============================================================================= */
const AmbientCursorManager = (() => {
  const glow = document.getElementById('ambient-glow');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const init = () => {
    if (!glow || isReducedMotion || isTouchDevice) {
      if (glow) glow.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    const animateGlow = () => {
      // Smooth lerp follow
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateGlow);
    };

    requestAnimationFrame(animateGlow);
  };

  return { init };
})();

/* =============================================================================
   DOM READY INITIALIZATION
   ============================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Initialize all modular components
  ThemeManager.init();
  NavigationManager.init();
  HeroTypewriter.init();
  SkillsManager.init();
  TestimonialsCarousel.init();
  ProjectModalManager.init();
  ToastManager.init();
  ContactFormManager.init();
  ScrollObserverManager.init();
  AmbientCursorManager.init();
});
