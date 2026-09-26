# Deployment Guide

Detailed instructions for deploying Curated Gifting to production.

## Pre-Deployment Checklist

- [ ] All WhatsApp links functional in WhatsApp_NUMBER is correct
- [ ] Product information updated and accurate
- [ ] Images optimized and in place
- [ ] Self-referential links (like navigation) point to correct sections
- [ ] Mobile responsiveness tested
- [ ] No console errors
- [ ] All browser compatibility tested
- [ ] SEO meta tags updated
- [ ] Brand name and contact info updated

## Deployment Options

### 1. Netlify (Recommended - Easiest)

#### Setup
1. Create account at [netlify.com](https://netlify.com)
2. Push code to GitHub
3. Connect GitHub to Netlify

#### Step-by-Step
1. **Go to Netlify Dashboard** → New site from Git
2. **Select Repository** → Choose your repo
3. **Configure Build Settings**
   - Build command: `echo "No build needed"`
   - Publish directory: `.`
4. **Deploy** → Click "Deploy Site"
5. **Custom Domain** (Optional)
   - Go to Site settings
   - Add custom domain
   - Update DNS records

#### Environment Variables (if needed)
- Site settings → Build & deploy → Environment
- Add any secrets needed

#### Continuous Deployment
- Automatic deployments on push to main/master
- Preview deployments for pull requests
- Rollback to previous version anytime

---

### 2. Vercel

#### Setup
1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository

#### Step-by-Step
1. **New Project** → Import Git Repository
2. **Configure Project**
   - Framework: Static Site
   - Root directory: ./
   - Build command: (leave empty)
   - Output directory: (leave empty)
3. **Environment Variables** → Add if needed
4. **Deploy**
5. **Custom Domain**
   - Project settings → Domains
   - Add custom domain

---

### 3. GitHub Pages (Free)

#### Setup
1. Ensure repository is on GitHub
2. Enable GitHub Pages in settings

#### Step-by-Step
1. **Repository** → Settings → Pages
2. **Source** → Deploy from branch
3. **Branch** → Select main or master
4. **Folder** → Select root (/)
5. **Save**
6. Site URL will appear after a minute

#### Custom Domain
1. Settings → Pages → Custom domain
2. Enter your domain
3. Add DNS records:
   ```
   A: 185.199.108.153
   A: 185.199.109.153
   A: 185.199.110.153
   A: 185.199.111.153
   ```

---

### 4. Firebase Hosting

#### Prerequisites
- Install Firebase CLI: `npm install -g firebase-tools`
- Google account

#### Step-by-Step
```bash
# Login
firebase login

# Initialize Firebase
firebase init

# Select "Hosting"
# Public directory: . (current folder)
# Single-page app: No
# Build script: (leave empty)

# Deploy
firebase deploy
```

---

### 5. AWS S3 + CloudFront

#### Prerequisites
- AWS account
- AWS CLI installed

#### Steps
1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://curated-gifting-luxury
   ```

2. **Upload Files**
   ```bash
   aws s3 sync . s3://curated-gifting-luxury/
   ```

3. **Enable Static Website Hosting**
   - S3 → Bucket → Properties
   - Enable static website hosting
   - Index document: index.html
   - Error document: index.html

4. **CloudFront Distribution** (Optional, for CDN)
   - CloudFront → Distributions
   - Create distribution
   - Set origin to S3 bucket

---

### 6. Traditional Web Hosting (cPanel, etc.)

#### Prerequisites
- Web hosting with FTP/SSH access
- Domain pointing to hosting provider

#### Steps
1. **Via FTP**
   - Download FileZilla or similar
   - Connect with FTP credentials
   - Upload all files to public_html

2. **Via SSH**
   ```bash
   scp -r ./curated-gifting-luxury* user@server:/public_html/
   ```

3. **SSL Certificate**
   - cPanel → AutoSSL or Let's Encrypt
   - Enable auto-renewal

---

## Post-Deployment

### Verification
- [ ] Load homepage in browser
- [ ] Test navigation links
- [ ] Click WhatsApp button
- [ ] Test on mobile
- [ ] Check page speed (Google PageSpeed Insights)
- [ ] Verify SSL certificate working
- [ ] Check indexing (Google Search Console)

### Analytics Setup
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Setup
1. Create `sitemap.xml`
2. Create `robots.txt`
3. Submit to Google Search Console
4. Submit to Bing Webmaster Tools

### Performance Optimization
- CDN for faster global delivery
- Image optimization
- Cache busting for updates
- Minification (optional)

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor uptime (Uptime Robot)
- Track performance (Google Analytics)
- Monitor traffic and user behavior

---

## Update Process

### Making Changes After Deployment
1. Update local files
2. Test locally
3. Commit and push to git
4. Auto-deployment happens (Netlify/Vercel/etc.)
5. Or manually redeploy

### Rollback Procedure
#### Netlify
- Deployments tab → Select previous version
- Click "Restore"

#### Vercel
- Deployments tab → Select previous → Promote

#### GitHub Pages
- Revert commit: `git revert <commit-hash>`

---

## Domain Setup

### DNS Configuration
Example for Netlify:
```
Type: A
Name: @
Value: (Netlify's IP)

Type: CNAME
Name: www
Value: (Netlify's CNAME)
```

### Redirect www to non-www (or vice versa)
#### Netlify
- Site settings → Domain management
- Add domain redirect rules

#### .htaccess (Traditional Hosting)
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)
RewriteRule ^(.*)$ http://%1$1 [R=301,L]
```

---

## Security

### HTTPS
- All hosting options above provide free SSL
- Enable auto-renewal
- Test at [SSL Labs](https://www.ssllabs.com/ssltest/)

### Headers
```
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### Rate Limiting
- Enable on hosting provider to prevent abuse
- WhatsApp integration has built-in limits

---

## Performance Benchmarks

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint | < 1.8s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Page Load Time | < 3s | ✅ |

**Tools to Check Performance:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

---

## Troubleshooting

### Site Not Loading
- Check DNS propagation (dns-checker.com)
- Verify CNAME/A records
- Check hosting provider status page

### Slow Loading
- Optimize images
- Enable caching
- Use CDN
- Check server location

### White Screen
- Check browser console for errors
- Verify index.html is in root
- Check file permissions (644 for files, 755 for folders)

### WhatsApp Links Not Working
- Verify WhatsApp number format (no + or spaces)
- Test link manually
- Check URL encoding

---

## Scaling Considerations

As your business grows:
1. Add backend for online payments
2. Implement database for orders
3. Add user authentication
4. Create admin dashboard
5. Set up email notifications
6. Implement inventory system

---

## Support & Help

- Hosting provider support docs
- GitHub Issues for bugs
- Community forums
- Consult a developer for custom features

---

**Deployment Completed! 🎁**
Visit your live site and celebrate! 🎉
