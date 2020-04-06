const webpack = require('webpack')
const path = require('path')
const { seller, goods, ratings } = require('./data')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme'],
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    before(app) {
      app.get('/api/seller', (req, res) => {
        const id = req.query.id
        res.json({
          appCode: 1,
          data: Object.assign({}, seller, { id }),
        })
      })
      app.get('/api/goods', (req, res) => {
        res.json({
          appCode: 1,
          data: goods,
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          appCode: 1,
          data: ratings,
        })
      })
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config.plugin('context').use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
  },
}
