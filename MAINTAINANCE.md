# Web Application Maintainance

Throughout my application I have commented all code I
see as not straight-forward. This will help anyone
who wishes to work on and continue my web application
as well as remind me how things are working. Throughout 
this document I may reference comments I have made 
to help you understand. The Express server is setup to
automatically serve files in the directories provided so
adding new files is as simple as loading them to a URL or 
file.

## Project continuation

### Adding a page to the site

1. Initialise page to server

In server.js, there is a heading similar to **1.**
, you must create a get request using the same format
as those under the heading, change the get request 
URL and then the file path accordingly with your HTML file.

2. Create HTML page

Now you must make the page to load upon this get request.
I have provided a template in "page_source_" directory.
This template is for a basic HTML page in this application.
The template adds the header of the site, along with
a back button which redirects you to the hub.
It also checks whether the user is logged in 
before the page is accessed.

3. Add styling

At the top of the HTML template page there is a line importing 
a css styling file which needs to be changed. 
First make a .css file with appropriate name matching format
of those under "css_source" directory, then change the HTML
template to include this file. The template, however,
already includes the "global" styling file "non_specific_page_styling.css"
with many useful styles to match the application's appearance.

4. Using HTTPS requests

To do must first make a file in the routes directory with
an appropriate name for your HTTPS functionality.

Then another file in the format __routes_file_name___requests.js,
setup your routing file as a module and use it on the server as I have in server.js.
(comments on code should help you identify how this is done).

Now in the requests file you can call these requests and return res values from them.
To use the requests files in your HTML pages, include them as I have (example in every HTML file),
and you are now ready to call upon your HTTPs requests.

5. Integrate your page on the app

Across the application I have used onclick in HTML buttons
to redirect to the path the page is routed on the server.

Add a button, like I have (examples everywhere), to access your page as
the application user is unlikely to guess the URL for your page haha.
