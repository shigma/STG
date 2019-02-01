const { resolve } = require('path')

module.exports = {
  title: 'web-stg',
  base: '/STG/',
  evergreen: true,
  description: '一个基于 JavaScript 的弹幕引擎',
  dest: '../../docs/',
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/medium-zoom': {},
    '@vuepress/register-components': {
      componentsDir: `${__dirname}/theme/global/`
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/API/' },
      { text: 'GitHub', link: 'https://github.com/Shigma/STG' },
    ],
    sidebar: {
      '/guide/': [
        '',
        'FAQ',
        'CHANGELOG'
      ],
      '/API/': [
        '',
        'updater-and-looping',
        'point-and-coordinate',
        'bullet-and-barrage',
        'player-and-scene',
        'utils'
      ]
    },
  },
}
