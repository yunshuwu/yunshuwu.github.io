(function () {
  'use strict';
  var button = document.getElementById('copy-bibtex');
  var text = document.getElementById('bibtex-text');
  var status = document.getElementById('copy-status');
  if (!button || !text || !navigator.clipboard || !window.isSecureContext) return;
  button.hidden = false;
  button.addEventListener('click', function () {
    navigator.clipboard.writeText(text.textContent.trim() + '\n').then(function () {
      status.textContent = 'BibTeX copied.';
    }).catch(function () {
      status.textContent = 'Please select and copy the BibTeX text below.';
    });
  });
}());
