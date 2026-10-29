/* W Consulting Services — site config + behaviour.
 * Fill in the three values below before launch. Everything else is wiring. */
var SITE_CONFIG = {
  // Scheduling page to embed in "Find a time" (Cal.com, Calendly, Google appointment page, etc.).
  // Leave empty to show the email fallback instead of an embed.
  schedulingUrl: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uARUA0IMknYEjOB6Nei40o2CogWgLB4AkwE7a0VPa7JEKuDpQAQvASA1LkXrDom7DLVeVbIGh?gv=true",
  // Short booking link used on buttons (opens in a new tab).
  bookingUrl: "https://calendar.app.google/3QA8uuYChjPQmaer5",
  // Where the contact form posts (e.g. "https://formspree.io/f/abcd1234").
  // Leave empty and the form opens the visitor's mail client addressed to contactEmail.
  formEndpoint: "",
  // Public contact address shown on the page and used by the mailto fallback.
  contactEmail: "steve@example.com"
};

(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.classList.remove('open'); }
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Contact email
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.textContent = SITE_CONFIG.contactEmail;
    if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.contactEmail;
  });

  // Scheduling embed
  var slot = document.getElementById('schedule-slot');
  if (slot) {
    if (SITE_CONFIG.schedulingUrl) {
      var frame = document.createElement('iframe');
      frame.src = SITE_CONFIG.schedulingUrl;
      frame.title = 'Schedule a call';
      frame.loading = 'lazy';
      frame.setAttribute('allow', 'payment');
      slot.innerHTML = '';
      slot.appendChild(frame);
      slot.classList.add('has-embed');
      var btn = document.getElementById('schedule-link');
      if (btn) { btn.href = SITE_CONFIG.bookingUrl || SITE_CONFIG.schedulingUrl; btn.target = '_blank'; btn.rel = 'noopener'; }
    } else {
      slot.querySelectorAll('[data-email]').forEach(function (el) { el.textContent = SITE_CONFIG.contactEmail; if (el.tagName === 'A') el.href = 'mailto:' + SITE_CONFIG.contactEmail + '?subject=' + encodeURIComponent('Find a time: W Consulting Services'); });
    }
  }

  // Booking buttons
  document.querySelectorAll('[data-booking]').forEach(function (el) {
    var url = SITE_CONFIG.bookingUrl || SITE_CONFIG.schedulingUrl;
    if (url) { el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
  });

  // Contact form: post to endpoint if configured, else open a pre-filled email
  var form = document.getElementById('contact-form');
  if (form) {
    if (SITE_CONFIG.formEndpoint) {
      form.action = SITE_CONFIG.formEndpoint;
      form.method = 'POST';
    } else {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var f = new FormData(form);
        var subject = 'Inquiry: ' + (f.get('topic') || 'W Consulting Services');
        var body = ['Name: ' + f.get('name'), 'Email: ' + f.get('email'), 'Company: ' + (f.get('company') || ''), 'Interested in: ' + f.get('topic'), '', f.get('message') || ''].join('\n');
        window.location.href = 'mailto:' + SITE_CONFIG.contactEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    }
    var t = new URLSearchParams(location.search).get('topic');
    var sel = document.getElementById('topic');
    if (t && sel && sel.querySelector('option[value="' + t + '"]')) sel.value = t;
  }

  // Highlight the nav link for the section in view
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
