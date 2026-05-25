(function () {
  document.querySelectorAll(".compare-table audio").forEach(function (el) {
    el.addEventListener("play", function () {
      document.querySelectorAll(".compare-table audio").forEach(function (other) {
        if (other !== el && !other.paused) {
          other.pause();
        }
      });
    });
  });

  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      var text = target.textContent;
      navigator.clipboard.writeText(text).then(function () {
        var label = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = label;
          btn.classList.remove("is-copied");
        }, 2000);
      });
    });
  });
})();
