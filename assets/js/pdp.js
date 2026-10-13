const pdpContent = document.getElementById("pdp-content");

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function getProductImagePath(product) {
  if (product && product.folder && product.images && product.images.length) {
    return product.images.map((fileName) => `../assets/images/allLatestGiftImages/${product.folder}/${fileName}`);
  }

  return [`../assets/images/allLatestGiftImages/${product.name}.jpeg`];
}

function renderPDP() {
  const product = getProductById(productId);
  
  if (!product) {
    pdpContent.innerHTML = '<p>Product not found</p>';
    return;
  }
  
  const isComingSoon = product.tag === "COMING SOON";
  const galleryImages = getProductImagePath(product);
  const slides = galleryImages
    .map((src) => `
      <div class="pdp-slide">
        <img src="${src}" alt="${product.name}">
      </div>
    `)
    .join("");
  const dots = galleryImages
    .map((_, index) => `<button class="pdp-dot ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="View ${product.name} image ${index + 1}"></button>`)
    .join("");
  
  pdpContent.innerHTML = `
    <div class="pdp-gallery">
      <div class="pdp-slider" data-index="0" data-total="${galleryImages.length}">
        <div class="pdp-slider-track">
          ${slides}
        </div>
        ${galleryImages.length > 1 ? `
          <div class="pdp-slider-controls">
            <button class="pdp-slider-btn pdp-prev" type="button" aria-label="Previous image">‹</button>
            <div class="pdp-slider-dots">${dots}</div>
            <button class="pdp-slider-btn pdp-next" type="button" aria-label="Next image">›</button>
          </div>
        ` : ""}
      </div>
    </div>
    <div class="pdp-info">
      <span class="pdp-tag">${product.tag}</span>
      <h1>${product.name}</h1>
      <div class="pdp-price">${isComingSoon ? 'Coming Soon' : `₹${product.price.toLocaleString("en-IN")}`}</div>
      <div class="pdp-desc">${product.desc}</div>
      <div class="pdp-actions">
        <button class="btn primary" onclick="wa('Hi! I would like to order the ${product.name} for ₹${product.price.toLocaleString("en-IN")}.')" ${isComingSoon ? 'disabled aria-disabled="true" style="opacity:0.5; cursor:not-allowed;"' : ''}>Order Now</button>
      </div>
    </div>
  `;

  const slider = document.querySelector(".pdp-slider");
  if (slider) {
    const track = slider.querySelector(".pdp-slider-track");
    const dots = slider.querySelectorAll(".pdp-dot");
    const prevBtn = slider.querySelector(".pdp-prev");
    const nextBtn = slider.querySelector(".pdp-next");
    const total = Number(slider.dataset.total || 1);

    const updateSlider = () => {
      const index = Number(slider.dataset.index || 0);
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
    };

    prevBtn?.addEventListener("click", () => {
      const current = Number(slider.dataset.index || 0);
      slider.dataset.index = String((current - 1 + total) % total);
      updateSlider();
    });

    nextBtn?.addEventListener("click", () => {
      const current = Number(slider.dataset.index || 0);
      slider.dataset.index = String((current + 1) % total);
      updateSlider();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        slider.dataset.index = dot.dataset.index;
        updateSlider();
      });
    });

    updateSlider();
  }
  
  document.title = product.name + " | Sajja";
}

renderPDP();

// Handle dropdown navigation
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const href = item.dataset.href;
    if (href) {
      window.location.href = href;
    }
  });
});

function openCustom() {
  document.getElementById("customModal").classList.add("open");
}

function closeCustom() {
  document.getElementById("customModal").classList.remove("open");
}

function submitCustom(e) {
  e.preventDefault();
  const text = `Hi! I'd like to create a custom gift box.%0A%0AFor: ${document.getElementById("for").value}%0AOccasion: ${document.getElementById("occasion").value}%0ABudget: ${document.getElementById("budget").value}%0APreferences: ${document.getElementById("prefs").value || "Not specified"}%0APersonalized message: ${document.getElementById("msg").value || "None"}`;
  wa(text);
}

window.addEventListener("click", (e) => {
  if (e.target.id === "customModal") closeCustom();
});
