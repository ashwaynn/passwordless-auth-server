
const dbStmts = require('./queries')

// Create a user in the DB

const createUser = (connection, data) => {

    return new Promise((resolve, reject) => {
        let insertStmt = dbStmts.QUERIES.USERS.CREATE_USER;
        connection.query(insertStmt,data, (err, results, fields) => {
            if(err){
                console.log(err);
                const successObject = { successState : false, operation: "Insert " + data[0], queryResults : {}, errorMessage : err.sqlMessage };
                reject(successObject);
            }
            else{
                //console.log("Results: ", results);
                //console.log("Fields: ", fields);
                const successObject = { successState : true, operation: "Insert " + data[0], queryResults : results, errorMessage : "No error" };
                resolve(successObject);
            }
        });
    });
};



// Read user details

const readUsersTable = (connection) => {

    return new Promise((resolve, reject) => {
        let selectStmt = dbStmts.QUERIES.USERS.READ_ALL_USERS;
        connection.query(selectStmt, (err, results, fields) => {
            if(err){
                console.log(err);
                const successObject = { successState : false, operation: "Select (entire table)", queryResults : {}, errorMessage : err.sqlMessage };
                reject(successObject);
            }else{
                //console.log("Results: ", results);
                //console.log("Fields: ", fields);
                const successObject = { successState : true, operation: "Select (entire table)", queryResults : results, errorMessage : "No error" };
                resolve(successObject);
            }
        });
    });
};



// Check if user exists

const checkUserExists = (connection, username) => {
    
    return new Promise((resolve, reject) => {
        let selectStmt = dbStmts.QUERIES.USERS.READ_USER;
        connection.query(selectStmt, username, (err, results, fields) => {
            if(err){
                console.log(err);
                const successObject = { successState : false, operation: "Select " + username , queryResults : {}, errorMessage : err.sqlMessage };
                reject(successObject);
            }else{
                //console.log("Results: ", results);
                //console.log("Fields: ", fields);
                if(results.length === 1){
                    const successObject = { successState : true, operation: "Select " + username + " - " + username + " EXISTS", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }else{
                    const successObject = { successState : true, operation: "Select " + username + " - " + username + " DOES NOT EXIST", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }
            }
        });
    });
};



// [Update] : Update user details

const updateUser = (connection, data) => {
    
    return new Promise((resolve, reject) => {
        let updateStmt = dbStmts.QUERIES.USERS.UPDATE_USER;
        connection.query(updateStmt, data, (err, results, fields) => {
            if(err){
                console.log(err);
                const successObject = { successState : false, operation: "Update " + data[1] , queryResults : {}, errorMessage : err.sqlMessage };
                reject(successObject);
            }else{
                //console.log("Results: ", results.affectedRows);
                //console.log("Fields: ", fields);
                if(results.affectedRows === 0){
                    const successObject = { successState : true, operation: "Update " + data[1] + " - " + data[1] + " NOT PRESENT to update", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }else{
                    const successObject = { successState : true, operation: "Update " + data[1] + " - " + data[1] + " UPDATED", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }
                
            }
        });
    });
};



// [Delete] : Delete a user

const deleteUser = (connection, username) => {
    
    return new Promise((resolve, reject) => {
        let deleteStmt = dbStmts.QUERIES.USERS.DELETE_USER;
        connection.query(deleteStmt, username, (err, results, fields) => {
            if(err){
                console.log(err);
                const successObject = { successState : false, operation: "Delete " + username , queryResults : {}, errorMessage : err.sqlMessage };
                reject(successObject);
            }else{
                //console.log("Results: ", results.affectedRows);
                //console.log("Fields: ", fields);
                if(results.affectedRows === 0){
                    const successObject = { successState : true, operation: "Delete " + username + " - " + username + " NOT PRESENT to delete", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }else{
                    const successObject = { successState : true, operation: "Delete " + username + " - " + username + " DELETED", queryResults : results, errorMessage : "No error" };
                    resolve(successObject);
                }
                
            }
        });
    });
};



// Export the functions

module.exports = { createUser, readUsersTable, checkUserExists, deleteUser, updateUser };






/*
const createUser = async (connection, data) => {   
    try {
        let insertStmt = `INSERT INTO users (user_name, user_role, public_key, meta_data) VALUES (?, ?, ?, ?)`;
        const queryResults = await connection.query(insertStmt,data);
        //console.log(queryResults);
        const successObject = { successState : true, data : {}, errorMessage : "No error"};
        return successObject;
    }
    catch(err)
    {
        console.log("----------ERROR--------------");
        console.log(err);
        const successObject = { successState : false, data : {}, errorMessage : "Error"};
        return successObject;
    }

};
*/
