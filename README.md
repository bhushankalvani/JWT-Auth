# Token Auth
Token Authentication for Applications/Websites with Node Servers.

## JSON Web Token Authentication for NodeJS Application.

Ready to use as a website/app server.

### To Use this repo:

1. Clone
2. Install all packages using 'npm install'.
3. Follow these steps to integrate it with your ongoing project.<br/>
    Change the following whenever you use this repo into a new project:
    1. <b>'APP.JS'</b> - Mongoose connects to authToken DB. Change to whichever DB you want to connect. Find 'FIXME' Tag in the       file.
    2. <b>'Secret Keys'</b> - Change keys in 'jwtConfig.js' and 'tokenController.js' files for every new project.
    3. <b>'Auth based on Email'</b> - User's email is used to authenticate and check for in the database. If you wish to change       you can change in the controller files.
