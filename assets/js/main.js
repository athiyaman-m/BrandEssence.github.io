(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

const words = ["Style", "Value", "Reach", "Vision", "Story"]; //Style, Vision, Reach, Value, Focus
let wordIndex = 0;
let charIndex = 0;
const animatedText = document.getElementById("animated-text");

  // Function to append "+" symbol when the counter finishes
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const target = mutation.target;
        if (mutation.type === "childList" && target.id === "happyClientsCounter") {
          if (!target.textContent.includes("+")) {
            target.textContent += "+";
          }
        }
      });
    });

    const counterElement = document.getElementById("happyClientsCounter");
    observer.observe(counterElement, { childList: true });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const target = mutation.target;
        if (mutation.type === "childList" && target.id === "projectsCounter") {
          if (!target.textContent.includes("+")) {
            target.textContent += "+";
          }
        }
      });
    });

    const counterElement = document.getElementById("projectsCounter");
    observer.observe(counterElement, { childList: true });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const target = mutation.target;
        if (mutation.type === "childList" && target.id === "experienceCounter") {
          if (!target.textContent.includes("+")) {
            target.textContent += "+";
          }
        }
      });
    });

    const counterElement = document.getElementById("experienceCounter");
    observer.observe(counterElement, { childList: true });
  });

function typeWord() {
    const currentWord = words[wordIndex];
    if (charIndex < currentWord.length) {
        animatedText.textContent += currentWord[charIndex];
        charIndex++;
        setTimeout(typeWord, 200); // Adjust typing speed
    } else {
        setTimeout(eraseWord, 1000); // Pause before erasing
    }
}

function eraseWord() {
    const currentWord = words[wordIndex];
    if (charIndex > 0) {
        animatedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseWord, 100); // Adjust erasing speed
    } else {
        wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        setTimeout(typeWord, 200); // Start typing the next word
    }
}

typeWord(); // Start the animation

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Select all videos with the class "auto-play-video"
  const videos = document.querySelectorAll('.auto-play-video');

  // Create an IntersectionObserver to observe when videos are in the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        // Play the video when it enters the viewport
        video.play();
      } else {
        // Pause the video when it leaves the viewport
        video.pause();
      }
    });
  }, { threshold: 0.5 }); // Adjust threshold to control when the video starts playing (50% visibility)

  // Observe each video
  videos.forEach(video => {
    observer.observe(video);
  });

})();