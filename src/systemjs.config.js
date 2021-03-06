/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'ng2-dnd': 'node_modules/ng2-dnd/bundles/index.umd.js',
            "ng2-ckeditor": "npm:ng2-ckeditor",
            'ng2-dragula/ng2-dragula': 'npm:ng2-dragula/bundles/ng2-dragula.umd.js',
            'angular2-color-picker': 'node_modules/angular2-color-picker',
            'ngx-uploader': 'npm:ngx-uploader/bundles/ngx-uploader.umd.js',
            'ng2-lazy-trumbowyg': 'npm:ng2-lazy-trumbowyg/bundles/trumbowyg.umd.js',
            'angular-froala-wysiwyg': 'npm:angular-froala-wysiwyg/bundles/angular-froala-wysiwyg.umd.js',
            'ng2-page-slider': 'npm:ng2-page-slider/bundles/ng2-page-slider.umd.js',
            'moment': 'node_modules/moment/moment.js',
            'ng2-img-cropper': 'ng2-img-cropper',
            'ngx-bootstrap': 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.js',
            'moment': 'node_modules/moment/moment.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            "ng2-ckeditor": {
                "main": "lib/index.js",
                "defaultExtension": "js",
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-color-picker': { main: 'index.js', defaultExtension: 'js' },
            'ng2-img-cropper': { main: 'index.js', defaultExtension: 'js' }
        }
    });
})(this);