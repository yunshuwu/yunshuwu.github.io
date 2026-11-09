(function () {
  'use strict';

  var root = document.documentElement;
  var system = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;
  try { preference = localStorage.getItem('site-theme'); } catch (error) {}
  if (preference !== 'light' && preference !== 'dark') preference = null;

  function applyTheme() {
    var theme = preference || (root.dataset.defaultTheme === 'auto' && system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var dark = theme === 'dark';
    var button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      button.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '☾';
      button.querySelector('.theme-toggle-label').textContent = dark ? 'Light' : 'Dark';
    }
    document.querySelectorAll('link[rel="icon"]').forEach(function (link) {
      link.media = link.href.indexOf('favicon-dark') !== -1
        ? (dark ? 'all' : 'not all') : (dark ? 'not all' : 'all');
    });
  }

  // Set the theme before styles load to avoid flashing the wrong background.
  applyTheme();
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme();
    document.querySelector('.theme-toggle').addEventListener('click', function () {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('site-theme', preference); } catch (error) {}
      applyTheme();
    });
  });
  system.addEventListener('change', function () { if (!preference) applyTheme(); });
  window.addEventListener('storage', function (event) {
    if (event.key !== 'site-theme' && event.key !== null) return;
    preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    applyTheme();
  });
})();
