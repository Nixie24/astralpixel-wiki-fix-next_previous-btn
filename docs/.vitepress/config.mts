import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import taskLists from 'markdown-it-task-lists'
import timeline from 'vitepress-markdown-timeline'
import attribution, { Options } from 'markdown-it-attribution'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AstralPixel',
  description: 'AstralPixel Wiki',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.cn' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.cn', crossorigin: 'anonymous' }],
    ['link', { href: 'https://fonts.googleapis.cn/css2?family=Fira+Code:wght@300..700&family=Noto+Sans+SC:wght@100..900&display=swap', rel: 'stylesheet' }],
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/guide/home' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '主页', link: '/guide/home' },
          { text: '关于本服', link: '/guide/about' },
          { text: '玩家守则', link: '/guide/rule' },
          { text: '常见问题', link: '/guide/faq' },
          {
            text: '常用指令', collapsed: false,
            items: [
              { text: '传送类', link: '/guide/command/teleport' },
              { text: '查询类', link: '/guide/command/search' },
              { text: '动作类', link: '/guide/command/action' },
              { text: '经济类', link: '/guide/command/economy' },
              { text: '箱子商店', link: '/guide/command/chest_shop' },
              { text: '全球商店', link: '/guide/command/global_shop' },
              { text: '签到', link: '/guide/command/signin' },
              { text: '其他', link: '/guide/command/other' },
            ],
          },
          {
            text: '更多附魔', collapsed: false,
            items: [
              { text: '附魔效果', link: '/guide/enchantment/effects' },
              { text: '获取途径', link: '/guide/enchantment/get' },
              { text: '常见问题', link: '/guide/enchantment/faq' },
            ],
          },
        ],
      },
    ],

    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AstralPixel-dev/astralpixel-wiki.git' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
  },

  vite: {
    plugins: [
      GitChangelog({
        maxGitLogCount: 2000,
        repoURL: () => 'https://github.com/AstralPixel-dev/astralpixel-wiki.git',
      }),
      GitChangelogMarkdownSection({
        exclude: id => id.endsWith('index.md'),
        sections: {
          disableChangelog: false,
          disableContributors: true,
        },
      }),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [
          'index.md',
        ],
      }),
    ],

    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        '@nolebase/vitepress-plugin-highlight-targeted-heading/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },

    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/ui',
      ],
    },

    resolve: {
      alias: [],
    },

  },

  markdown: {
    math: true,
    config: (md) => {
      md.use(timeline)
        .use(taskLists)
        .use(InlineLinkPreviewElementTransform)
        .use<Options>(attribution, {
          marker: '---',
          classNameContainer: 'VPBlockquote',
          classNameAttribution: 'VPAttribution',
        })
    },
  },

  sitemap: {
    hostname: 'https://wiki.astralpixel.cn',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    },
  },

  lang: 'zh',
})
