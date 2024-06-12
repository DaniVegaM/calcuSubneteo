//GulpFile for Web Automatization
//By: Daniel Vega Miranda

/*
CONTACT for Business:
Facebook: Daniel Vegaam
Instagram: @danielvegaam
*/

/*
This gulpfile help to compile SASS files, optimize images, convert images to webp and avif, and create a sourcemap to
modify easily the style of a webpage with SASS
*/

/*
HOW TO START?
1. Install Node and Gulp in your PC
2. Run from console in your project this command to add all the dependencies: npm i
*/

//Dependencies
const { src, dest, watch, series, parallel } = require ('gulp');

//Dependencies CSS and SASS
const sass = require("gulp-sass")(require ("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

//Dependencies images
/*Correct version: npm install --save-dev gulp-imagemin@7.1.0*/
const imagemin = require("gulp-imagemin");
/*Correct version: npm install --save-dev gulp-webp@4.0.1*/
const webp = require("gulp-webp");
const avif = require("gulp-avif");


function css(){
    return src("src/scss/app.scss") //Source SCSS
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'})) //Compile
                /*Make your code compatible with more browsers
                you need to specify them in package.json*/
                .pipe(postcss([autoprefixer(), cssnano()]))
                    .pipe(sourcemaps.write("."))
                        .pipe(dest("build/css")); //Build CSS
}

function images(){
    return src("src/img/**/*")
        .pipe(imagemin({optimizationLevel: 3}))
            .pipe(dest("build/img"));
}

function versionWebp(){
    const options = {
        quality: 75
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
            .pipe(dest("build/img"));
}

function versionAvif(){
    const options = {
        quality: 75
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
            .pipe(dest("build/img"));
}

function dev(){
    //"watch" execute functions automatically
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", images);
}

//How could you execute a function? : gulp "name of function"
//Example: gulp css

exports.css = css;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;


//To execute the first time when you create a project
exports.default = series(images, versionWebp, versionAvif, css, dev); //To compile just writing "gulp"

//To execute when you modify SASS files or images
exports.dev = dev;