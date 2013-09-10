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
1. env - provides environment variables
1. preprocess - preprocesses files allowing for integration with environment variables

### Built-In Frameworks

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

Lint all of the JavaScript files.
```
$ grunt lint
```

Just build distribution files:
```
$ grunt build
```

Run the grunt server.  As you change files the page will automatically refresh.
```
$ grunt server
```

## Environment and Preprocessing

### Description

The env and preprocess grunt plugins allow the use of basic logic statements to alter the final produced HTML/JavaScript/CSS code.  The act in similar ways to global variables for conditional compilation in ActionScript.  
  
By default the application is configured with development and production environments.  The development environment is used with the `grunt server` command.  The production environment is used with the `grunt build` command.  

The process module allows for various types of logical statements.  The most common will be to conditionally include/exclude code and to echo environment variables.  

Only include code in a production build (HTML):  
```
<!-- @if NODE_ENV='production' -->
<link rel="stylesheet" href="dist/styles/app.min.css">
<!-- @endif -->
```

Only include code if the `DEBUG` environment variable is true (HTML):  
```
<!-- @ifdef DEBUG -->
<h1>Debugging mode - <!-- @echo RELEASE_TAG --> </h1>
<!-- @endif -->
```

Write the values of two environment variables into the code (JavaScript):  
```
console.log("Environment: " + '/* @echo NODE_ENV */' + " | Version: " + '/* @echo VERSION */');
```

Set the background color of the application based on environment (CSS):  
```
body {
	/* @if NODE_ENV=='development' */
	background-color: red;
	/* @endif */
}
```

All of the available directives are:  
1. `@if VAR='value'` / `@endif` - This will include the enclosed block if your test passes
1. `@ifdef VAR` / `@endif` - This will include the enclosed block if VAR is defined (typeof !== 'undefined')
1. `@ifndef VAR` / `@endif` - This will include the enclosed block if VAR is not defined (typeof === 'undefined')
1. `@include` - This will include the source from an external file. If the included source ends with a newline then the following line will be space indented to the level the @include was found.
1. `@exclude` / `@endexclude` - This will remove the enclosed block upon processing
1. `@echo VAR` - This will include the environment variable VAR into your source

[For more information go here.](https://github.com/jsoverson/preprocess)  

## Scaffolding Options

### Application Creation

```
$ yo dp
```

This is give you a skeleton project containing...
>1. An index.html file which defines an ng-app on the html tag.
>1. Angular, Angular Resource, and JS Signals are included by default.
>1. A controller attached to the body tag.
>1. The application modules will include service, directive, and filter modules.
>1. A SASS file is generated at styles/main.scss.
>1. A Grunt task to jslint files.
>1. A Grunt task to minify JavaScript and CSS files.
>1. A Grunt task to launch a web server that will automatically refresh as you modify code.

### Angular

1. Controller
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
$ yo dp:json-service Items data/items.json
```
```
app.controller('TestController', function($scope, Items) {
	Items.query(function (data) {
		$scope.streams = data.items;
	});
}
```

1. HTTP Service



1. Data Service


