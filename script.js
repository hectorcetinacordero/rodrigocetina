(() => {
  const root = document.documentElement;

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    const toggle = () => {
      const open = menu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", toggle);
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  // Theme
  const themeBtn = document.getElementById("themeBtn");
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored;
  } else {
    // follow system preference by default
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = prefersLight ? "light" : "dark";
  }
  const updateThemeIcon = () => {
    const icon = themeBtn?.querySelector(".theme__icon");
    if (!icon) return;
    icon.textContent = (root.dataset.theme === "light") ? "☀" : "☾";
  };
  updateThemeIcon();

  themeBtn?.addEventListener("click", () => {
    root.dataset.theme = (root.dataset.theme === "light") ? "dark" : "light";
    localStorage.setItem("theme", root.dataset.theme);
    updateThemeIcon();
  });

  // Contact: copy + open email
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const full = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      // ignore clipboard errors
    }

    const subject = encodeURIComponent("Contacto desde tu sitio web");
    const body = encodeURIComponent(full);
    window.location.href = `mailto:rodcetinamarfil@gmail.com?subject=${subject}&body=${body}`;
  });
})();
