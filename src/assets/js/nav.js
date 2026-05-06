(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('navbarSupportedContent');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
        var expanded = nav.classList.contains('open');
        toggle.setAttribute('aria-expanded', expanded);
      });
    }
  });
})();
