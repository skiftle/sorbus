import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import typedocSidebar from "../reference/typedoc-sidebar.json";

const sidebar = generateSidebar([
  {
    documentRootPath: ".",
    scanStartPath: "guide",
    resolvePath: "/guide/",
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    frontmatterOrderDefaultValue: 999,
    collapsed: true,
  },
]);

const guideItems = sidebar["/guide/"].items;
const gettingStarted = ["Guide", "Introduction", "Installation"];
const generators = ["Apiwork (Rails)"];
sidebar["/guide/"].items = [
  {
    text: "Getting Started",
    items: guideItems.filter((i) => gettingStarted.includes(i.text)),
  },
  {
    text: "Core",
    items: guideItems.filter(
      (i) => !gettingStarted.includes(i.text) && !generators.includes(i.text),
    ),
  },
  {
    text: "Generators",
    items: guideItems.filter((i) => generators.includes(i.text)),
  },
];

sidebar["/reference/"] = [{ text: "Sorbus", items: typedocSidebar }];

export default defineConfig({
  title: "Sorbus",
  description: "Typed API client from contract definitions",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Sorbus" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Typed API client from contract definitions",
      },
    ],
  ],
  markdown: {
    lineNumbers: false,
    headers: {
      level: [2, 3],
    },
  },
  themeConfig: {
    outline: [2, 3],
    externalLinkIcon: true,
    nav: [
      { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
      { text: "Reference", link: "/reference/", activeMatch: "/reference/" },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/skiftle/sorbus" },
    ],
    editLink: {
      pattern: "https://github.com/skiftle/sorbus/edit/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright 2026-present Skiftle",
    },
    lastUpdated: {
      text: "Last updated",
    },
    sidebar,
  },
});
