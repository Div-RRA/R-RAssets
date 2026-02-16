// Mark current nav link
(() => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
})();
