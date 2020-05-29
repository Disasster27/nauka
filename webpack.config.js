const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' );
const Autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    };

    if ( isProd ) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin(),
        ];
    };

    return config;
};

const filename = ext => isDev ? `[name].${ ext }` : `[name].[contenthash].${ ext }`;

const cssLoaders = extra => {
    const loaders =[
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    Autoprefixer()
                ],
                sourceMap: true
            }
        },
    ];

    if (extra) {
        loaders.push(extra);
    };

    return loaders;
};

const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ],
    };

    if (preset) {
        opts.presets.push(preset)
    };

    return opts;
};

module.exports = {
    context: path.resolve( __dirname, 'src' ),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename( 'js' ),
        path: path.resolve( __dirname, 'dist' )
    },
    optimization: optimization(),
    devServer: {
        port: 4400,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin( {
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        } ),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin( {
            patterns: [
                {
                    from: path.resolve( __dirname, 'src/assets/nauka.ico' ),
                    to: path.resolve( __dirname, 'dist/assets' )
                }
            ]
        } ),
        new MiniCssExtractPlugin( {
            filename: filename('css'),
        } )
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions(),
                },
            },
            { 
                test: /\.ts$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript',),
                },
            },
            { 
                test: /\.jsx$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react',),
                },
            },
        ]
    }
};