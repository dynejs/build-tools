const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = (entries, outputDir = 'public') => {
    const opts = {
        filename: './[name].js',
        chunkName: '[name].js',
        cssName: './[name].css'
    }

    return (env, argv) => {
        if(argv.mode === 'production') {
            opts.filename = './[name].[hash].js'
            opts.chunkName = './[name].[chunkhash].js'
            opts.cssName = '[name].[hash].css'
        }

        return {
            name: 'client',
            mode: 'development',
            entry: entries,
            output: {
                path: path.resolve(outputDir),
                filename: opts.filename,
                chunkFilename: opts.chunkName
            },
            module: {
                rules: [
                    {
                        test: /.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /.vue$/,
                        loader: 'vue-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(sa|sc|c)ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.ts?$/,
                        loader: "ts-loader",
                        options: { appendTsSuffixTo: [/\.vue$/] }
                    }
                ]
            },
            resolve: {
                alias: {
                    vue$: 'vue/dist/vue.esm.js'
                },
                extensions: ['.js', '.vue']
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: opts.cssName,
                    publicPath: outputDir
                }),
                new VueLoaderPlugin(),
                new WebpackAssetsManifest(),
            ]
        }
    }
}
