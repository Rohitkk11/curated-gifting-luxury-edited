const WHATSAPP_NUMBER = "919999999999"; // REPLACE WITH YOUR WHATSAPP NUMBER
const products = [
  { name: "ProductP1Box1V1", price: 1599, cat: ["luxury"], tag: "NEW", desc: "Premium edition gift box with curated luxury items." },
  { name: "Champagne Glow", price: 1499, cat: ["her", "birthday"], tag: "BESTSELLER", desc: "Scented candle, bracelet, chocolate & a personalized note." },
  { name: "The Gentleman Edit", price: 1799, cat: ["him", "birthday"], tag: "POPULAR", desc: "Refined accessories, grooming essentials & premium treats." },
  { name: "Just Us Luxury", price: 2499, cat: ["couple", "anniversary"], tag: "COUPLES", desc: "A sophisticated celebration box with keepsakes for two." },
  { name: "Diwali Royale", price: 1999, cat: ["her", "him", "festive"], tag: "DIWALI", desc: "Maroon-gold festive gifting with sweets, candle & keepsake." },
  { name: "Black Gold Luxe", price: 2999, cat: ["luxury", "her"], tag: "LUXURY", desc: "Statement jewellery, premium candle and elegant finishing touches." },
  { name: "Christmas Evergreen", price: 2499, cat: ["festive", "couple"], tag: "CHRISTMAS", desc: "Deep green festive box with indulgent treats and keepsakes." },
  { name: "Midnight Celebration", price: 2499, cat: ["festive", "him"], tag: "NEW YEAR", desc: "Black-champagne celebration edit for a memorable start." },
  { name: "Corporate Signature", price: 2999, cat: ["corporate", "luxury"], tag: "BULK", desc: "Premium professional gifting for clients, leaders and teams." }
];

const productsEl = document.getElementById("products");

function render(filter = "all") {
  productsEl.innerHTML = products
    .filter((p) => filter === "all" || p.cat.includes(filter))
    .map(
      (p, i) => `
        <article class="card">
          <div class="product-img">
            <span class="tag">${p.tag}</span>
            <img src="assets/images/allLatestGiftImages/${p.name}.jpeg" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="card-body">
            <h3>${p.name}</h3>
            <div class="desc">${p.desc}</div>
            <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
            <div class="card-actions">
              <button class="btn soft" onclick="details(${i})">View Details</button>
              <button class="btn primary" onclick="wa('Hi! I would like to order the ${p.name} for ₹${p.price.toLocaleString("en-IN")}.')">Order</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

render();

document.querySelectorAll(".pill").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((x) => x.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

function wa(text) {
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
}

function details(i) {
  const p = products[i];
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
