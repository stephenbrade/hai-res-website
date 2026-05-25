(function () {
  const INTERVAL_MS = 5000;
  const SLIDE_COLORS = ["#66F4FF", "#FFC067", "#66C4FF", "#7D99AA"];
  const SHAPE_COUNT = 4;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const section = document.getElementById("blog-carousel");
  if (!section) return;

  const track = section.querySelector(".blog-carousel__track");
  const counterEl = section.querySelector(".blog-carousel__counter");
  const prevBtn = section.querySelector(".blog-carousel__arrow--prev");
  const nextBtn = section.querySelector(".blog-carousel__arrow--next");
  const dotsEl = section.querySelector(".blog-carousel__dots");
  const navEl = section.querySelector(".blog-carousel__nav");

  let posts = [];
  let current = 0;
  let timer = null;

  function formatDate(isoDate) {
    const date = new Date(isoDate + "T12:00:00");
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function showSlide(index) {
    if (!posts.length) return;
    current = ((index % posts.length) + posts.length) % posts.length;
    const post = posts[current];
    const accent = SLIDE_COLORS[current % SLIDE_COLORS.length];

    track.querySelectorAll(".blog-carousel__slide").forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
      slide.hidden = i !== current;
    });

    dotsEl.querySelectorAll(".blog-carousel__dot").forEach((dot, i) => {
      const selected = i === current;
      dot.classList.toggle("is-active", selected);
      dot.setAttribute("aria-selected", selected ? "true" : "false");
    });

    counterEl.textContent = `${current + 1}/${posts.length}`;
    navEl.style.setProperty("--nav-accent", accent);
    section.style.setProperty("--active-accent", accent);
    section.setAttribute("aria-label", `Featured blog posts: ${post.title}`);
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function startTimer() {
    if (reducedMotion || posts.length <= 1) return;
    stopTimer();
    timer = window.setInterval(nextSlide, INTERVAL_MS);
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function buildSlides() {
    track.innerHTML = "";
    dotsEl.innerHTML = "";

    posts.forEach((post, i) => {
      const accent = SLIDE_COLORS[i % SLIDE_COLORS.length];
      const shapeIndex = i % SHAPE_COUNT;
      const isActive = i === 0;

      const slide = document.createElement("article");
      slide.className = "blog-carousel__slide" + (isActive ? " is-active" : "");
      slide.hidden = !isActive;
      slide.style.setProperty("--slide-accent", accent);
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${post.title} — ${formatDate(post.date)}`);

      slide.innerHTML = `
        <div class="blog-carousel__slide-inner">
          <div class="blog-carousel__panel blog-carousel__panel--shape-${shapeIndex}">
            <p class="blog-carousel__label">Blog · ${formatDate(post.date)}</p>
            <h2 class="blog-carousel__title">
              <a href="${post.url}">${post.title}</a>
            </h2>
            <p class="blog-carousel__excerpt">${post.excerpt || post.subtitle || ""}</p>
            <a class="blog-carousel__link" href="${post.url}">Read more →</a>
          </div>
          <a class="blog-carousel__media" href="${post.url}" tabindex="-1" aria-hidden="true">
            <img src="${post.thumbnail}" alt="" loading="${i === 0 ? "eager" : "lazy"}">
          </a>
        </div>
      `;

      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "blog-carousel__dot" + (isActive ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Show ${post.title}`);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.style.setProperty("--dot-accent", accent);
      dot.addEventListener("click", () => {
        showSlide(i);
        startTimer();
      });
      dotsEl.appendChild(dot);
    });
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startTimer();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startTimer();
  });

  section.addEventListener("mouseenter", stopTimer);
  section.addEventListener("mouseleave", startTimer);
  section.addEventListener("focusin", stopTimer);
  section.addEventListener("focusout", startTimer);

  function loadPosts() {
    const inline = document.getElementById("blog-carousel-data");
    if (inline) {
      try {
        const data = JSON.parse(inline.textContent);
        if (Array.isArray(data) && data.length > 0) {
          return Promise.resolve(data);
        }
      } catch (_err) {
        /* fall through to fetch */
      }
    }

    return fetch("./data/blog.json", { cache: "no-store" }).then((res) => {
      if (!res.ok) throw new Error("Failed to load blog.json");
      return res.json();
    });
  }

  loadPosts()
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;
      posts = data;
      buildSlides();
      showSlide(0);
      section.hidden = false;
      if (posts.length <= 1) {
        navEl.hidden = true;
        dotsEl.hidden = true;
      }
      startTimer();
    })
    .catch(() => {
      section.hidden = true;
    });
})();
