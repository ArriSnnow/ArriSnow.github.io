/* Portfolio interactions
 * 1. Mobile navigation toggle (accessible)
 * 2. Auto-highlight the current page in the nav
 * 3. Subtle solid header backing once the page is scrolled
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-links");

    /* --- Mobile menu --- */
    if (toggle && menu) {
      var setOpen = function (open) {
        menu.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
      };

      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(!menu.classList.contains("open"));
      });

      // Close when a link is tapped
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });

      // Close on outside click
      document.addEventListener("click", function (e) {
        if (
          menu.classList.contains("open") &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)
        ) {
          setOpen(false);
        }
      });

      // Close on Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });

      // Reset when resizing back to desktop
      window.addEventListener("resize", function () {
        if (window.innerWidth > 820) setOpen(false);
      });
    }

    /* --- Highlight the current page --- */
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      var target = (link.getAttribute("href") || "").toLowerCase();
      if (target === here || (here === "" && target === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });

    /* --- Scrolled header state --- */
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  });
})();
