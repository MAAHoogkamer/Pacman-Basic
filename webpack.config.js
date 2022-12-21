const CopyWebpackPlugin = require('copy-webpack-plugin');

function babelLoaderOptions() {
    return {
        babelrc: false,
        configFile: false,
        cacheDirectory: true,
        presets:[
          '@babel/preset-react'
        ],
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
        ]
    };
}

module.exports = {
    //...
    devServer: {
        contentBase: '.',
        index: 'index.html',
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(j)sx?$/, // match .js, .jsx
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workerNodeArgs: ['--max-old-space-size=1024'],
                            poolRespawn: false,
                            name: 'js-pool'
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: babelLoaderOptions()
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workerNodeArgs: ['--max-old-space-size=1024'],
                            poolRespawn: false,
                            name: 'css-pool'
                        }
                    },
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [require('postcss-preset-env')()]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader'
            },
            {
                test: /\.txt/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'css', to: 'css' },
                { from: 'img', to: 'img' },
                { from: 'index.html', to: 'index.html' },
                { from: 'GridDef.txt', to: 'GridDef.txt' },
            ]
        })
    ]
};