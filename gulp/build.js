var gulp = require('gulp');

gulp.task('serve', function(){
	gulp.src('src')
		.pipe(webserver({
			livereload: true,
			directoryListing: true, 
			open: true
		}));
});