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

1. [AngularJS](http://sass-lang.com/)
1. [JS-Signals](https://github.com/millermedeiros/js-signals)
1. [SASS](http://angularjs.org/)

## Optional Stuff

### Frameworks

Several frameworks are available right from Yeoman.  Adding a framework from Yeomon will download the files and add references to them in the appropriate places.  

1. JQuery `$ yo dp:jquery`
1. Bootstrap `$ yo dp:bootstrap`
1. Foundation `$ yo dp:foundation`

### Using Bower

Pretty much any other framework can be installed via Bower.  

1. Find a package to install via command line `$ bower search [<name>]` or from [here](http://sindresorhus.com/bower-components/).
1. Install the package. `$ bower install <package_name>`
1. The contents of the package will be in `app/libs`.  Include the required files in the appropriate location(s).

## Getting Started

### Prerequisite Installation

1. Install [nodejs](http://nodejs.org/).
1. Install Grunt. `$ npm install -g grunt-cli`
1. Install Bower. `$ npm install -g bower`
1. *Windows Only* Install [ruby](http://rubyinstaller.org/).
1. Install Compass, which will install SASS. `$ gem update --system && gem install compass`

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

### Scaffolding Options

## Application Creation

```
$ yo dp
```

This is give you a skeleton project containing...
>An index.html file which defines an ng-app on the html tag.
>Angular, Angular Resource, and JS Signals are included by default.
>A controller attached to the body tag.
>The application modules will include service, directive, and filter modules.
>A SASS file is generated at styles/main.scss.
>A Grunt task to jslint files.
>A Grunt task to minify JavaScript and CSS files.
>A Grunt task to launch a web server that will automatically refresh as you modify code.

## Angular

1. Controllers
```
$ yo dp:controller Name Dependency1 ... Dependency9
```
This will generate a controller with the given name (NameController).  Dependencies are optional.  If provided they will automatically be included in the controller declaration.

1. JSON Service
```
$ yo dp:json-service Name Url
```
This will generate a service with the given name (NameService), which can be referenced by the name as a dependency.  The service will fetch URL and return the contents.
Usage:
```
//(terminal)
$ yo dp:json-service Items data/items.json

//(javascript)
app.controller('TestController', function($scope, Items) {
	Items.query(function (data) {
		$scope.streams = data.items;
	});
}
```

1. HTTP Service



1. Data Service


