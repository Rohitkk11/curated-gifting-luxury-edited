# Curated Gifting - Luxury Gift Boxes

A modern, responsive e-commerce website for curated luxury gift boxes. Built with vanilla HTML, CSS, and JavaScript.

## 🎁 Features

- **Responsive Design**: Mobile-first approach with beautiful UI at all breakpoints
- **Product Filtering**: Filter gift boxes by occasion, recipient, or collection
- **Multiple Collections**: 
  - Gift boxes for Her, Him, and Couples
  - Corporate gifting options
  - Festive seasonal collection (Diwali, Christmas, Valentine, etc.)
  - Custom box builder
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Elegant UI**: Premium design with luxury brand aesthetics
- **Review Section**: Customer testimonials with ratings
- **FAQ Section**: Common questions answered
- **Smooth Animations**: Enhanced user experience with CSS transitions

## 📋 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)
- A WhatsApp Business account (for ordering functionality)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/your-username/curated-gifting-luxury.git
   cd curated-gifting-luxury
   ```

2. **Configure WhatsApp Number**
   - Open `assets/js/script.js`
   - Find `const WHATSAPP_NUMBER = "919999999999"`
   - Replace with your actual WhatsApp number in international format (country code + number, no + or spaces)
   - Example: `919876543210` for +91 9876543210

3. **Update Product Information**
   - Edit product names, descriptions, and prices in `assets/js/script.js`
   - Update collection categories and tags as needed
   - Add your brand name and copy throughout the site

4. **Run Locally**
   Using Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Or using Node.js (with http-server):
   ```bash
   npx http-server
   ```
   
   Then open `http://localhost:8000` in your browser

## 📁 Project Structure

```
curated-gifting-luxury-edited/
├── index.html              # Main HTML structure
├── assets/
│   ├── css/
│   │   └── style.css       # All styling and responsive design
│   ├── js/
│   │   └── script.js       # Product data, filtering, and interactions
│   └── images/             # Image assets folder
├── .gitignore              # Git ignore file
├── package.json            # Project metadata (optional)
└── README.md               # This file
```

## 🎨 Customization

### Colors & Branding
The color scheme is defined in `assets/css/style.css` using CSS variables:
- Primary ink: `#1d1a17`
- Gold accent: `#b28a45`
- Cream background: `#f7f3eb`
- Seasonal colors for Diwali, Christmas, Valentine, etc.

Edit the `:root` CSS variables to match your brand.

### Products
Edit the `products` array in `assets/js/script.js`:
```javascript
{
  name: "Product Name",
  price: 1499,
  cat: ["category1", "category2"],
  tag: "LABEL",
  desc: "Product description here."
}
```

### Sections
All sections are responsive and can be customized:
- Hero section with CTA
- Collections by occasion
- Seasonal/Festive featuring
- Custom box builder
- Reviews section
- FAQ section

## 🚀 Deployment

### Static Hosting Options
- **Netlify**: Drag & drop to deploy
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free static hosting
- **Firebase Hosting**: Firebase console deployment
- **AWS S3**: Cloud-based static hosting

### Deploy to Netlify (Easiest)
1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy with one click

### Deploy to GitHub Pages
```bash
git remote add origin https://github.com/your-username/curated-gifting-luxury.git
git branch -M main
git push -u origin main
```
Enable GitHub Pages in repository settings (Settings > Pages > Deploy from branch).

## 💬 WhatsApp Integration

Customers can order directly via WhatsApp. When they click:
- "WhatsApp Order" button in header
- "View Details" on any product
- "Order Now" buttons

They'll be redirected to WhatsApp with a pre-filled message. Update the message templates in `script.js` as needed.

## 📱 Responsive Breakpoints

- Desktop: 1120px max-width container
- Tablet: 800px and below
- Mobile: 540px and below

## 🔧 Development

### Dependencies
This project uses no external dependencies - it's pure vanilla HTML, CSS, and JavaScript.

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 SEO & Meta Tags
Update the following in `index.html`:
- `<title>` - Page title
- `<meta name="description">` - Meta description for search results
- Add Open Graph tags for social sharing
- Add structured data (Schema.org) for better indexing

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 💡 Tips

1. **Add images**: Place product images in `assets/images/` and update CSS to display them
2. **Analytics**: Add Google Analytics tracking ID to monitor user behavior
3. **Forms**: Enhance with backend for custom box builder submissions
4. **Email**: Integrate email service for contact form submissions
5. **Payments**: Add payment gateway (Razorpay, PayU) if needed beyond WhatsApp orders

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for luxury gifting**
