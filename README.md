# Plagiarism-Detection-Tool

## System Design

The system consists of four main technologies: Javascript, HTML, css, and SQL. Node.js server architecture with Express.js framework is also a fundamental part of this project. Along with these foundational technologies I have used npm libraries to assist the functionality of this web application:

1. bycrypt - A powerful hashing and salting library I used to ensure user passwords are kept secure in the database.
2. multer - A useful middleware for assisting sending files through HTTPS requests.
3. nodemon - A developer tool to restart the server everytime a relevant file is saved or updated.
4. sqlite & sqlite3 - An npm library for SQL database CRUD API.
5. string-similarity - This library allowed me to compare 2 strings and return a decimal representing their similarity, otherwise all algorithms for plagiarism detection are mine.

### Overview of System Architecture

The system architecture has 3 main components: A Node.js server with Express.js framework, an SQL Database & A HTML/css front end. I have structure my application such that npm start runs server.js. 

In server.js, an Express server is established on port 8080. Next I made the Express server serve static from all necessary directories: "page_source", this directory is where all HTML scripts are stored. "css_source", this directory is where all css styling (except embedded styling in HTML) is done. "media", here all images for my program and documentation are stored. "utils", this directory holds a set of .js files which are loaded into the HTML pages, these files can be seen as a 'middle-man' between the front-end and the backend, they are full of functions which make all HTTPS request calls and return values to the front-end after doing so. Lastly, "user_uploads", this is an output folder for the multer I have set up, in laymans terms, this is where a hard copy of every file uploaded to the server is stored.

Next in server.js, all my routing is done. All database calls and similarity calculations are done via HTTPS requests to the server. To clean up the server.js file I have distributed all the routes (requests) to appropriate routes and files (contained in the routes folder). To do this I wrote them as modules, required them, and assigned them to a route for each file using "expressServer.use(). 

Then I initilised each HTML page to a URL relative to the server using get request to the server. As the server serves the files already they could be fetched.

Finally, I start the server on port 8080.

By describing server.js, it provides an overview of how my program is structures and where things take place. The only part left out was an overview of my database. All database files are stored in the directory "sql database", there is a file for each of the databases. 

1. Files database - this database is where all records all files and there information is stored. ("files.db")
2. Users database - this database is where all user records and their information are stored. ("user.db").

In this folder along with the databases themselves is a file for each database which handles all sql CRUD API operations. These files are written as modules so I could require them in the routing files. (In my HTTPS requests).

Another key tool assisting this application is storing cookies in the browser to transfer information from one HTML page to the next (Using localStorage global variable), along with use of the window global variable to control page navigation and redirection.

### Features & Functionality

NOTE: The web app functions optimally on **Chrome browser at zoom-view 90%**, I **highly recommend** operating at this zoom level.

#### Log in / Sign up pages

These are the pages which will greet you first when you open the app, here you can sign up and log in.

![Start screen](media/start_screen.png)


![Sign up screen](media/sign_up.png)

#### Home Screen

This screen is the hub of the web application.

![Home screen](media/hub.png)

##### File Center

The file center is where files can be **uploaded and deleted** from the app for the current user via drag and drop or explorer selection. **By clicking on a file you can view it**

**NOTE: Uploading non-code file extensions will not work.**

![File Center](media/file_center.png)

#### Compare file pairs

The compare file pair pages are used to compare 2 files, view them side by side, and output a report based on the outcome. First you select 2 files, then you click the compare button to get the report and view the files.

![Compare page 1](media/comp1.png)

![Compare page 2](media/comp2.png)

#### Multi-file compare

First you must choose how you want to select the files to compare.

![MCompare1](media/mcomp1.png)

Secondly, you must upload or select the files you want to compare graphically.

![MCompare2](media/mcomp2.png)

Next you must choose an **origin file**,  an origin file is the base file all comparisons are made around, there is more information given about this throughout these pages.

![MCompare3](media/mcomp3.png)

Here you will see a comparsion centre for the files you selected. There is a graph which **starts at the origin file**, every file is in order of similarity away from the origin file. **File information can be expanded** by **clicking a node** on the diagram. You can also see a list of the files you are comparing here.

![MCompare4](media/mcomp4.png)


### Further documentation

There are a few more documents in this directory to help you install, navigate and maintain this web application.

1. Installation guide - INSTALLATION.md
2. Maintainance and workflow guide - MAINTAINANCE.md
