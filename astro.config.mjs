import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, squooshImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import astrowind from './vendor/integration';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter.mjs';
//import decapCmsOauth from "astro-decap-cms-oauth";
//import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';

// Katex Import
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkBibliography } from './remarkBibliography.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hasExternalScripts = false;
const whenExternalScripts = (items = []) => hasExternalScripts ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];


// https://astro.build/config
export default defineConfig({
  output: 'static',
  //adapter: vercel(),
  integrations: [react(),
    tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
    }
  }), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false
      }
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1
  }), astrowind({
    config: './src/config.yaml'
  }),
  /*decapCmsOauth({
    adminDisabled: false,
    adminRoute: "/admin",
    oauthDisabled: false,
    oauthLoginRoute: "/oauth",
    oauthCallbackRoute: "/oauth/callback",
  })*/
],
  image: {
    service: squooshImageService(),
    domains: ['cdn.pixabay.com']
  },
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin]
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkBibliography],
    rehypePlugins: [rehypeKatex],
  },
});