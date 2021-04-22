const path =  require('path')
const TerserPlugin = require('terser-webpack-plugin')

function generateConfig({minify}){
  return {
    mode: minify ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: `ruby-date${minify ? '.min' : ''}.js`,
      library: 'RubyDate',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts'],
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        })
      ],
    },
  }
}

module.exports = generateConfig({minify: true})
