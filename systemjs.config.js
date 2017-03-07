(function(global) {
  var paths = {
    // paths serve as alias
    'npm:': 'node_modules/'
  };

  // map tells the System loader where to look for things
  var map = {
    // app
    'app': 'dist/js/src/app/ts',
    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    // other libraries
    'rxjs': 'npm:rxjs',
    'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    'ng2-uploader': 'npm:ng2-uploader',
    'ng2-select' :'npm:ng2-select',
    'ng-sidebar': 'npm:ng-sidebar',
    'ng2-datetime-picker': 'npm:ng2-datetime-picker/dist',
    'angular-2-local-storage': 'npm:angular-2-local-storage/dist',
    'alertifyjs': 'alertifyjs'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {
      main: 'main',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    },
    'ng2-uploader': {
      defaultExtension: 'js',
      main: 'ng2-uploader'
    },
    'ng2-select': {
      defaultExtension: 'js',
      main: 'ng2-select'
    },
    'ng-sidebar': {
      defaultExtension: 'js',
      main: 'lib/index'
    },
    'ng2-datetime-picker': {
      defaultExtension: 'js',
      main: 'ng2-datetime-picker.umd'
    },
    'angular-2-local-storage': {
      defaultExtension: 'js',
      main: 'index'
    }
  };

  var config = {
    paths: paths,
    map: map,
    packages: packages
  };

  System.config(config);
})(this);
