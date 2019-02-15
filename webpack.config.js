const path = require('path')
const webpack = require('webpack') //para que funcione el plugin de hotmoduleReplacement
const htmlPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')



module.exports = {
    devtool:'source-map',
    mode: 'development',
    entry: {
        app: path.join(__dirname,'src', 'main.js'),
    detail: path.join(__dirname,'src', 'detail.js'),
 },// /miruta/src/main.js
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    module:{
        rules: [
            {
                test:/\.scss$/,     //una expresion regular con lo que nosotros queremos que este loader afecte
                use: [
                    'style-loader',
                {
                    loader: 'css-loader',
                    options:{
                        sourceMap:true
                    },
                },
                {
                    loader: 'sass-loader',
                    options:{
                        sourceMap:true
                    },  
                }
            ], //cuidado con el orden, los lee de derecha a izq.
            },

            {test:/\.js$/,     //una expresion regular con lo que nosotros queremos que este loader afecte
                use: 'babel-loader',
                //para utilizar frameworks como babel, react...se usan loaders
                exclude: /node_modules/, //para que no los tenga encuenta
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
              },

        ],
    },
    plugins:[
        new htmlPlugin({
            template: path.join(__dirname,'src','index.html'),
            chunks: ['app'],

        }),
        new htmlPlugin({
            filename:'detail.html',
            template: path.join(__dirname,'src','detail.html'),
            chunks: ['detail'], //que solo le ponga el .js de detail.bundel.js
        }),

        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']), //limpiar la carpeta dist

    ],
        devServer: {
            open: true,
            overlay: true,
            port: 3000,
            //Para que no recargue el navegador automaticamente, pero si se actualice el css la web
            hot: true, 
            contentBase: [path.join(__dirname, 'src'),
            path.join(__dirname, 'src', 'templates') ],//para que afecte al html de templates 
            watchContentBase: true,

        },
    
}