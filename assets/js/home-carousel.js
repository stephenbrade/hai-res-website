(function () {
  const INTERVAL_MS = 5000;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const section = document.getElementById("blog-carousel");
  if (!section) return;

  const track = section.querySelector(".blog-carousel__track");
  const dateEl = section.querySelector(".blog-carousel__date");
  const titleEl = section.querySelector(".blog-carousel__title");
  const excerptEl = section.querySelector(".blog-carousel__excerpt");
  const linkEl = section.querySelector(".blog-carousel__link");
  const dotsEl = section.querySelector(".blog-carousel__dots");

  let posts = [];
  let current = 0;
  let timer = null;

  function showSlide(index) {
    if (!posts.length) return;
    current = ((index % posts.length) + posts.length) % posts.length;
    const post = posts[current];

    track.querySelectorAll(".blog-carousel__slide").forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    dotsEl.querySelectorAll(".blog-carousel__dot").forEach((dot, i) => {
      const selected = i === current;
      dot.classList.toggle("is-active", selected);
      dot.setAttribute("aria-selected", selected ? "true" : "false");
    });

    dateEl.textContent = post.date;
    titleEl.textContent = post.title;
    excerptEl.textContent = post.excerpt || post.subtitle;
    linkEl.href = post.url;
    linkEl.textContent = "Read more";
  }

  function nextSlide() {
    showSlide(current + 1);
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
      const slide = document.createElement("div");
      slide.className = "blog-carousel__slide" + (i === 0 ? " is-active" : "");
      slide.style.backgroundImage = `url("${post.thumbnail}")`;
      slide.setAttribute("role", "img");
      slide.setAttribute("aria-label", post.title);
      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "blog-carousel__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Show ${post.title}`);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", () => {
        showSlide(i);
        startTimer();
      });
      dotsEl.appendChild(dot);
    });
  }

  section.addEventListener("mouseenter", stopTimer);
  section.addEventListener("mouseleave", startTimer);
  section.addEventListener("focusin", stopTimer);
  section.addEventListener("focusout", startTimer);

  track.addEventListener("click", () => {
    if (posts[current]) {
      window.location.href = posts[current].url;
    }
  });
  track.style.cursor = "pointer";

  fetch("./data/blog.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load blog.json");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;
      posts = data;
      buildSlides();
      showSlide(0);
      section.hidden = false;
      startTimer();
    })
    .catch(() => {
      section.hidden = true;
    });
})();
