//Loading modules
const express = require('express');
const router = express.Router();
const path = require('path');
var multer  = require('multer');
const databaseModule = require('../sql_database/data_functions.js');
const { response } = require('express');

//Setting up file multer (middleware to send files over post request)
const fileMulter = multer({
    //Sets destination of files uploaded
    dest: 'user_uploads/',

    //Sets limitations on files uploaded
    limits: {
      files: 1,
      fileSize: 52428800, //50mb
    },

    //Filter files which are uploaded to only allow certain extensions
    fileFilter: 
        function (request, file, callback) {
            //Extensions allowed
            const extensionsList = ['.css', '.js', '.json', '.html', '.py', '.java', '.class', '.db', '.php', '.uml', '.c', '.sql'];
            
            //Extension of file uploaded
            const fileExtension = path.extname(file.originalname);

            //If the file's extension is not included on allowed list
            if (!extensionsList.includes(fileExtension)) {
                return callback(new Error('File extension invalid.'));
            };

            //Callback, no error
            callback(null, true);
        },
});

//Upload post request, multer automatically copies and stores the file
router.post('/upload', fileMulter.single("code-file"), async function(req, res){
    //Send data to database
    const file = await req.file;
    const email = await req.body.email;

    const storedName = await databaseModule.uploadFile(email, file);

    //Send back appropriate object
    res.send(storedName);
});

//Get all files post request
router.post('/getfiles', async function(req, res){
    //Get email from the req body
    const email = req.body.email;
    
    //Get all files from the database for username
    const allFiles = await databaseModule.getAllUsersFiles(email);
    
    //Send all files back to web page
    res.json(allFiles)
});

//Get file post request
router.post('/getfile', async function(req, res){
    //Get name from the req body
    const name = req.body.name;
    
    //Get file info in object from database
    const file = await databaseModule.getFile(name);
    
    //Send all files back to web page
    res.json(file)
});

//Delete file post request
router.post('/deletefile', async function(req, res){
    //Get file name from the req body
    const name = req.body.name;
    
    //Delete file from database and server
    await databaseModule.deleteFile(name);
    
    //Return done
    res.json(true);
}); 


module.exports = router; 