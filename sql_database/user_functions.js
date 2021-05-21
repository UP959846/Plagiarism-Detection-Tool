//Loading sqlite3 module
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

//Initialise Users database
async function openInitUsersDB(){
    const databaseModule = await sqlite.open({
        filename: './sql_database/user.db',
        driver: sqlite3.Database,
    });

    //Create user table if not already made
    databaseModule.exec(`CREATE TABLE IF NOT EXISTS Users (
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
        );`);

    return databaseModule;
}

const databaseModule = openInitUsersDB();

databaseModule.addUser = async function(firstName, lastName, email, password){
    const db = await databaseModule;
    return db.run('INSERT INTO Users VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);
}

databaseModule.getUserObject = async function(email){
    const db = await databaseModule;
    const results = await db.all("SELECT * FROM Users WHERE email = ?", email);
    return results;
}

databaseModule.checkUserExists = async function(email){
    const db = await databaseModule;
    const results = await db.all('SELECT * FROM Users WHERE email = ?', email);

    if(JSON.stringify(results) == "[]"){
        return false;
    }else{
        return true;
    }
}

databaseModule.deleteAllUsers = async function(){
    const db = await databaseModule;
    return db.run('DELETE FROM Users');
}

databaseModule.getUsersHash = async function(email){
    const db = await databaseModule;
    const results = await db.get("SELECT password FROM Users WHERE email = ?;", email);
    return results.password;
}

databaseModule.getAllUsers = async function(){
    const db = await databaseModule;
    return db.all('SELECT * FROM Users');
}

module.exports = databaseModule;


