## event-CRUD-CMS-frontend ##

event-crud-cms-frontend is a front-end web application to **C**reate, **R**ead, **U**pdate and **D**elete a list of scheduled events.  This application was developed using the excellent [Redux Minimal](https://github.com/catalin-luntraru/redux-minimal) start kit and has been modified to interact with the [event-CRUD-CMS-backend](https://github.com/tw3/event-crud-cms/tree/master/backend) application, which is required to fetch and update the data in a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) manner.

A demo of the app will be posted as some point.

## Node-able Modules ##

 - [React](https://github.com/facebook/react) - renders the application in a component-based manner
 - [Redux](https://github.com/reactjs/redux) - manages the application state
 - [React Router](https://github.com/reactjs/react-router) - manages the routing state
 - [Redux Form](https://github.com/erikras/redux-form) - manages the form state, submission, and validation
 - [Redux Saga](https://github.com/redux-saga/redux-saga) - manages asynchronous state changes
 - [Redux Logger](https://github.com/evgenyrodionov/redux-logger) - logger middleware for Redux, useful for debugging
 - [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap) - manages style/layout
 - [React Widgets](https://github.com/jquense/react-widgets) - provides a date/time picker
 - [Validate.js](https://github.com/ansman/validate.js) - validates the form data
 - [Babel](https://github.com/babel/babel) - transpiles ES6 JavaScript code to ES5
 - [Sass](https://github.com/sass/node-sass) - performs CSS preprocessing
 - [Webpack](https://github.com/webpack/webpack) - bundles the content
 - [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) - serves the content

## Getting Started ##

 1. Follow the instructions to install and run the [backend](https://github.com/tw3/event-crud-cms/tree/master/backend) application

 2. Open a separate command prompt and navigate to the `event-crud-cms` directory

 3. Install this frontend application

     ```sh
    $ cd frontend
    $ npm install
    ```

 4. If the corresponding back-end app is on a different port than the default (3000) then you will need to update the `apiUrlOrigin` variable in `src/api/scheduledEvents.js`

    ```javascript
    const apiUrlOrigin = (typeof window === 'undefined') ?
    	'http://localhost:3000' : // needed to pass the tests
    	[window.location.protocol, // 'http' or 'https'
    		'//',
    		window.location.hostname, // the server host, e.g. 'localhost'
    		':3000', // the server port
    	].join('');
    ```

 5. Start the app

    ```sh
    $ npm start
    ```

 8. Visit the app at [http://localhost:8080/](http://localhost:8080/)

## Known Bugs and Possible Improvements ##

 - AJAX/network errors are not handled very well
 - There should be a cancel button on the add/edit form
 - The buttons on the add/edit form should have better alignment
 - A card or stacked layout may be better than a table layout
 - The featured flag could be changed using a selectable "star"
 widget on the list page (similar to the star widget in Gmail)

## Coding Style Guide ##

The codebase aims to follow the Airbnb style guide.  There is one guideline
I don't agree with though and that's the 2 spaces rule.  [Truth be told I do
have a slight preference for tabs](https://www.youtube.com/watch?v=SsoOG6ZeyUI)
since most IDEs now  let you configure the indentation size for your tabbed
code.

## License ##

This project is licensed under the MIT license, Copyright (c) 2017 Ted Weatherly.
