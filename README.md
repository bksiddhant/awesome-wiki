# 🌟 Awesome Wiki

A premium, high-performance, and visually stunning wiki interface for browsing curated "Awesome Lists." Built for the FOSS community, this project transforms standard Markdown-based lists into an interactive, modern web experience.

![Awesome Wiki Preview](https://via.placeholder.com/1200x600?text=Awesome+Wiki+Interface) <!-- Placeholder for actual preview if available -->

## ✨ Features

- **🚀 Instant Loading**: Lightweight vanilla JavaScript architecture for lightning-fast performance.
- **🎨 Premium Design**: Modern typography using **Manrope** and **Oxanium**, featuring a sleek dark-themed, glassmorphism-inspired UI.
- **✨ Interactive Visuals**: Custom mouse-following sparkle effects and smooth micro-animations.
- **📦 Portable Mode**: Includes a fully self-contained `index.html` (inside `inline-html/`) with all assets inlined—perfect for offline browsing or single-file sharing.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop monitors.
- **📝 Markdown Driven**: Dynamic parsing of Markdown content for easy updates.

## 📁 Project Structure

```text
awesome-wiki/
├── css/
│   └── styles.css      # Core design system and layout
├── js/
│   ├── app.js          # Main application logic and state management
│   ├── parser.js       # Custom Markdown-to-HTML engine
│   └── visuals.js      # Sparkle effects and UI interactions
├── inline-html/
│   └── index.html      # Portable, self-contained version
└── index.html          # Standard production entry point
```

## 🛠️ Getting Started

### Prerequisites

To run the project locally, you only need Python installed (to avoid CORS issues when fetching localized files).

### Running a Local Server

1. Open your terminal in the project directory.
2. Run the following command to start a local development server:

   ```
   bash
   python -m http.server 8080
   ```

3. Open your browser and navigate to:
   `http://localhost:8080`

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the design, parser, or add new features:
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

## 📜 Credits

- Curated content sourced from [Sindre Sorhus's Awesome List](https://github.com/sindresorhus/awesome).
- Built with ❤️ for the open-source community.

---
