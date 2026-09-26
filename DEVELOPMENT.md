# Local Development Guide

This guide will help you set up your local development environment for Curated Gifting.

## Prerequisites

- A code editor (VS Code recommended)
- Git installed on your machine
- A local web server (Python or Node.js)
- Modern browser for testing

## Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/curated-gifting-luxury.git
cd curated-gifting-luxury
```

### 2. Start Local Server

#### Option A: Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2 (if only Python 2 available)
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js
```bash
# If http-server is installed globally
http-server

# Or install and run
npx http-server
```

#### Option C: Live Server in VS Code
- Install "Live Server" extension by Ritwick Dey
- Right-click index.html and select "Open with Live Server"

### 3. Open in Browser
Navigate to: `http://localhost:8000`

## Development Workflow

### File Organization
```
assets/
├── css/
│   └── style.css          # Modify styles here
├── js/
│   └── script.js          # Modify JavaScript here
└── images/                # Add product images here

index.html                 # Main HTML file
```

### Making Changes

#### Adding Products
1. Open `assets/js/script.js`
2. Find the `products` array
3. Add new product objects:
```javascript
{
  name: "Product Name",
  price: 1999,
  cat: ["category1", "category2"],
  tag: "TAG",
  desc: "Description here"
}
```

#### Styling Changes
1. Open `assets/css/style.css`
2. Find relevant CSS rule
3. Modify properties
4. Save and refresh browser (Ctrl+R or Cmd+R)

#### Customizing Colors
Update CSS variables in `style.css`:
```css
:root {
  --ink: #1d1a17;
  --gold: #b28a45;
  --cream: #f7f3eb;
  /* ... more colors ... */
}
```

#### Modifying HTML
1. Open `index.html`
2. Edit sections as needed
3. Save and refresh

## Testing Locally

### Browser Testing
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: Use browser DevTools (F12 > Device Toolbar)
- Tablet: Test at 1024px width

### Mobile Testing
```bash
# Get your local IP
ipconfig getifaddr en0    # macOS
hostname -I               # Linux
ipconfig                  # Windows (look for IPv4 Address)

# Access from phone on same network
http://<your-ip>:8000
```

### Common Issues

**Issue**: Port 8000 already in use
**Solution**: 
```bash
python -m http.server 8001  # Use different port
```

**Issue**: CORS errors
**Solution**: Use a proper HTTP server, not file:// protocol

**Issue**: Images not loading
**Solution**: Check image paths are relative and placed in `assets/images/`

## Version Control

### Committing Changes
```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "type: description"

# Push to remote
git push origin feature-branch
```

### Branch Naming Convention
- Feature: `feature/short-description`
- Bug fix: `bugfix/short-description`
- Hotfix: `hotfix/short-description`

Example:
```bash
git checkout -b feature/add-payment-gateway
```

## Performance Optimization

### CSS Tips
- Already minified in production
- Consider inline critical CSS for faster loads

### JavaScript Tips
- Use vanilla JS (currently 0 dependencies)
- Keep bundle size small
- Optimize product image loading

### Image Optimization
```bash
# Compress images before committing
# Use tools like ImageOptim, TinyPNG, or similar
```

## Browser DevTools Tips

1. **Console Tab**: Check for errors
2. **Network Tab**: Monitor asset loading
3. **Responsive Design Mode** (Ctrl+Shift+M or Cmd+Shift+M)
4. **Performance Tab**: Check loading times
5. **Accessibility Tab**: Verify accessibility

## Code Style

### HTML
- Use 2-space indentation
- Semantic HTML5 elements
- Proper alt text for images

### CSS
- Organized by section
- CSS variables for consistency
- Mobile-first responsive approach

### JavaScript
- Clear, descriptive variable names
- Comments for complex logic
- DRY principle (Don't Repeat Yourself)

## Debugging

### Enable Debug Console
Add this to `script.js`:
```javascript
const debug = true;
function log(...args) {
  if (debug) console.log(...args);
}
```

### WhatsApp Link Testing
```javascript
// Test WhatsApp functionality
const number = "919999999999";
const message = "Hi! I would like to explore your luxury gift boxes.";
const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
console.log(url);
```

## Building for Production

### Minification (Optional)
- CSS is already minified in production
- Consider minifying JavaScript for deployment

### SEO Checklist
- [ ] Meta tags updated
- [ ] Open Graph tags added
- [ ] Structured data (Schema.org) included
- [ ] Sitemap.xml created
- [ ] robots.txt configured

## Deployment Testing

Before deploying:
1. Test all links work
2. Test WhatsApp integration
3. Test on mobile devices
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check for console errors
6. Test form submissions (if any)

## Getting Help

1. Check existing GitHub issues
2. Review CONTRIBUTING.md
3. Open a new issue with details
4. Check browser console for errors

## Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)
- [Web.dev](https://web.dev)

---

Happy coding! 🎁
