import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

import typedocSidebar from '../reference/typedoc-sidebar.json';

const sidebar = generateSidebar([
  {
    collapsed: true,
    documentRootPath: '.',
    frontmatterOrderDefaultValue: 999,
    resolvePath: '/guide/',
    scanStartPath: 'guide',
    sortMenusByFrontmatterOrder: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true,
  },
]) as Record<string, { items: { text: string }[] }>;

const guideItems = sidebar['/guide/'].items;
const gettingStarted = ['Guide', 'Introduction', 'Installation'];
const generators = ['Apiwork (Rails)'];
sidebar['/guide/'].items = [
  {
    items: guideItems.filter((i) => gettingStarted.includes(i.text)),
    text: 'Getting Started',
  },
  {
    items: guideItems.filter(
      (i) => !gettingStarted.includes(i.text) && !generators.includes(i.text),
    ),
    text: 'Core',
  },
  {
    items: guideItems.filter((i) => generators.includes(i.text)),
    text: 'Generators',
  },
];

sidebar['/reference/'] = [{ items: typedocSidebar, text: 'Sorbus' }];

export default defineConfig({
  cleanUrls: true,
  description: 'Typed API client from contract definitions',
  head: [
    [
      'link',
      {
        href: '/logo-light.svg',
        media: '(prefers-color-scheme: light)',
        rel: 'icon',
        type: 'image/svg+xml',
      },
    ],
    [
      'link',
      {
        href: '/logo-dark.svg',
        media: '(prefers-color-scheme: dark)',
        rel: 'icon',
        type: 'image/svg+xml',
      },
    ],
    ['meta', { content: 'website', property: 'og:type' }],
    ['meta', { content: 'Sorbus', property: 'og:title' }],
    [
      'meta',
      {
        content: 'Typed API client from contract definitions',
        property: 'og:description',
      },
    ],
  ],
  lastUpdated: true,
  markdown: {
    headers: {
      level: [2, 3],
    },
    lineNumbers: false,
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/skiftle/sorbus/edit/main/docs/:path',
    },
    externalLinkIcon: true,
    footer: {
      copyright: 'Copyright 2026-present Skiftle',
      message: 'Released under the MIT License.',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    logo: {
      dark: '/logo-dark.svg',
      light: '/logo-light.svg',
    },
    nav: [
      { activeMatch: '/guide/', link: '/guide/', text: 'Guide' },
      { activeMatch: '/reference/', link: '/reference/', text: 'Reference' },
    ],
    outline: [2, 3],
    search: {
      provider: 'local',
    },
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/skiftle/sorbus' },
    ],
  },
  title: 'Sorbus',
});
