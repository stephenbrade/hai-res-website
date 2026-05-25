document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  nav.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const normalized = href.replace(/^\.\//, '/').replace(/\/$/, '');
    if (normalized === path || (path.endsWith('index.html') && normalized === path.replace('/index.html', ''))) {
      link.setAttribute('aria-current', 'page');
    }
  });
});
