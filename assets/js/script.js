const WHATSAPP_NUMBER = "916386797822";
const diwaliSubCategories = [
  { name: "Peacock Glow Box", images: ["box1 v3.jpeg", "box1 v1.png", "box1 v2.png"] },
  { name: "Sunehri Keepsake", images: ["box2 v1.jpeg"] },
  { name: "Ruby Radiance Basket", images: ["basket1 v1.png", "basket1 v2.png"] },
  { name: "Mithai & Diya Hamper", images: ["basket 2 v1.png"] },
  { name: "Marigold Canopy", images: ["basket3 v1.jpeg"] },
  { name: "Golden Hour Hamper", images: ["basket4 v1.jpeg"] },
  { name: "Ruby Rhythm Keepsake", images: ["damru1 v1.png", "damru1 v2.png"] },
  { name: "Gulabi Utsav", images: ["orange1 v1.png", "orange1 v2.png"] }
];

const products = [
  { id: 1, name: "ProductP1Box1V1", price: 1599, cat: ["luxury"], tag: "NEW", desc: "Premium edition gift box with curated luxury items." },
  { id: 2, name: "Birthday Surprise", price: 1999, cat: ["birthday"], tag: "COMING SOON", desc: "A joyful gifting box for birthdays with warm, personalized touches." },
  { id: 3, name: "Anniversary Keepsake", price: 2499, cat: ["anniversary", "couple"], tag: "COMING SOON", desc: "A romantic keepsake box designed for unforgettable milestones." },
  { id: 4, name: "Noel Keepsake", price: 2399, cat: ["festive", "christmas"], tag: "COMING SOON", desc: "Luxury festive gifting with seasonal charm and premium details.", image: "assets/images/allLatestGiftImages/Christmas/noel%20keepsake.png" },
  { id: 5, name: "Valentine Romance", price: 2299, cat: ["couple", "valentine"], tag: "COMING SOON", desc: "An elegant duo box crafted for love-filled celebrations." },
  { id: 6, name: "Champagne Glow", price: 1499, cat: ["her", "birthday"], tag: "BESTSELLER", desc: "Scented candle, bracelet, chocolate & a personalized note." },
  { id: 7, name: "The Gentleman Edit", price: 1799, cat: ["him", "birthday"], tag: "POPULAR", desc: "Refined accessories, grooming essentials & premium treats." },
  { id: 8, name: "Just Us Luxury", price: 2499, cat: ["couple", "anniversary"], tag: "COMING SOON", desc: "A sophisticated celebration box with keepsakes for two." },
  { id: 9, name: "Sunehri Utsav", price: 1999, cat: ["her", "him", "festive"], tag: "DIWALI", desc: "Maroon-gold festive gifting with sweets, candle & keepsake.", image: "assets/images/allLatestGiftImages/Diwali/basket1%20v1.png" },
  { id: 10, name: "Black Gold Luxe", price: 2999, cat: ["luxury", "her"], tag: "LUXURY", desc: "Statement jewellery, premium candle and elegant finishing touches." },
  { id: 11, name: "Evergreen Noel", price: 2499, cat: ["festive", "couple", "christmas"], tag: "COMING SOON", desc: "Deep green festive box with indulgent treats and keepsakes.", image: "assets/images/allLatestGiftImages/Christmas/Evergreen%20Noel.png" },
  { id: 12, name: "Midnight Toast", price: 2499, cat: ["festive", "him", "newyear"], tag: "COMING SOON", desc: "Black-champagne celebration edit for a memorable start.", image: "assets/images/allLatestGiftImages/Christmas/midnight.png" },
  { id: 13, name: "Corporate Signature", price: 2999, cat: ["corporate", "luxury"], tag: "BULK", desc: "Premium professional gifting for clients, leaders and teams." }
];

const productsEl = document.getElementById("products");

function getDiwaliImagePath(fileName) {
  return `assets/images/allLatestGiftImages/Diwali/${fileName}`;
}

function renderDiwaliSubCategories() {
  productsEl.innerHTML = diwaliSubCategories
    .map(({ name, images }) => {
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
        <article class="card diwali-category-card" data-category="${name}" data-variants="${validImages.join(",")}" tabindex="0" role="button" aria-label="Select ${name} Diwali category">
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
          </div>
        </article>
      `;
    })
    .join("");

  productsEl.querySelectorAll(".diwali-category-card").forEach((card) => {
    const trigger = () => {
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
  });
}

function render(filter = "festive") {
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
      (p, i) => {
        const isComingSoon = p.tag === "COMING SOON";
        const imagePath = p.image || `assets/images/allLatestGiftImages/${p.name}.jpeg`;

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
                <button class="btn soft" onclick="window.location.href='pages/product.html?id=${p.id}'" ${isComingSoon ? 'disabled aria-disabled="true" style="opacity:0.5; cursor:not-allowed;"' : ''}>View Details</button>
                <button class="btn primary" onclick="wa('Hi! I would like to order the ${p.name} for ₹${p.price.toLocaleString("en-IN")}.')" ${isComingSoon ? 'disabled aria-disabled="true" style="opacity:0.5; cursor:not-allowed;"' : ''}>Order</button>
              </div>
            </div>
          </article>
        `;
      }
    )
    .join("");
}

render();

// Handle dropdown items
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const href = item.dataset.href;
    const filter = item.dataset.filter;
    const group = item.closest(".pill-group");
    
    // If href is provided, navigate to that page
    if (href) {
      window.location.href = href;
      return;
    }
    
    // Update active state
    document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    group.querySelector(".pill").classList.add("active");
    
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
      render(filter);
    }
  });
});

// Handle main category pills with navigation
document.querySelectorAll(".pill-group > .pill[data-href]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.dataset.href;
  });
});

function wa(text) {
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
}

function details(i) {
  const p = products[i];
  if (p.tag === "COMING SOON") return;
  wa("Hi! I'd like details for the " + p.name + " (₹" + p.price.toLocaleString("en-IN") + "). Please share what's included, customization options and delivery details.");
}

function openCustom() {
  document.getElementById("customModal").classList.add("open");
}

function closeCustom() {
  document.getElementById("customModal").classList.remove("open");
}

function submitCustom(e) {
  e.preventDefault();
  const text = `Hi! I'd like to create a custom gift box.%0A%0AFor: ${document.getElementById("for").value}%0AOccasion: ${document.getElementById("occasion").value}%0ABudget: ${document.getElementById("budget").value}%0APreferences: ${document.getElementById("prefs").value || "Not specified"}%0APersonalized message: ${document.getElementById("msg").value || "None"}`;
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank");
}

window.addEventListener("click", (e) => {
  if (e.target.id === "customModal") closeCustom();
});
