const { description } = require('../../package')

module.exports = {
	base: '/sz-docs/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '生椰拿铁',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: 'https://static.uino.cn/uino_favicon_32.ico' }]
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '什么是Deno',
          children: [
            // '编译原理 - 抽象语法树（Abstract Syntax Tree，AST）',
            '什么是Deno',
          ]
        }
      ],
    }
    // [
    //   {
    //     title: '介绍',   
    //     path: '介绍',
    //     // Introduction
    //     children: [
    //       '/从koa到oak',
    //       'WebSocket数据加密'
    //     ]
    //   },
    //   {
    //     title: '操作系统——前言',   
    //     path: '操作系统——前言',
    //     children: [
    //       '/从koa到oak',
    //       'WebSocket数据加密'
    //     ]
    //   }
    // ]

    // {
    //   '/guide/': [
    //     {
    //       title: 'Guide',
    //       collapsable: false,
    //       children: [
    //         '编译原理 - 抽象语法树（Abstract Syntax Tree，AST）',
    //         '什么是Deno',
    //       ]
    //     }
    //   ],
    // }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
