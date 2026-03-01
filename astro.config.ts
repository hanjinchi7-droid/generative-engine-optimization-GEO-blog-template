import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read config.yaml to get site URL and base path
const configYaml = fs.readFileSync(path.resolve(__dirname, './src/config.yaml'), 'utf8');

// Extract site URL from config.yaml (e.g., "https://example.com")
const domainMatch = configYaml.match(/^\s+site:\s*['"]?(https?:\/\/[^'"\s\n\r]+)['"]?/m);

// Extract base path from config.yaml (e.g., "/blog" or "/repo-name")
// IMPORTANT: This is critical for GitHub Pages subdirectory deployments!
const baseMatch = configYaml.match(/^\s+base:\s*['"]?([^'"\s\n\r]+)['"]?/m);

const SITE_URL = domainMatch ? domainMatch[1].trim() : 'https://example.com';
const BASE_PATH = baseMatch ? baseMatch[1].trim() : '/';

// 📝 Base Path Configuration Note:
// The 'base' value determines where your site is deployed:
// - '/' = Root domain or custom domain
// - '/your-repo-name' = GitHub Pages subdirectory (e.g., username.github.io/your-repo-name)
//
// For GitHub Pages users: Make sure 'base' in src/config.yaml matches your repository name!

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({

  site: SITE_URL,
  base: BASE_PATH,

  build: {
    assets: 'assets',
  },

  output: 'static',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database'],
      },
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
    compress({
      CSS: true,
      HTML: { 'html-minifier-terser': { removeAttributeQuotes: false } },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({ config: './src/config.yaml' }),
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: { '~': path.resolve(__dirname, './src') },
    },
  },
});