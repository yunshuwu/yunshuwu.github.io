// Jekyll 3/Kramdown 1 emits legacy math/tex scripts; Kramdown 2 emits delimiters.
// Normalize the former so both work with the same MathJax 3 renderer.
window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  startup: {
    ready: function () {
      document.querySelectorAll('script[type^="math/tex"]').forEach(function (script) {
        var display = script.type.indexOf('mode=display') !== -1;
        var math = document.createElement(display ? 'div' : 'span');
        math.textContent = (display ? '\\[' : '\\(') + script.textContent + (display ? '\\]' : '\\)');
        script.replaceWith(math);
      });
      window.MathJax.startup.defaultReady();
    }
  }
};
