# Personal Portfolio Website

A clean, minimal portfolio website showcasing my work as a Software Engineer. Visit at [jona42-ui.github.io](https://jona42-ui.github.io).

## Features

- Simple, clean design inspired by modern minimalism
- Three main pages: Home, Resume, Portfolio
- Fully responsive mobile-first design
- Fast loading with minimal dependencies
- No JavaScript frameworks - pure HTML/CSS/JS

## Project Structure

```
.
├── index.html          # Home page
├── resume.html         # CV and experience
├── portfolio.html      # Projects showcase
├── styles/
│   └── simple.css      # Main stylesheet
├── assets/
│   └── images/         # Images and PDFs
└── _data/              # YAML data files (for Jekyll)
```

## Local Development

### Option 1: Simple HTTP Server (No Jekyll needed)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Option 2: With Jekyll

1. Install Ruby and Jekyll:
```bash
sudo apt-get install ruby-full build-essential
gem install jekyll bundler
```

2. Clone and run:
```bash
git clone https://github.com/jona42-ui/jona42-ui.github.io.git
cd jona42-ui.github.io
bundle install
bundle exec jekyll serve
```

3. Visit `http://localhost:4000`

## Customization

- Edit HTML files directly for content changes
- Modify `styles/simple.css` for styling
- Update `_data/*.yml` files for structured data
- Replace images in `assets/images/`

## Pages

- **Home** - Introduction with links to resume and portfolio
- **Resume** - Education, experience, skills, and certifications
- **Portfolio** - Featured projects and work

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Thembo Jonathan
- Email: jonathanthembo123@gmail.com
- LinkedIn: [thembo-jonathan](https://www.linkedin.com/in/thembo-jonathan/)
- GitHub: [jona42-ui](https://github.com/jona42-ui)
