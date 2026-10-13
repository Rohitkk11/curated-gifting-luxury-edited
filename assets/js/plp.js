const productsEl = document.getElementById("products");

// Get category from URL or default to 'festive'
const urlParams = new URLSearchParams(window.location.search);
const categoryFilter = urlParams.get('category') || 'festive';

const diwaliSubCategories = [
  { id: 101, name: "Peacock Glow Box", images: ["box1 v3.jpeg", "box1 v1.png", "box1 v2.png"] },
  { id: 102, name: "Sunehri Keepsake", images: ["box2 v1.jpeg"] },
  { id: 103, name: "Ruby Radiance Basket", images: ["basket1 v1.png", "basket1 v2.png"] },
  { id: 104, name: "Mithai & Diya Hamper", images: ["basket 2 v1.png"] },
  { id: 105, name: "Marigold Canopy", images: ["basket3 v1.jpeg"] },
  { id: 106, name: "Golden Hour Hamper", images: ["basket4 v1.jpeg"] },
  { id: 107, name: "Ruby Rhythm Keepsake", images: ["damru1 v1.png", "damru1 v2.png"] },
  { id: 108, name: "Gulabi Utsav", images: ["orange1 v1.png", "orange1 v2.png"] }
];

function getDiwaliImagePath(fileName) {
  return `../assets/images/allLatestGiftImages/Diwali/${fileName}`;
}

