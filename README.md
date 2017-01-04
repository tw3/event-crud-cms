## event-CRUD-CMS ##

event-CRUD-CMS is a full stack web application to **C**reate, **R**ead, **U**pdate and **D**elete a list of scheduled events.  The front-end component uses [React.js](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) (among other technologies) to display and update the data as a single page application.  The data for the application is retrieved from a back-end component that uses [Express](http://expressjs.com/), [Seqeulize](http://sequelizejs.com), and [PostgreSQL](https://www.postgresql.org/).

## Getting Started ##

 1. Install [Node.js](https://nodejs.org/en/download/current/) (if necessary)

 2. Install [Git](https://git-scm.com/downloads) (if necessary)
 
 3. Clone this repo

        $ git clone https://github.com/tw3/event-crud-cms.git event-crud-cms

 4. Install [Postgres](https://www.postgresql.org/download/) and choose `password` as the password for the default user `postgres`
 
 5. Upate your environment variables so you can run `psql`:
 
   - Add the PostgreSQL bin directory to your `PATH`
     - Default path for Windows (32-bit): `C:\Program Files\PostgreSQL\9.6\bin`
     - Default path for Windows (64-bit): `C:\Program Files (x86)\PostgreSQL\9.6\bin`
     - Default path for Unix: `/usr/local/pgsql/bin`
     
   - Set the `PGUSER` environment variable to `postgres`
   
   - Set the `PGPASSWORD` environment variable to `password`

 6. Run the `init.sql` SQL script to initialize the database
 
        $ cd event-crud-cms/backend/init
        $ psql -f init.sql
    
 7. Install and run the backend app

        $ cd event-crud-cms/backend
        $ npm install
        $ npm start 

 8. Open a separate command prompt and navigate to the `event-crud-cms` directory
 
 9. Install and run the [frontend](https://github.com/tw3/event-crud-cms/tree/master/frontend) application
 
     ```sh
    $ cd frontend
    $ npm install
    $ npm start
    ```
 
 10. Test it out at [http://localhost:3000](http://localhost:3000)

## License ##

This project is licensed under the MIT license, Copyright (c) 2017 Ted Weatherly.
