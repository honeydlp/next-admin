const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line
const withCss = require('@zeit/next-css')

const { ANALYZE } = process.env
const pro = process.env.NODE_ENV === 'production'
const test = process.env.NODE_TEST === 'test'

// 开发模式下的页面缓存
// SSR页面缓存配置 https://github.com/zeit/next.js/blob/canary/examples/ssr-caching/server.js

const onDemandEntries = {
  // period (in ms) where the server will keep pages in the buffer
  maxInactiveAge: 25 * 1000,
  // number of pages that should be kept simultaneously without being disposed
  pagesBufferLength: 2,
}

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss({
  // useFileSystemPublicRoutes: false,
  assetPrefix:'',
  ...(!pro && !test && { onDemandEntries }),
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 7777,
        openAnalyzer: true,
      }))
    }
    return config
  },
})
