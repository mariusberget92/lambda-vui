import { defineUserConfig } from 'vuepress'
import getConfig from 'vuepress-bar'

const { nav, sidebar } = getConfig('docs/.vuepress');

export default defineUserConfig({
  lang: 'en-US',
  title: 'Lambda VUI',
  description: 'Components library for Vue3. Supposed to be used with Laravel + Inertia.js + Vue3.',
  themeConfig: {
    nav, sidebar,
    sidebar: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
        children: [
          '/getting-started/installation.md',
          '/getting-started/usage.md',
        ]
      },
    ]
  },
})