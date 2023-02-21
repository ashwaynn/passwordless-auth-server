# Passworless Auth Server

* The project is in *development stage*.
* It contains a very simple server written using `Node.js`. 
* The server runs on *port 3000*.
* This repo also contains a `SQL` script that creates a ***users*** table in the schema `passwordless_auth` (Drops the schema if it already exists and creates it again).

### CRUD Operations

To perform the CRUD operations, visit the following routes:

* `/create-user` for creating a user.
* `/users` for reading the entire ***users*** table.
* `/check-username` for reading the details of a specific user.
* `/update-user` for updating the details of a specific user.
* `/delete-user` for deleting a specific user.