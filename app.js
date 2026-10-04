// EcoByte App Script Compatibility Loader
(function() {
  if (typeof initParticlesCanvas === 'undefined') {
    var s = document.createElement('script');
    s.src = 'script.js';
    document.head.appendChild(s);
  }
})();
