const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'js', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].bundle.js',
        // publicPath: 'dist/'
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 5000,
        clientLogLevel: 'silent',
        compress: true,
        // https: true,
    },
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
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
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/styles.[chunkhash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/index.pug',
            filename: 'index.html',
            chunks: ['index'],
            favicon: './src/assets/icons/favicon.ico'
        })
    ]
}
