var dirSync = require( 'gulp-directory-sync' );

gulp.task( 'sync', function() {
    return gulp.src( '' )
        .pipe(dirSync( 'public', 'build', { printSummary: true } ))
        .on('error', gutil.log);
} );

gulp.task( 'sync', function() {
    return gulp.src( '' )
        .pipe(dirSync( 'public', 'build', { printSummary: true } ))
        .on('error', gutil.log);
} );

