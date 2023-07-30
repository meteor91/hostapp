// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const openBrowser = require('react-dev-utils/openBrowser');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        host,
        port,
        onListening: (_devServer) => {
            openBrowser(`http://${host}:${port}`);
        },
        proxy: {
            '/api': 'http://127.0.0.1:8000',
        },
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            // remotes: {
            //     app2: "app2@http://localhost:8080/remoteEntry.js",
            // },
            shared: [
                {
                    react: { singleton: true, eager: true },
                    'react-dom': { singleton: true, eager: true },
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
        symlinks: false,
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
    }
    return config;
};
