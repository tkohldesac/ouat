const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js', 
    path: path.resolve(__dirname, 'dist'), 
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/',
                },
            },
        ],
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }, 
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /main\.js$/, to: '/main.js' },
      ],
    },
    compress: false,
    port: 9000,

  },
  plugins: [ new DefinePlugin({
    "process.env.NODE_ENV" : JSON.stringify(process.env.NODE_ENV)
  })]
};