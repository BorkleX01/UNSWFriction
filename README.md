Requirements:
-------------
- nodejs - [http://nodejs.org/](http://nodejs.org/)
- bower (install it running: **npm install -g bower**) - [http://twitter.github.com/bower/](http://twitter.github.com/bower/)
- phantomjs is necessary to run the tests in headless mode - [http://phantomjs.org/](http://phantomjs.org/)
- _(optional)_ simple-http-server (**npm install -g simple-http-server**) can be used to serve the app for debugging or running tests.
  - _usage:_ 
     - cd to the HTDOCS
     - **nserver [-d .] [-p 8000]**
     - http://localhost:8000/repo/PROJECT_TYPEs/PROJECT/index.html/ - loads your index.html

New project steps:
--------------------
By default, the template will install ```npm``` and ```bower``` modules, and compile the initial *.less and *.coffee files. If for any reason it fails, you can initialize your project running: 

in a terminal window,

1. **cd _PROJECT_**
2. **npm install**
3. **bower install**
4. **grunt **

Execute steps 2 and 3 if you have to update the dependencies.

Cloned project steps:
---------------------
When you have cloned a project from the git repository, you must update the npm modules as these are not committed to the repo.

1. **cd into the project**
2. **npm install**

Development workflow:
---------------------
When you're developing with ```grunt``` the recommended steps are:

in a terminal window,

1. **cd _PROJECT_**
2. **grunt**

It will run compilation and test tasks every time you modify a file.

How to add libraries to the project:
------------------------------------
- Search for the library using: **bower search &lt;library name&gt;**.
- If the library exists in bower registry, then add it to _PROJECT_/components.json and then run **bower install**
- If the library is available in github run **bower install &lt;git repo&gt; --save**
- If _bower_ can't be used to maintain an up to date copy of the library, download the library and put it wherever you want (_maybe under a 'libs' folder?_)

Environments:
-------------
The template comes with 2 predefined environments: _local_ and _prod_.

In order add another environment:

1. Modify grunt.js to add the environment in the tasks that are _environment-aware_, for example: 
  + less
  + copy
  + requirejs
  + See the _prod_ subtask as an example.
3. Register the _dist:&lt;name of environment&gt;_ task in grunt.js. 
  + Mimic _dist:prod_ (inside grunt.js file).

