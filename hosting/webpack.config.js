const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.js$/,
        resolve: { extensions: ['.js'] },
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src/'),
      public: path.resolve(__dirname, 'public/'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './public/index.html' }),
    new VueLoaderPlugin(),
    new Dotenv(),
    new WorkboxPlugin.GenerateSW(),
    new CopyPlugin([
      { context: path.join(__dirname, 'public'), from: '**.*' },
      {
        context: path.join(__dirname, 'public', 'favicon'),
        from: '**.*',
      },
    ]),
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
