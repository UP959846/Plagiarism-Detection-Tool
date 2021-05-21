//Loading modules
const expressModule = require('express');
const path = require('path'); 
   
//Creating the express server
const expressServer = expressModule();
const port = process.env.PORT || 8080;

//Adding middleware
expressServer.use(expressModule.json({limit: '50mb'}));
expressServer.use('/', expressModule.static('page_source'));
expressServer.use('/', expressModule.static('css_source'));
expressServer.use('/', expressModule.static('media'));
expressServer.use('/', expressModule.static('utils'));
expressServer.use('/', expressModule.static('user_uploads'));

//When someone goes to our URL/__site__ it will load routes/__site__.js
const authRouter = require('./routes/authorisation');
expressServer.use('/auth', authRouter); 

const filesRouter = require('./routes/files');
expressServer.use('/files', filesRouter);

const similarityRouter = require('./routes/similarity');
expressServer.use('/similarity', similarityRouter); 

//At start-up send user to the home page
expressServer.get('/', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/login_page.html'));
});

//Page initialisation to URL
expressServer.get('/signup', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/signup_page.html'));
});

expressServer.get('/home', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/home_page.html'));
});

expressServer.get('/file-center', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/file_center_page.html'));
});

expressServer.get('/view-file', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/view_file_page.html'));
});

expressServer.get('/compare-files', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/file_compare_page.html'));
});

expressServer.get('/compare-file-view', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/compare_file_view_page.html'));
});

expressServer.get('/multifile-compare', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/multifile_compare_page.html'));
});

expressServer.get('/multifile-compare-file-center', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/multifile_compare_file_center_page.html'));
});

expressServer.get('/multifile-select-origin-file', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/multifile_select_origin_page.html'));
});

expressServer.get('/multifile-compare-upload', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/multifile_compare_upload_page.html'));
});

expressServer.get('/multifile-compare-view', function(req, res){
    res.sendFile(path.join(__dirname +'/page_source/multifile_compare_view_page.html'));
});

//Starting the server
expressServer.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




