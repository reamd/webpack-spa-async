/**
 * Created by reamd on 2017/10/12.
 */
let path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    WebpackMonitor = require('webpack-monitor');

let development = process.env.NODE_ENV === 'development';
let production = process.env.NODE_ENV === 'production';
console.log('当前打包环境：\n *************author: reamd**************** \n development:', development, '\n production:', production, '\n ***************************************** \n');

let devtool = production? '#cheap-module-source-map' : '#source-map';

let entry = production
    ? [path.resolve(__dirname, './src/main.js')]
    : [
        path.resolve(__dirname, './src/main.js'),
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://localhost:8080"
      ];

let htmlWebpackPlugin = production
    ? new HtmlWebpackPlugin({
        title: 'spa test',
        filename: 'index.html',
        template: 'html-withimg-loader!' + path.resolve(__dirname, 'index.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
    })
    : new HtmlWebpackPlugin({
        title: 'spa test',
        filename: 'index.html',
        template: 'index.html'
    });
let plugins = production
    ? [
        new OptimizeCSSPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new WebpackMonitor({
            capture: true, // -> default 'true'
            // target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
            launch: true // -> default 'false'
            // port: 3030, // default -> 8081
        })
      ]
    : [new webpack.HotModuleReplacementPlugin()];
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: development,
        PRODUCTION: production
    }),
    htmlWebpackPlugin,
    new ExtractTextPlugin({
        filename:  'main.[contenthash:6].css'
    })
);

module.exports = {
    devServer: {
        // inline: true,
        port: 8080
    },
    devtool : devtool,
    entry: entry,
    /*externals: {
        jquery: 'jQuery' //可以用模块方式引入但不会打包到bundle.js中
    },*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.[hash:6].js',
        // publicPath: '/script/', // 设置require.ensure路径
        chunkFilename: 'scripts/[name].min.[hash:6].js' // 设置require.ensure 文件名
    },
    module: {
        rules: [
            {
                test: /\.(htm|html)$/i,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'html-withimg-loader'
            },
            /*{
                test: /\.css$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                })
            },*/
            {
                test: /\.(sass|scss)$/,
                exclude: path.join(__dirname, 'node_modules'),
                include: path.join(__dirname, './src'),
                use: ExtractTextPlugin.extract({
                    use: [
                            {
                                loader: 'css-loader',
                                options: { importLoaders: 1 }
                            },
                            'postcss-loader',
                            {
                                loader: 'sass-loader'
                            }
                        ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, './src/js')],
                loader: 'babel-loader'
            },
            {
                test: /poster.jpg$/,
                exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src')],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                exclude: [path.join(__dirname, 'node_modules')],
                include: path.join(__dirname, './src/assets/staticImg'),
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/staticImg/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                exclude: [path.join(__dirname, 'node_modules')],
                include: path.join(__dirname, './src/assets/img'),
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'font/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: plugins
};