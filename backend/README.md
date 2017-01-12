## event-crud-cms-backend

event-crud-cms-backend is a backend-end web application to **C**reate, **R**ead, **U**pdate and **D**elete a list of scheduled events.  This application provides a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) way to fetch and update the data stored in a database.

## Node-able Modules

 - [Node.js](https://nodejs.org) - JavaScript-based web server
 - [Express](http://expressjs.com/) - framework for Node that provides many features including advanced routing
 - [Node Postgres](https://github.com/brianc/node-postgres) - PostgreSQL client for Node
 - [Nodemon](https://github.com/remy/nodemon) - monitors code changes and automatically restarts Node
 - [Sequelize](https://github.com/sequelize/sequelize) - ORM for Node
 - [Babel](https://github.com/babel/babel) - transpiles ES6 JavaScript code to ES5

## Getting Started

 1. Install [Node.js](https://nodejs.org/en/download/current/) (if necessary)

 2. Install [Git](https://git-scm.com/downloads) (if necessary)
 
 3. Open a terminal / command prompt and clone this repo

        $ git clone https://github.com/tw3/event-crud-cms.git event-crud-cms

 4. Install [Postgres](https://www.postgresql.org/download/) and choose `password` as the password for the default user `postgres`
 
    (See the [Database Support](#database-support) section below if your database setup is different than the default.)
  
 5. Upate your environment variables so you can run `psql`:
 
   - Add the PostgreSQL bin directory to your `PATH`
     - Default path for Windows (32-bit): `C:\Program Files (x86)\PostgreSQL\9.6\bin`
     - Default path for Windows (64-bit): `C:\Program Files\PostgreSQL\9.6\bin`
     - Default path for Unix: `/usr/local/pgsql/bin`
     
   - Set the `PGUSER` environment variable to `postgres`
   
   - Set the `PGPASSWORD` environment variable to `password`
   
   Note: You may need to create a new terminal / command prompt for your environment variables to take effect.

 6. Run the `init.sql` SQL script to initialize the database
 
        $ cd event-crud-cms
        $ cd backend
        $ cd init
        $ psql -f init.sql  
    
 7. Install and run the backend app

        $ cd ../../..
        $ cd event-crud-cms/backend
        $ npm install
        $ npm start

 8. Test out the service in [Postman](https://www.getpostman.com/) or see it work from the corresonding [frontend](https://github.com/tw3/event-crud-cms/tree/master/frontend) application.

## REST Endpoints

 - Get the list of events:
 
   `GET http://localhost:3000/api/events`
   
 - Get event #1:
 
   `GET http://localhost:3000/api/events/1`
 
 ...where the `1` is the event's id
 
 - Update event #1:
 
   `PUT http://localhost:3000/api/events/1`
 
   ...with appropriate body data
 
 - Add an event:
 
   `POST http://localhost:3000/api/events`
 
   ...with the appropriate body data
 
 - Delete event #1:
 
   `DELETE http://localhost:3000/api/events/1`

## Request Body Data / Schema

When adding or updating an event the following fields should be sent:

 - `title` - Title of the event, e.g. *"Jim's Halloween Party"*
 - `start_dt` - Start date and time of the event, e.g. *"2017-10-31 20:00:00-05:00"*
 - `end_dt` - End date and time of the event, e.g. *"2017-10-31 23:00:00-05:00"*
 - `category` - Category for the event, e.g. "party"
 - `description` - Description of the event, e.g. *"Jim is hosting a big party, all the ghosts and goblins are invited."*
 - `featured_bl` - Whether the event is featured, e.g. *"true"* or *"false"*

## Database Support

This application uses [Sequelize](http://docs.sequelizejs.com/en/v3/) which is an ORM that supports several databases incuding PostgreSQL, MySQL, MariaDB, SQLite and MSSQL.  This application is configured to work with PostgreSQL with this connection info:

 - Username: `postgres`
 - Password: `password`
 - Port: `5432`

This configuration can be easily changed by updating the `sequelize` SQL connection string found in src/models/index.js:
    
````javascript
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/event_db');
````

If you choose to use a different username or password you will either need to pass those parameters into the `psql` command when running the `init.sql` script or you will need to update the `PGUSER` and `PGPASSWORD` environment variables.

## License

This project is licensed under the MIT license, Copyright (c) 2017 Ted Weatherly.
