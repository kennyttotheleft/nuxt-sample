const webpack = require('webpack')

module.exports = {
  head: {
    title: 'sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [ '~/plugins/firebase.js' ],
  loading: { color: '#3B8070' },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        /*
        ** Run ESLint on save
        */
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      /**
       * Add environment variables
       * @link https://webpack.js.org/plugins/environment-plugin/
       */
      config.plugins.push(
        new webpack.EnvironmentPlugin([
          'FIREBASE_API_KEY',
          'FIREBASE_AUTH_DOMAIN',
          'FIREBASE_DATABASE_URL',
          'FIREBASE_PROJECT_ID',
          'FIREBASE_STORAGE_BUCKET',
          'FIREBASE_MESSAGING_SENDER_ID'
        ])
      )
    }
  },
  router: {
    middleware: 'auth'
  }
}
