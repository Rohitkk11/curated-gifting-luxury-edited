const WHATSAPP_NUMBER = "916386797822";

const products = [
  { id: 1, name: "ProductP1Box1V1", price: 1599, cat: ["luxury"], tag: "NEW", desc: "Premium edition gift box with curated luxury items." },
  { id: 2, name: "Birthday Surprise", price: 1999, cat: ["birthday"], tag: "COMING SOON", desc: "A joyful gifting box for birthdays with warm, personalized touches." },
  { id: 3, name: "Anniversary Keepsake", price: 2499, cat: ["anniversary", "couple"], tag: "COMING SOON", desc: "A romantic keepsake box designed for unforgettable milestones." },
  { id: 4, name: "Noel Keepsake", price: 2399, cat: ["festive", "christmas"], tag: "COMING SOON", desc: "Luxury festive gifting with seasonal charm and premium details.", folder: "Christmas", images: ["noel keepsake.png"] },
  { id: 5, name: "Valentine Romance", price: 2299, cat: ["couple", "valentine"], tag: "COMING SOON", desc: "An elegant duo box crafted for love-filled celebrations." },
  { id: 6, name: "Champagne Glow", price: 1499, cat: ["her", "birthday"], tag: "BESTSELLER", desc: "Scented candle, bracelet, chocolate & a personalized note." },
  { id: 7, name: "The Gentleman Edit", price: 1799, cat: ["him", "birthday"], tag: "POPULAR", desc: "Refined accessories, grooming essentials & premium treats." },
  { id: 8, name: "Just Us Luxury", price: 2499, cat: ["couple", "anniversary"], tag: "COMING SOON", desc: "A sophisticated celebration box with keepsakes for two." },
  { id: 9, name: "Sunehri Utsav", price: 1999, cat: ["her", "him", "festive"], tag: "DIWALI", desc: "Maroon-gold festive gifting with sweets, candle & keepsake.", folder: "Diwali", images: ["basket1 v1.png", "basket1 v2.png"] },
  { id: 10, name: "Black Gold Luxe", price: 2999, cat: ["luxury", "her"], tag: "LUXURY", desc: "Statement jewellery, premium candle and elegant finishing touches." },
  { id: 11, name: "Evergreen Noel", price: 2499, cat: ["festive", "couple", "christmas"], tag: "COMING SOON", desc: "Deep green festive box with indulgent treats and keepsakes.", folder: "Christmas", images: ["Evergreen Noel.png"] },
  { id: 12, name: "Midnight Toast", price: 2499, cat: ["festive", "him", "newyear"], tag: "COMING SOON", desc: "Black-champagne celebration edit for a memorable start.", folder: "Christmas", images: ["midnight.png"] },
  { id: 13, name: "Corporate Signature", price: 2999, cat: ["corporate", "luxury"], tag: "BULK", desc: "Premium professional gifting for clients, leaders and teams." },
  { id: 101, name: "Peacock Glow Box", price: 1999, cat: ["diwali"], tag: "DIWALI", desc: "An ornate, gold-lined Diwali hamper arranged with festive potlis, glowing diyas, marigold accents, and a peacock feather. Its layered presentation makes a striking centerpiece for Diwali gifting.", folder: "Diwali", images: ["box1 v3.jpeg", "box1 v1.png", "box1 v2.png"] },
  { id: 102, name: "Sunehri Keepsake", price: 2499, cat: ["diwali"], tag: "DIWALI", desc: "An open, gold-finish keepsake box with embroidered potlis, a Ganesh centerpiece, and marigold accents. Warm lights and ornate trim give this hamper a striking, celebratory presentation.", folder: "Diwali", images: ["box2 v1.jpeg"] },
  { id: 103, name: "Ruby Radiance Basket", price: 2299, cat: ["diwali"], tag: "DIWALI", desc: "A red-and-ivory woven hamper finished with a statement bow, pearl-like trim, and festive netting. Warm lights and traditional accents make it a distinctive Diwali presentation.", folder: "Diwali", images: ["basket1 v1.png", "basket1 v2.png"] },
  { id: 104, name: "Mithai & Diya Hamper", price: 2399, cat: ["diwali"], tag: "DIWALI", desc: "A round red brocade hamper arranged with assorted treats, decorative diyas, and a candle. Gold edging, marigold accents, and a festive message card complete its ready-to-gift look.", folder: "Diwali", images: ["basket 2 v1.png"] },
  { id: 105, name: "Marigold Canopy", price: 2199, cat: ["diwali"], tag: "DIWALI", desc: "A red woven basket framed by an arched net canopy and layered gold trim. Festive figurines, a glowing diya, and marigold details create a traditional Diwali display.", folder: "Diwali", images: ["basket3 v1.jpeg"] },
  { id: 106, name: "Golden Hour Hamper", price: 2099, cat: ["diwali"], tag: "DIWALI", desc: "A natural woven basket dressed with red netting, a peacock feather, and warm golden accents. A candle, decorative diya, and carefully arranged treats give it a rich festive finish.", folder: "Diwali", images: ["basket4 v1.jpeg"] },
  { id: 107, name: "Ruby Rhythm Keepsake", price: 1999, cat: ["diwali"], tag: "DIWALI", desc: "A compact damru-shaped keepsake pouch in red brocade, detailed with gold embroidery and pearl-like trim. Its sculpted silhouette and festive finish make it a distinctive Diwali gift.", folder: "Diwali", images: ["damru1 v1.png", "damru1 v2.png"] },
  { id: 108, name: "Gulabi Utsav", price: 1899, cat: ["diwali"], tag: "DIWALI", desc: "A round red potli box with a loop handle and ornate gold floral stitching. Compact and richly detailed, it makes a charming festive keepsake or a container for a small gift.", folder: "Diwali", images: ["orange1 v1.png", "orange1 v2.png"] }
];

function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function wa(text) {
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
}

function details(id) {
  const p = getProductById(id);
  if (!p || p.tag === "COMING SOON") return;
  wa("Hi! I'd like details for the " + p.name + " (₹" + p.price.toLocaleString("en-IN") + "). Please share what's included, customization options and delivery details.");
}
