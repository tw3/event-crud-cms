## Event-CRUD-CMS-backend ##

Event-CRUD-CMS-backend is a backend-end web application to **C**reate, **R**ead, **U**pdate and **D**elete a list of scheduled events.  This application provides a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) way to fetch and update the data stored in a database.  The code in this application is configured to connect to a PostgresSQL database but it can be easily changed to use any of the other database supported by Sequelize, which curently supports PostgreSQL, MySQL, MariaDB, SQLite and MSSQL.

## Node-able Modules ##

 - [Node.js](https://nodejs.org) - JavaScript-based web server
 - [Express](http://expressjs.com/) - framework for Node that provides many features including advanced routing
 - [Node Postgres](https://github.com/brianc/node-postgres) - PostgreSQL client for Node
 - [Nodemon](https://github.com/remy/nodemon) - monitors code changes and automatically restarts Node
 - [Sequelize](https://github.com/sequelize/sequelize) - ORM for Node
 - [Babel](https://github.com/babel/babel) - transpiles ES6 JavaScript code to ES5

## Getting Started ##

 1. Install [Node.js](https://nodejs.org/en/download/current/)

 2. Install [Git](https://git-scm.com/downloads)
 
 3. Install [Postgres](https://www.postgresql.org/download/)
 
 This application expects to connect to a Postgres with this info:
 
  - Username: `postgres`
  - Password: `password`
  - Port: 5432
  
  If necessary you can change this my modifying the `sequelize` variable in `src/models/index.js` as described in the Database Support section below.

 3. Clone this repo

    ```sh
    $ git clone https://github.com/tw3/event-crud-cms.git event-crud-cms
    ```

 4. Install and run this backend app

    ```sh
    $ cd event-crud-cms/backend
    $ npm install
    $ npm start
    ```

 5. Test out the service in a web browser or [Postman](https://www.getpostman.com/) or see it work from the corresonding [frontend](https://github.com/tw3/event-crud-cms/tree/master/frontend) application.

## Request API ##

 - Get the list of users: `GET http://localhost:3000/api/events`
 - Get the user #1: `GET http://localhost:3000/api/events/1` where the `1` is the user's id
 - Update the user #1: `PUT http://localhost:3000/api/events/1` with appropriate body data
 - Add a user: `POST http://localhost:3000/api/events` with the appropriate body data
 - Delete user #1: `DELETE http://localhost:3000/api/events/1`

## Request Body Data / Schema ##

When adding or updating a user the following fields should be sent:

 - `title` - Title of the event, e.g. *"Jim's Halloween Party"*
 - `start_dt` - Start date and time of the event, e.g. *"2017-10-31 20:00:00-05:00"*
 - `end_dt` - End date and time of the event, e.g. *"2017-10-31 23:00:00-05:00"*
 - `category` - Category for the event, e.g. "party"
 - `description` - Description of the event, e.g. *"Jim is hosting a big party, all the ghosts and goblins are invited."*
 - `featured_bl` - Whether the event is featured, e.g. *"true"* or *"false"*

## Database Support ##

This application uses [Sequelize](http://docs.sequelizejs.com/en/v3/) which is an ORM that supports several databases incuding PostgreSQL, MySQL, MariaDB, SQLite and MSSQL.  This application is configured to work with PostgreSQL this can easily be changed by updating the SQL connection string found in src/models/index.js:

    ````javascript
    const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/event_db');
    ````

## License ##

This project is licensed under the MIT license, Copyright (c) 2017 Ted Weatherly.