function renderDiwaliSubCategories() {
  productsEl.innerHTML = diwaliSubCategories
    .map(({ id, name, images }) => {
      const validImages = images.filter(Boolean);
      const imageSlides = validImages
        .map((fileName) => `
          <div class="diwali-slide">
            <img src="${getDiwaliImagePath(fileName)}" alt="${name} ${fileName}" />
          </div>
        `)
        .join("");

      const dots = validImages
        .map((_, idx) => `<button class="diwali-dot ${idx === 0 ? "active" : ""}" data-index="${idx}" aria-label="View ${name} variant ${idx + 1}"></button>`)
        .join("");

      return `
        <article class="card diwali-category-card" data-product-id="${id}" data-category="${name}" data-variants="${validImages.join(",")}" tabindex="0" role="button" aria-label="View ${name} Diwali product details">
          <div class="diwali-slider" data-index="0" data-total="${validImages.length}">
            <div class="diwali-slider-track">
              ${imageSlides}
            </div>
            ${validImages.length > 1 ? `
              <div class="diwali-slider-controls">
                <button class="diwali-slider-btn diwali-prev" aria-label="Previous ${name} image" type="button">‹</button>
                <div class="diwali-slider-dots">${dots}</div>
                <button class="diwali-slider-btn diwali-next" aria-label="Next ${name} image" type="button">›</button>
              </div>
            ` : ""}
          </div>
          <div class="card-body">
            <h3>${name}</h3>
            <div class="desc">${validImages.length} variant${validImages.length > 1 ? "s" : ""} in this collection</div>
            <div class="card-actions">
              <button class="btn soft" type="button" onclick="window.location.href='product.html?id=${id}'">View Details</button>
              <button class="btn primary" type="button" onclick="wa('Hi! I would like to order the ${name} Diwali gifting option.')">Order</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  productsEl.querySelectorAll(".diwali-category-card").forEach((card) => {
    const trigger = () => {
      const productId = card.dataset.productId;
      if (productId) {
        window.location.href = `product.html?id=${productId}`;
        return;
      }

      const categoryName = card.dataset.category;
      const variants = (card.dataset.variants || "").split(",").filter(Boolean);
      const message = variants.length > 0
        ? `Hi! I would like to enquire about the ${categoryName} Diwali gifting option. Available variants: ${variants.join(", ")}.`
        : `Hi! I would like to enquire about the ${categoryName} Diwali gifting option.`;
      wa(message);
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      trigger();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        trigger();
      }
    });
  });

  productsEl.querySelectorAll(".diwali-slider").forEach((slider) => {
    const track = slider.querySelector(".diwali-slider-track");
    const dots = slider.querySelectorAll(".diwali-dot");
    const prevBtn = slider.querySelector(".diwali-prev");
    const nextBtn = slider.querySelector(".diwali-next");
    const total = Number(slider.dataset.total || 1);

    const updateSlider = () => {
      const index = Number(slider.dataset.index || 0);
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
    };

    prevBtn?.addEventListener("click", (event) => {
      event.stopPropagation();
      const current = Number(slider.dataset.index || 0);
      slider.dataset.index = String((current - 1 + total) % total);
      updateSlider();
    });

    nextBtn?.addEventListener("click", (event) => {
      event.stopPropagation();
      const current = Number(slider.dataset.index || 0);
      slider.dataset.index = String((current + 1) % total);
      updateSlider();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        slider.dataset.index = dot.dataset.index;
        updateSlider();
      });
    });

    updateSlider();
  });
}

function renderPLP(filter = 'festive') {
  let filteredProducts = products;
  
  if (filter === "birthdayanniversary") {
    filteredProducts = products.filter((p) => p.cat.includes("birthday") || p.cat.includes("anniversary"));
  } else if (filter === "birthday-her") {
    filteredProducts = products.filter((p) => p.cat.includes("birthday") && p.cat.includes("her"));
  } else if (filter === "birthday-him") {
    filteredProducts = products.filter((p) => p.cat.includes("birthday") && p.cat.includes("him"));
  } else if (filter === "anniversary") {
    filteredProducts = products.filter((p) => p.cat.includes("anniversary"));
  } else if (filter === "corporate-single") {
    filteredProducts = products.filter((p) => p.cat.includes("corporate") && p.tag !== "BULK");
  } else if (filter === "corporate-bulk") {
    filteredProducts = products.filter((p) => p.cat.includes("corporate") && p.tag === "BULK");
  } else if (filter === "diwali") {
    renderDiwaliSubCategories();
    return;
  } else if (filter === "christmas") {
    filteredProducts = products.filter((p) => p.cat.includes("christmas"));
  } else if (filter === "valentine") {
    filteredProducts = products.filter((p) => p.cat.includes("valentine"));
  } else if (filter === "newyear") {
    filteredProducts = products.filter((p) => p.cat.includes("newyear"));
  } else if (filter !== "custom") {
    filteredProducts = products.filter((p) => p.cat.includes(filter));
  }
  
  productsEl.innerHTML = filteredProducts
    .map(
      (p) => {
        const isComingSoon = p.tag === "COMING SOON";
        const imagePath = p.folder && p.images?.length
          ? `../assets/images/allLatestGiftImages/${p.folder}/${p.images[0]}`
          : `../assets/images/allLatestGiftImages/${p.name}.jpeg`;

        return `
          <article class="card">
            <div class="product-img">
              <span class="tag">${p.tag}</span>
              <img src="${imagePath}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="card-body">
              <h3>${p.name}</h3>
              <div class="desc">${p.desc}</div>
              <div class="price">${isComingSoon ? 'Coming Soon' : `₹${p.price.toLocaleString("en-IN")}`}</div>
              <div class="card-actions">
                <button class="btn soft" onclick="window.location.href='product.html?id=${p.id}'" ${isComingSoon ? 'disabled aria-disabled="true" style="opacity:0.5; cursor:not-allowed;"' : ''}>View Details</button>
                <button class="btn primary" onclick="wa('Hi! I would like to order the ${p.name} for ₹${p.price.toLocaleString("en-IN")}.')" ${isComingSoon ? 'disabled aria-disabled="true" style="opacity:0.5; cursor:not-allowed;"' : ''}>Order</button>
              </div>
            </div>
          </article>
        `;
      }
    )
    .join("");
}

// Initial render
renderPLP(categoryFilter);

// Handle dropdown items
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const filter = item.dataset.filter;
    const href = item.dataset.href;
    
    if (href) {
      window.location.href = href;
      return;
    }
    
    // Update active state
    document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    item.closest(".pill-group").querySelector(".pill").classList.add("active");
    
    // Handle custom options
    if (filter === "customize") {
      openCustom();
    } else if (filter.startsWith("custom-")) {
      const budgetMap = {
        "custom-999": "Under ₹999",
        "custom-1499": "₹999–₹1,499",
        "custom-2499": "₹1,500–₹2,499",
        "custom-2500": "₹2,500+"
      };
      document.getElementById("budget").value = budgetMap[filter];
      openCustom();
    } else {
      renderPLP(filter);
    }
  });
});

// Handle single pills without dropdowns
document.querySelectorAll(".pills > .pill:not([data-filter='custom'])").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((x) => x.classList.remove("active"));
    button.classList.add("active");
    renderPLP(button.dataset.filter);
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
