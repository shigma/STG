module.exports = {
  title: 'web-stg',
  description: '一个基于浏览器的弹幕引擎',
  dest: '../../docs/',
  plugins: {
    '@vuepress/register-components': {
      componentsDir: `${__dirname}/theme/global/`
    },
    '@vuepress/google-analytics': {},
    '@vuepress/back-to-top': {},
    '@vuepress/medium-zoom': {},
    '@vutex/component-container': {
      alias: { STG: 'stg-demo' },
      useText: ['STG'],
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/API/' },
      { text: 'GitHub', link: 'https://github.com/Shigma/STG' },
    ]
  },
}
