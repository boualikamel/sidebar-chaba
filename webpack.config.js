
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



const webpackConfig = {
    entry: './src/app/app.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            { 
                test: /\.pug$/,
                use: ['pug-loader']
              },
            {
                test: [/.css$|.scss$/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    },

                ]
            },
            {
                test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "build/[name].[ext]"
                    }
                  }
                ]
              },
              {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            }
          
        
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'SideBar BK',
            template: './src/index.pug',
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/images',
            to: 'assets/images'
        }]),
    


    ],
    devServer: {
        port: 3000,
      }
}


const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConf =  merge(webpackConfig, {
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin()
      ]
    }
   });


const environment = (process.env.NODE_ENV || 'development').trim();
if (environment === 'development') {
    module.exports = webpackConfig
} else {
    module.exports  = webpackProdConf; 
}

