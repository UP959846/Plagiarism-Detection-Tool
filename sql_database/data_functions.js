//Loading sqlite3 module
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

//Loading other modules
const fsPromisesModule = require('fs').promises;
const fs = require('fs');

//Initialise files database
async function openInitFilesDB(){
    const databaseModule = await sqlite.open({
        filename: './sql_database/files.db',
        driver: sqlite3.Database,
    });

    //Create user table if not already made
    databaseModule.exec(`CREATE TABLE IF NOT EXISTS Files (
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        storedName TEXT NOT NULL,
        size INTEGER NOT NULL,
        type TEXT NOT NULL,
        directory TEXT NOT NULL
        );`);

    return databaseModule;
}

const databaseModule = openInitFilesDB();

databaseModule.uploadFile = async function(email, file){
    const db = await databaseModule;

    //Get info ready to insert to database
    const storedName = file.filename;
    const name = file.originalname;
    const size = file.size;
    const type = file.mimetype;
    const directory = file.path;

    db.run('INSERT INTO Files VALUES (?, ?, ?, ?, ?, ?)', [email ,storedName, name, size, type, directory]);

    return storedName;
}

databaseModule.deleteAllFiles = async function(){
    await fsPromisesModule.rmdir("../user_uploads", {
        recursive: true
      })
    const db = await databaseModule;
    return db.run('DELETE FROM Files');
}

databaseModule.deleteFile = async function(name){
    //Delete from server
    fs.unlink("./user_uploads/" + name, function(error) {
        if (error) {
          throw error;
        } 
    });
    
    //Delete from database
    const db = await databaseModule;
    return db.run('DELETE FROM Files WHERE name = ?', name);
}

databaseModule.getAllFiles = async function(){
    const db = await databaseModule;
    return db.all('SELECT * FROM Files');
}

databaseModule.getFile = async function(name){
    const db = await databaseModule;
    return db.all('SELECT * FROM Files WHERE name = ?', name);
}

databaseModule.getAllUsersFiles = async function(email){
    const db = await databaseModule;
    return db.all('SELECT * FROM Files WHERE email = ?', email);
}

module.exports = databaseModule;

