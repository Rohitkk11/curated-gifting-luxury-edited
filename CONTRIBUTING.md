# Contributing to Curated Gifting

Thank you for your interest in contributing! We welcome improvements and suggestions.

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title describing the bug
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features
1. Check existing issues/discussions
2. Create an issue with:
   - Clear title
   - Detailed description of the feature
   - Why it would be useful
   - Possible implementation approaches

### Code Changes
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the coding style
4. Test thoroughly in different browsers
5. Commit with clear messages: `git commit -m "Add: brief description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request with:
   - Clear title
   - Description of changes
   - Related issue numbers
   - Testing details

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Proper indentation (2 spaces)
- Descriptive class names using kebab-case
- Include alt text for images

### CSS
- Follow BEM naming convention where applicable
- Use CSS variables for colors/sizes
- Mobile-first responsive approach
- Valid CSS (validate at w3.org)

### JavaScript
- Use clear variable names
- Add comments for complex logic
- Follow DRY principle
- Test in modern browsers

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/curated-gifting-luxury.git
   cd curated-gifting-luxury
   ```

2. **No installation needed** - it's a static site!
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

3. **Open in browser**: http://localhost:8000

## Testing Checklist

- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive (tested at 540px, 800px, 1200px)
- [ ] All links work correctly
- [ ] WhatsApp links functional
- [ ] No console errors
- [ ] Images load properly
- [ ] Form validation works
- [ ] Accessibility compliance (WCAG 2.1)

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- **Add**: New feature or functionality
- **Fix**: Bug fix
- **Docs**: Documentation changes
- **Style**: Code style changes (formatting, etc.)
- **Refactor**: Code refactoring without feature changes
- **Test**: Adding or updating tests
- **Chore**: Build process, dependencies, etc.

Example:
```
Add: WhatsApp number configuration section to README

Updated documentation to include clear instructions for setting up WhatsApp integration. Added example in international format.

Closes #15
```

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Respect differing opinions
- No harassment or discriminatory language
- Focus on the code, not the person

## Questions?

Feel free to open an issue for any questions or discussions!

Thank you for contributing! 🎁
