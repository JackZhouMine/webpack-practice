let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	watch: true,
	// mode: 'none', // 开发模式，还可设置为 production none 不同模式，输出文件不同 可选的
	devtool: 'cheap-module-source-map', //生产环境
	// devtool: 'cheap-module-eval-source-map', //开发环境
	entry: ['babel-polyfill','./app.js'], //打包入口文件  可选的，这里你是单文件入口
	output: {
		//打包输出配置 非必须 默认是 dist/main.js
		path: path.resolve(__dirname, 'build'), //打包问你安输出路径，要求绝对路径
		filename: 'bundle.js' //在打包后的文件名后加上哈希前5位
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		},
		extensions: ['.js', '.json']
	},
	//开服务器配置，将打包后的文件部署在该服务器上
	devServer: {
		host: 'localhost',
		port: 8080,
		contentBase: './build',
		compress: true, //收使用压缩文件
		headers: {
			'X-foo': '112233'
		},
		historyApiFallback: true,
		progress: false, //显示进度条
		inline: true,
		hot: true,
		open: true,
		overlay: true,
		proxy: {
			'/getDomainCategory': {
				target: 'http://localhost:3000',
				// secure: true, //开启https,
				// changeOrigin: true,//跨域
				pathReweite: {
					'^/getDomainCategory': ''
				},
				bypass: function(req, res, proxyOptions) {
					if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
						console.log('Skipping proxy for browser request.');
						return '/index.html';
					}
				}
			}
		}
	},
	module: {
		// noParse: /jquery|xxjs/,
		rules: [
			{
				test: /\.css$/,
				// use: [MiniCssExtractPlugin.loader, 'style-loader','css-loader']  包含 style-loader 会报 window is not defined
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: __dirname+'node_modules',
				include: __dirname+'src',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},
	// 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html', //指定模板,有默认模板
			title: '模板文件',
			filename: 'index.html', //打包后的名字，默认和模板名一样,
			hash: true, //引用的脚本名后加哈希
			inject: 'body' // true|'body'|'head'|false 默认 true即在body前插入js,false 需要手动插入
			/* 		minify: {
				removeAttributeQuotes:false, //删除双引号
				collapseWhitespace: true //生成的html合并空行
      } */
			//还有其他一些属性
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		// 开启 hot 就要调用该插件，否则会提示错误
		new webpack.HotModuleReplacementPlugin()
	]
};
