const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const obfuscate = env && env.obfuscate;

  const config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'static/js/[name].[contenthash:8].js' : 'bundle.js',
      chunkFilename: isProd ? 'static/js/[name].[contenthash:8].chunk.js' : '[name].chunk.js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProd ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/robots.txt', to: 'robots.txt', noErrorOnMissing: true },
          { from: 'public/sitemap.xml', to: 'sitemap.xml', noErrorOnMissing: true },
          { from: 'public/images', to: 'images', noErrorOnMissing: true },
          { from: 'public/video', to: 'video', noErrorOnMissing: true },
        ],
      }),
    ],
    devServer: {
      port: process.env.PORT || 3000,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'no-referrer',
      },
    },
    // NO SOURCE MAPS IN PRODUCTION
    devtool: isProd ? false : 'eval-source-map',
  };

  if (isProd) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
      })
    );

    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false, // we use debugger as a trap
              passes: 3,
              dead_code: true,
            },
            mangle: {
              toplevel: true,
              properties: false,
            },
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };

    // Obfuscation layer (use with: npm run build:obfuscate)
    if (obfuscate) {
      const WebpackObfuscator = require('webpack-obfuscator');
      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          selfDefending: true,
          disableConsoleOutput: true,
          debugProtection: true,
          debugProtectionInterval: 2000,
          domainLock: [],
          identifierNamesGenerator: 'hexadecimal',
          renameGlobals: false,
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.2,
        }, ['vendors.*.js'])
      );
    }
  }

  return config;
};
