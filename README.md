# Personal Portfolio Website

My professional portfolio website built with Jekyll and modern web technologies. Visit at [jona42-ui.github.io](https://jona42-ui.github.io).

## Features

- Responsive design using Bootstrap 4
- Modern SCSS architecture
- Data-driven content using Jekyll
- Optimized for performance
- SEO-friendly meta tags
- Professional timeline layout
- Project showcase
- Course certifications

## Project Structure

```
.
├── _data/               # YAML data files
│   ├── education.yml    # Education and courses data
│   └── projects.yml     # Projects information
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── assets/             # Static files
│   ├── css/            # Compiled CSS
│   ├── images/         # Image assets
│   ├── js/             # JavaScript files
│   └── scss/           # SCSS source files
└── pages/              # Content pages
```

## Local Development

1. Install Ruby and Jekyll:
```bash
sudo apt-get install ruby-full build-essential
gem install jekyll bundler
```

2. Clone the repository:
```bash
git clone https://github.com/jona42-ui/jona42-ui.github.io.git
cd jona42-ui.github.io
```

## Configuration

### NewsAPI Setup

This site uses NewsAPI to display the latest tech news. To configure the API:

1. Get your API key from [NewsAPI](https://newsapi.org)
2. Add your API key to `_config.yml`:
   ```yaml
   news_api_key: "your_api_key_here"
   ```

⚠️ **Important Security Notes:**
- The free tier of NewsAPI only works on localhost and has a limit of 100 requests per day
- For production, you'll need a paid API key that supports CORS and higher rate limits
- Consider using environment variables or a backend proxy in production to protect your API key

3. Install dependencies:
```bash
bundle install
```

4. Run the development server:
```bash
bundle exec jekyll serve
```

5. Visit `http://localhost:4000`

## Customization

- Update `_config.yml` for site settings
- Modify data files in `_data/` for content
- Edit SCSS variables in `assets/scss/_variables.scss`
- Add new pages in `pages/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Thembo Jonathan - [LinkedIn](https://www.linkedin.com/in/thembo-jonathan-7478701ab/)