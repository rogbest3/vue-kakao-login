const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/lib/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      }
    ]
  },
  externals: {
    moment: 'moment'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'vue-kakao-login.min.js',
      libraryTarget: 'window',
      library: 'vueKaokaoLogin',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/KakaoLogin.vue'),
    output: {
      filename: 'vue-kakao-login.js',
      libraryTarget: 'umd',
      library: 'vue-kakao-login',
      umdNamedDefine: true
    }
  })
];
