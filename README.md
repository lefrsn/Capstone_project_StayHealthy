# Landing Page Website

A basic, responsive landing page built with HTML, CSS, and JavaScript.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Available Scripts

- **`npm start`** - Start development server on port 8080 and open in browser
- **`npm run dev`** - Run development server without opening browser
- **`npm run build`** - Clean and prepare production build
- **`npm run clean`** - Remove build artifacts
- **`npm run serve`** - Serve the dist directory
- **`npm run format`** - Format code with Prettier

## Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # Global styles
├── script.js           # JavaScript functionality
├── package.json        # NPM configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Features

- ✅ Responsive navigation bar
- ✅ Hero/masthead section
- ✅ Features showcase
- ✅ About section
- ✅ Contact form
- ✅ Footer with social links
- ✅ Mobile-friendly design
- ✅ Smooth scrolling navigation

## Development

To start developing:

```bash
npm install
npm run dev
```

The development server will start on `http://localhost:8080`. Changes to HTML, CSS, and JS files will require a browser refresh.

## Building for Production

```bash
npm run build
```

This will clean and prepare your files in the `dist` directory.

## Customization

### Colors
Edit the color variables in `styles.css`:
- Primary color: `#007bff` (blue)
- Background: `#f8f9fa` (light gray)

### Content
- Edit `index.html` to change page content
- Update navigation links in the navbar section
- Customize feature items in the features section

### Styling
All styles are in `styles.css`. The file includes:
- Global styles and typography
- Navigation bar styles
- Responsive grid layout
- Media queries for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
