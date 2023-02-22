const mysql = require('mysql');

let dbConnection;

const dbConfig = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('Connection to DB succeeded');
    });

    dbConnection = connection;
};

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        try {
            dbConnection.query(query, params, (err, result) => {
                if (err) {
                    console.log('EXECUTE DB QUERY ERROR : ', query, err);
                    return reject(err);
                }

                return resolve(result);
            });
        } catch (e) {
            console.log('EXECUTE QUERY ERROR: BEFORE EXCUTION :', e);
            throw new Error();
        }
    });
};

module.exports = {
    dbConfig,
    executeQuery,
};
