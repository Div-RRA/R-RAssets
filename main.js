// Mark current nav link
(() => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
})();

// Simple parallax (no libraries)
(() => {
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  if (!parallaxEls.length) return;

  const onScroll = () => {
    const vh = window.innerHeight;
    for (const el of parallaxEls) {
      const media = el.querySelector(".media");
      if (!media) continue;

      const rect = el.getBoundingClientRect();
      // progress from -1 to 1 around viewport
      const progress = (rect.top + rect.height/2 - vh/2) / (vh/2);
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.18; // 0.12–0.25 feels nice
      const y = Math.max(-60, Math.min(60, -progress * 90 * speed));
      media.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  };

  let raf = null;
  const requestTick = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      onScroll();
    });
  };

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  onScroll();
})();

// Reveal-on-scroll
(() => {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();
