const express = require('express');
const port = 5000;

const app = express();

//Use express' body parser
app.use(express.urlencoded({ extended: false }));

//Set the static route
app.use(express.static('public'));

//Set pug as the view engine
app.set('view engine', 'pug');

//Route for the root
app.get('/', (req, res) => {
    res.send('Hello');
});

//Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
