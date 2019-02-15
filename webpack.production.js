const path = require('path')
const webpack = require('webpack') //para que funcione el plugin de hotmoduleReplacement
const htmlPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: 'production',
    entry: { 
        app: path.join(__dirname,'src', 'main.js'),
    detail: path.join(__dirname,'src', 'detail.js'),
 },
    // /miruta/src/main.js
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'build'),
    },
    module: {
        rules: [{
                test: /\.scss$/, //una expresion regular con lo que nosotros queremos que este loader afecte
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ], //cuidado con el orden, los lee de derecha a izq.
            },

            {
                test: /\.js$/, //una expresion regular con lo que nosotros queremos que este loader afecte
                use: 'babel-loader',
                //para utilizar frameworks como babel, react...se usan loaders
                exclude: /node_modules/, //para que no los tenga encuenta
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].production.[ext]',
                    },
                }, ],
            },

        ],
    },
    plugins: [

        new webpack.ProgressPlugin(), //barra de progreso en el terminal
        new htmlPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            minify: {
                collapseWhitespace: true, //minificar el html
                removeComments: true, //sin comentarios
            },
        }),
        new htmlPlugin({
            filename: 'detail.html',
            template: path.join(__dirname, 'src', 'detail.html'),
            minify: {
                collapseWhitespace: true, //minificar el html
                removeComments: true, //sin comentarios
            },
        }),
        new CleanWebpackPlugin(['build']), //limpiar la carpeta build
        new MiniCssExtractPlugin(),
    ],

}