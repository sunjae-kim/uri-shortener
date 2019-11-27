const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(js)$/,
        resolve: { extensions: ['.js'] },
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Tisha.me',
      template: './public/index.html',
      favicon: './public/memo.png',
    }),
    new VueLoaderPlugin(),
    new Dotenv(),
    new ManifestPlugin({
      seed: {
        short_name: 'Tisha.me',
        name: 'Tisha.me! Url Shortener',
        icons: [
          {
            src: 'memo.png',
            sizes: '144x144',
            type: 'image/x-icon',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#FAFAFA',
        background_color: '#FAFAFA',
        orientation: 'portrait',
      },
    }),
  ],
  // To use Joi cliend side: https://tisha.me/joi-issue
  node: { net: 'empty' },
};
