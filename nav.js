/* Shared nav + footer + mobile hamburger.
   Markers in HTML: <div data-nav></div> and <div data-footer></div>.
   Add data-no-cta on the footer marker to suppress the CTA band. */
(function () {
  const NAV_HTML = `
    <header class="nav" id="nav">
      <a class="wordmark" href="index.html">Atlas Concrete Works</a>
      <div class="nav-right">
        <nav class="nav-links">
          <a href="services.html">Services</a>
          <a href="projects.html">Projects</a>
          <a href="process.html">Process</a>
          <a href="about.html">About</a>
          <a href="careers.html">Careers</a>
        </nav>
        <a class="cta nav-cta" href="contact.html">Get a quote</a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" hidden>
      <a href="services.html">Services</a>
      <a href="projects.html">Projects</a>
      <a href="process.html">Process</a>
      <a href="about.html">About</a>
      <a href="careers.html">Careers</a>
      <a class="cta solid" href="contact.html">Get a quote</a>
    </nav>
    <div class="nav-spacer"></div>
  `;

  const FOOTER_HTML = `
    <section class="cta-band" data-cta-band>
      <h2>Ready to pour? <span class="slash">Let's get on the schedule.</span></h2>
      <div class="actions">
        <a class="cta solid" href="contact.html">Request a quote</a>
        <a class="cta" href="projects.html" style="border-color:var(--paper);color:var(--paper)">See projects</a>
      </div>
    </section>
    <footer class="site-foot">
      <div class="wrap">
        <div class="foot">
          <div>
            <a class="wordmark" href="index.html">Atlas Concrete Works</a>
            <p class="blurb">Cast-in-place foundations, structural walls, and architectural flatwork. One crew from formwork through finish — Bay Area since 1998.</p>
          </div>
          <div>
            <h4>Sitemap</h4>
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <a href="projects.html">Projects</a>
            <a href="process.html">Process</a>
            <a href="about.html">About</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+15105550147">(510) 555-0147</a>
            <a href="mailto:estimates@atlasconcreteworks.example">estimates@<br>atlasconcreteworks.example</a>
            <p>3120 Industrial Way<br>Oakland, CA 94601</p>
          </div>
          <div>
            <h4>Hours</h4>
            <p>Mon–Fri · 6:30a–4:30p<br>Sat · by appointment<br>24/7 · emergency pours</p>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2026 Atlas Concrete Works · Fictional sample site</span>
          <span>CSLB · License C-8 · #000000</span>
        </div>
      </div>
    </footer>
  `;

  function init() {
    const navMount = document.querySelector('[data-nav]');
    if (navMount) navMount.outerHTML = NAV_HTML;

    const footMount = document.querySelector('[data-footer]');
    if (footMount) {
      let html = FOOTER_HTML;
      if (footMount.hasAttribute('data-no-cta')) {
        html = FOOTER_HTML.replace(/<section class="cta-band"[\s\S]*?<\/section>/, '');
      }
      footMount.outerHTML = html;
    }

    wireHamburger();
  }

  function wireHamburger() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function open() {
      menu.hidden = false;
      // next frame so the transition can animate from hidden -> visible
      requestAnimationFrame(() => menu.classList.add('is-open'));
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.classList.add('is-open');
      document.body.classList.add('menu-open');
    }
    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      // hide after the transition so it's removed from the a11y tree
      setTimeout(() => {
        if (!menu.classList.contains('is-open')) menu.hidden = true;
      }, 220);
    }

    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') close(); else open();
    });

    // Close on link click
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close();
    });

    // Close when crossing back to desktop width
    const mq = window.matchMedia('(min-width: 821px)');
    const onChange = (e) => { if (e.matches) close(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
