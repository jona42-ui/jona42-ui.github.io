// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jona42-ui.github.io',
  // Map resume.astro -> resume.html and blog/index.astro -> blog/index.html so existing links keep working.
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
