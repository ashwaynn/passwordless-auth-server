
// Create a user in the DB

const create_user = (connection, data) => {
    let insert_stmt = `INSERT INTO users (user_name, user_role, public_key, meta_data) VALUES (?, ?, ?, ?)`;
    
    connection.query(insert_stmt, data, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("User created in DB");
        }
    });
};

// Read user details

const read_user_details = (connection, username) => {
    let select_stmt = `SELECT * FROM users WHERE user_name=?`;
    
    connection.query(select_stmt, username, (err, results, fields) => {
        if(err){
            console.log(err);
        }else{
            console.log(results[0].user_name);
            console.log(results[0].user_role);
            console.log(results[0].public_key);
            console.log(results[0].meta_data);
            //console.log("The length of the Results array is", results.length);
        }
    });
};

// Check if user exists

const check_user_exists = (connection, username) => {
    
    return new Promise((resolve, reject) => {
        let select_stmt = `SELECT * FROM users WHERE user_name=?`;
    
        connection.query(select_stmt, username, (err, results) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                if(results.length === 1){
                    console.log("User exists, returning 'true'");
                    resolve(true);
                }else{
                    console.log("User not present, returning 'false'");
                    resolve(false);
                }
            }
        });
    });
};

// [Update] : Update user details



// [Delete] : Delete a user

const delete_user = (connection, username) => {
    let delete_stmt = `DELETE FROM users WHERE user_name=?`;
    
    connection.query(delete_stmt, username, (err, results, fields) => {
        if(err){
            console.log(err);
        }else{
            console.log(username, "deleted!");
            console.log(results);
        }
    });
};


// Export the functions

module.exports = { create_user, read_user_details, check_user_exists, delete_user };