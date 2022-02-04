const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname) + '/index.ts',
  devServer: {
    port: 9000,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname,'tsconfig.demo.json')
          }
        }],
        exclude: [/node_modules/]
      },
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
