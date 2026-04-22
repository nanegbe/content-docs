import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Agri-Content API',
  tagline: 'Market prices, weather updates & agronomic advice for farmers — delivered via API',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.agri-content.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  organizationName: 'agri-content',
  projectName: 'content-docs',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Agri-Content',
      logo: {
        alt: 'Agri-Content Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/market-price/overview',
          label: 'Market Prices',
          position: 'left',
        },
        {
          to: '/docs/weather/overview',
          label: 'Weather',
          position: 'left',
        },
        {
          to: '/docs/agronomics/overview',
          label: 'Agronomics',
          position: 'left',
        },
        {
          href: 'https://github.com/agri-content',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            {
              label: 'Introduction',
              to: '/docs/getting-started/introduction',
            },
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'Authentication',
              to: '/docs/getting-started/authentication',
            },
          ],
        },
        {
          title: 'Core APIs',
          items: [
            {
              label: 'Market Prices',
              to: '/docs/market-price/overview',
            },
            {
              label: 'Weather',
              to: '/docs/weather/overview',
            },
            {
              label: 'Agronomics',
              to: '/docs/agronomics/overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Plans & Payments',
              to: '/docs/api/plans',
            },
            {
              label: 'Webhooks',
              to: '/docs/api/webhooks',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/agri-content',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Agri-Content. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
