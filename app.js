const express = require('express');
const port = 5000;
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
    res.render('index');
});

//Route for the about page
app.get('/about', (req, res) => {
    res.render('about');
});

//Route for the root
app.get('/project:id', (req, res) => {
    const { id } = req.params;
    res.send(`Project ${id}`);
});

//Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
