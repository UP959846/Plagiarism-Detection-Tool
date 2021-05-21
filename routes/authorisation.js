//Loading modules
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const databaseModule = require('../sql_database/user_functions.js');

//Login post request
router.post('/login', async function(req, res){
    //Get user input from request body
    const email = req.body.email;
    const UIpassword = req.body.password;

    //Check if user exists
    const userExists = await databaseModule.checkUserExists(email);

    if(userExists){
        //Get hashed password from database
        const usersHash = (await databaseModule.getUsersHash(email));

        //Check if passwords match
        bcrypt.compare(UIpassword, usersHash, function(err, result) {
            if (result) {
              //Initiate log in
              res.json(true);
            }
            else {
              res.json(false);
            }
        });

    }else{
        res.json(false);
    }
});

//Add user post request
router.post('/signup', function(req, res){
    //Get user input from request body
    const name = req.body.fullName;
    const email = req.body.email;
    var password;

    //Validation functions
    function checkEmail(input){
        var emailRegExpression = /\S+@\S+\.\S+/;
        return emailRegExpression.test(input);
      }
    
    function checkName(input) {
        const words = input.split(" ");

        if (words.length == 2){
            return true;
        }else{
            return false;
        }
    }

    //Validate email
    if(checkEmail(email)){
        //Validate name
        if(checkName(name)){
            //Format full name into first and second name
            const wordsInFullName = name.split(" ");

            const firstName = wordsInFullName[0];
            const lastName = wordsInFullName[1];

            //Encrypting (Hash then salt) password from user 
            bcrypt.hash(req.body.password, 12, function(err, hash) {
                const password = hash;

                //Adding user to the Users database
                databaseModule.addUser(firstName, lastName, email, password);
                res.json(true);
            });
        }else{
            res.json(false);
        }
    }else{
        res.json(false);
    }
});

//Get user info post request
router.post('/getinfo', async function(req, res){
    const email = req.body.email;
    
    const userInfoObject = await databaseModule.getUserObject(email);

    res.json(userInfoObject);
});

module.exports = router; 