const express = require('express');
const port = 3000;
const { projects } = require('./data.json');

const app = express();

//Use express' body parser
app.use(express.urlencoded({ extended: false }));

//Set the static route
app.use('/static', express.static('public'));

//Set pug as the view engine
app.set('view engine', 'pug');

//Route for the root
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//Route for the about page
app.get('/about', (req, res) => {
    res.render('about');
});

//Route for the projects
app.get('/project/:id', (req, res, next) => {
    const { id } = req.params;
    const project = projects[id];

    if (id < projects.length) {
        res.render('project', { project });
    } else {
        next();
    }
});

app.get('*', function (req, res, next) {
    const err = new Error(`Page requested at '${req.protocol}://${req.get('host')}${req.originalUrl}' does not exist.`);
    err.statusCode = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    console.error(`${err.statusCode} error: ${err.message}`); // Log error message in our server's console

    res.render('error', { err });

});





//Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
