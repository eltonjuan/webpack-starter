var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack-config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');

gulp.task('clean', function(done){
	del(['dist']);
});

gulp.task('webpack:build', function(done){
	var conf = Object.create(webpackConfig);
	conf.plugins = conf.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	webpack(conf, function(err, stats){
		if(err) throw new gutil.PluginError("webpack:build", err);
			gutil.log("[webpack:build]", stats.toString({
				colors: true
			}));
			done();
	});
});


// Webpack Development Server
var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;
var compiler = webpack(devConfig);

gulp.task('webpack:build-dev', function(done){
	compiler.run(function(err, stats){
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		done();
	});
});

gulp.task('webpack-dev-server', function(){
	// modify some webpack config options

	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
	myConfig.plugins = myConfig.plugins.concat(new webpack.HotModuleReplacementPlugin());

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		hot: true,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});

gulp.task('dev', ['clean', 'webpack-dev-server']);
gulp.task('build', ['clean', 'webpack:build']);