//Bring in dependencies
const express = require('express');
const nofavicon = require('express-no-favicons');
const { projects } = require('./data.json');

//Set port
const port = process.env.PORT || 3000;

//Initialize express
const app = express();

//Prevent favicon /GET requests
app.use(nofavicon());

//Use express' body parser
app.use(express.urlencoded({ extended: false }));

//Set the static route
app.use('/static', express.static('public'));

//Set pug as the view engine
app.set('view engine', 'pug');

//Route for the root and pass the in the projects from the data file for the index template to use
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//Route for the about page
app.get('/about', (req, res) => {
    res.render('about');
});

//Route for the projects
//The :id param will determine which project page will be rendered
app.get('/project/:id', (req, res, next) => {
    const { id } = req.params; //grab the project id from the url request
    const project = projects[id]; //get array position in the data file of all the project's data

    //Conditional to see if the id provided is a valid id for the length of the array.
    //If it is not valid it will go to the next get request for '*' and throw a 404 error.
    //Without this conditional, the incorrect status code error was thrown, this forces the 404 error. 
    if (id < projects.length) {
        res.render('project', { project }); //renders the project template and passes the data relevant only to that project
    } else {
        next();
    }
});

//Gets any request not specified above and creates a 404 error. The error is passed to 'next' which then hits then
//hits the error middleware.
app.get('*', function (req, res, next) {
    const err = new Error(`Page requested at '${req.protocol}://${req.get('host')}${req.originalUrl}' does not exist.`);
    err.statusCode = 404;
    next(err);
});

//Handles all errors. Anything sent from the get '*' route will throw a 404 error. All other errors will have a
//500 server side error. The error is logged to the console with a friendly message then passed along to the error.pug template.
app.use(function (err, req, res, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
        err.message = 'There was an internal server error requesting the resource.';
    } // If err has no specified error code, set error code to 'Internal Server Error (500)'


    console.error(`${err.statusCode} error: ${err.message}`); // Log error message in our server's console


    res.render('error', { err }); //render the error template and pass the error to it

});

//Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
