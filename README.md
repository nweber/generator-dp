## What's Included?

### The Tools

Yeoman provides scaffolding.
Bower manages dependencies.
Grunt manages build tasks.

### Grunt Plugins

1. copy - allows grunt to copy generated files
1. uglify - minify js files
1. compass - compile sass
1. jshint - error check js files
1. watch - watch for file changes to kick off tasks
1. open - allows Grunt to open files
1. connect - development web server
1. concurrent - run grunt tasks concurrently
1. clean - removes previously generated files

### Frameworks

1. [AngularJS](http://sass-lang.com/]
1. [JS-Signals](https://github.com/millermedeiros/js-signals)
1. [SASS](http://angularjs.org/)

## Optional Stuff

### Frameworks

Several frameworks are available right from Yeoman.  Adding a framework from Yeomon will download the files and add references to them in the appropriate places.
1. JQuery `yo dp:jquery`
1. Bootstrap `yo dp:bootstrap`
1. Foundation `yo dp:foundation`

### Using Bower

Pretty much any other framework can be installed via Bower.
1. Find a package to install via command line `bower search [<name>]` or from [here](http://sindresorhus.com/bower-components/).
1. Install the package. `bower install <package_name>
1. The contents of the package will be in `app/bower_components`.  Include the required files in the appropriate location.
*The `bower install <package_name>` will add the package as a requirement in the bower.json file.  Other folks can then run `bower install` to get the new dependencies.*

## Getting Started

### Prerequisite Installation

1. Install [nodejs](http://nodejs.org/).
1. Install Grunt. `npm install -g grunt-cli`
1. Install Bower. `npm install -g bower`
1. *Windows Only* Install [ruby](http://rubyinstaller.org/).
1. Install Compass, which will install SASS. `gem update --system && gem install compass`

### Quick Start

1. Clone repo.

1. Download dependencies.
```
$ npm install
$ bower install
```

Grunt Options:

Do a build, including jslint.
```
$ grunt
```

Just build distribution files:
```
$ grunt build
```

Run the grunt server.  As you change files the page will automatically refresh.
```
$ grunt server
```
