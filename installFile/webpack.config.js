'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const strSrc = 'src';
const strTrg = 'dist';

let config = {};

module.exports = (env, argv) => {

    let devMode = 0;

    if (argv.mode === 'development') {
        devMode = 1;
    } else {
        if (argv.mode === 'production') {
            devMode = 2;
        }
    };

    let filesProd = [{
            from: strSrc + '/fonts/**/**',
            to: path.resolve(__dirname, strTrg + "/fonts")
        },
        {
            from: strSrc + '/README.md',
            to: path.resolve(__dirname, strTrg)
        },
        {
            from: strSrc + '/CHANGELOG',
            to: path.resolve(__dirname, strTrg)
        },
        {
            from: strSrc + '/LICENSE',
            to: path.resolve(__dirname, strTrg)
        },
        {
            from: strSrc + '/favicon.ico',
            to: path.resolve(__dirname, strTrg)
        },
    ];

    let filesDev = [{
            from: strSrc + '/fonts/**/**',
            to: path.resolve(__dirname, strTrg + "/fonts")
        },
        {
            from: strSrc + '/favicon.ico',
            to: path.resolve(__dirname, strTrg)
        },
    ];

    config.entry = [
        './' + strSrc + '/js/scripts.js',
        './' + strSrc + '/scss/style.scss'
    ];
    config.output = {
        path: path.resolve(__dirname, strTrg),
        filename: 'js/bundle.min.js',
    };
    config.devtool = ((devMode == 2) ? 'none' : 'inline-source-map');
    config.optimization = {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            cacheGroups: {
                'common': {
                    minChunks: 2,
                    chunks: 'all',
                    name: 'common',
                    priority: 10,
                    enforce: true,
                },
            },
        },
    };
    config.module = {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, strSrc + "/js")
                ],
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: [
                    path.resolve(__dirname, strSrc + "/scss")
                ],
                exclude: /node_modules/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: ((devMode == 2) ? false : true),
                            minimize: ((devMode == 2) ? true : false),
                            publicPath: '../',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: ((devMode == 2) ? false : true),
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 11', 'last 2 version']
                                })
                            ],
                            sourceMap: ((devMode == 2) ? false : true),
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: ((devMode == 2) ? false : true),
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jp?g|gif)$/i,
                include: [
                    path.resolve(__dirname, './' + strSrc + "/img")
                ],
                exclude: /node_modules/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: ((devMode == 2) ? '[path][name].[ext]' : '[path][name].[hash].[ext]'),

                            outputPath: (file) => {
                                let path = file.split(strSrc + "/")[1];
                                return path;
                            }
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: false,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                include: [
                    path.resolve(__dirname, strSrc)
                ],
                exclude: /node_modules/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: ((devMode == 2) ? true : false),
                    }
                }]
            },
        ]
    };
    config.plugins = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css',
        }),
        new CopyWebpackPlugin(
            ((devMode == 2) ? filesProd : filesDev)
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            chunks: ['index', 'common'],
            template: './' + strSrc + '/index.html',
            filename: 'index.html',
        }),
        new WebpackMd5Hash(),
    ];

    return config;
};