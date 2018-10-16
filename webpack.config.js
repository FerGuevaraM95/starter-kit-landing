const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        js: './src/js/index.js',
    },
    output: {
        filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.pug$/,
                use: ['html-loader?minimize', 'pug-html-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader?minimize&sourceMap',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ['last 3 versions']
                            },
                            sourceMap: true,
                            plugins: () => [ autoprefixer ]
                        }
                    },
                    'resolve-url-loader',
                    'sass-loader?outputStyle=compressed&sourceMap'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    'file-loader?name=assets/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/**/*.*']),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html',
            chunks: ['js']
        })
    ]
}