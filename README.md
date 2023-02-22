### Set Up

1. Download MySQL and install
2. Run the queries given in `/SQL File/passwordless_auth.sql`
3. In project root folder create a file named `.env`
4. Inside `.env` specify the following details

```
MYSQL_HOST=<hostname>
MYSQL_USER=<username>
MYSQL_PASSWORD=<password>
MYSQL_DATABASE=passwordless_auth

```

5. Open a terminal in the root folder of the project and run `npm i`.

6. Run `npm start`.

7. If DB connection has problems run the following queries

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
flush privileges;
```

# Passworless Auth Server

-   The project is in _development stage_.
-   It contains a very simple server written using `Node.js`.
-   The server runs on _port 3000_.
-   This repo also contains a `SQL` script that creates a **_users_** table in the schema `passwordless_auth` (Drops the schema if it already exists and creates it again).

### CRUD Operations

To perform the CRUD operations, visit the following routes:

-   `/create-user` for creating a user.
-   `/users` for reading the entire **_users_** table.
-   `/check-username` for reading the details of a specific user.
-   `/update-user` for updating the details of a specific user.
-   `/delete-user` for deleting a specific user.
